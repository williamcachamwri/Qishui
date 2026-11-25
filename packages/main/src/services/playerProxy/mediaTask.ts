// src/services/playerProxy/mediaTask.ts
// @ts-nocheck
import { delay } from "../../utils/async";
import { GapBuffer } from "./gapBuffer";
import { getReadableSizeString } from "../../renderer/utils/size";
import { protocolOf } from "../index";
import "../serviceId";
import { fetch2 } from "../../utils/request";

class MediaTask {
        context;
        url;
        resourceId;
        meta;
        expecetedPreloadSize = 0;
        abortController = new AbortController();
        gapBuffer;
        memoryPromiseWithResolvers = Promise.withResolvers();
        loadTargetSize = 0;
        loadedSize = 0;
        loadStatus = "idle";
        isPartialResumed = false;
        errors = [];
        constructor({
          url: url2,
          context
        }) {
          this.url = url2;
          this.context = context;
          const parsedUrl = new URL(url2);
          const resourceId = parsedUrl.searchParams.get("_rid");
          if (!resourceId) {
            throw new Error("rid is required");
          }
          this.resourceId = resourceId;
          if (!this.context.registeredMeta[resourceId]) {
            throw new Error("meta is not registered");
          }
          this.meta = this.context.registeredMeta[resourceId];
          if (this.meta.bitrate) {
            this.expecetedPreloadSize = 256 * 1024 + Math.ceil(this.meta.bitrate / 8) * 5;
          } else {
            this.expecetedPreloadSize = 800 * 1024;
          }
          console.log("newsw preloadsize", this.expecetedPreloadSize);
        }
        async acceptRequest(request2) {
          console.log("acceptRequest", this.resourceId);
          const cacheEntry = this.context.getCache(this.resourceId);
          const rangeStr = request2.headers.get("range")?.toString();
          if (rangeStr) {
            const [startStr, endStr] = rangeStr.split("=")[1]?.split("-") ?? [];
            const start = startStr ? parseInt(startStr) : 0;
            const end = endStr ? parseInt(endStr) : Infinity;
            const hasEnd = !!endStr;
            if (cacheEntry) {
              const chunk = this.context.readChunk(cacheEntry.chunkId, start, hasEnd ? end : cacheEntry.size - 1);
              const nextHeaders = new Headers(cacheEntry.headers);
              nextHeaders.set("accept-ranges", "bytes");
              nextHeaders.set("content-range", `bytes ${start}-${hasEnd ? end : cacheEntry.size - 1}/${cacheEntry.size}`);
              nextHeaders.set("content-length", String(hasEnd ? end - start + 1 : cacheEntry.size - start));
              this.reportCacheHitStatus({
                resourceId: this.resourceId,
                trackId: this.meta.trackId,
                status: "hit",
                cacheType: "disk",
                isCacheFull: true,
                isRequestFull: false,
                requestStart: start,
                cachedSize: cacheEntry.size,
                quality: this.meta.quality,
                isPreview: this.meta.isPreview,
                chunkId: cacheEntry.chunkId
              });
              return new Response(await chunk, {
                status: 206,
                statusText: "Partial Content",
                headers: nextHeaders
              });
            } else {
              const { gapBuffer, headers, fullSize } = await this.memoryPromiseWithResolvers.promise;
              const stream5 = gapBuffer.getReader(start, hasEnd ? end - start + 1 : void 0);
              const nextHeaders = new Headers(headers);
              nextHeaders.set("accept-ranges", "bytes");
              nextHeaders.set("content-range", `bytes ${start}-${hasEnd ? end : fullSize - 1}/${fullSize}`);
              nextHeaders.set("content-length", String(hasEnd ? end - start + 1 : fullSize - start));
              console.log("newsw", "partial cache hit", "start", start, "end", end, "hasEnd", hasEnd, "bufferedSize", this.gapBuffer?.getFilledSize() ?? 0);
              console.log("debugreport", gapBuffer.getFilledSize(), start);
              this.reportCacheHitStatus({
                resourceId: this.resourceId,
                trackId: this.meta.trackId,
                status: gapBuffer.getFilledSize() > start ? "hit" : "miss",
                cacheType: "memory",
                isCacheFull: false,
                isRequestFull: false,
                requestStart: start,
                cachedSize: gapBuffer.getFilledSize(),
                quality: this.meta.quality,
                isPreview: this.meta.isPreview,
                chunkId: ""
              });
              return new Response(stream5, {
                status: 206,
                statusText: "Partial Content",
                headers: nextHeaders
              });
            }
          } else {
            if (cacheEntry) {
              console.log("newsw", "full cache hit");
              this.reportCacheHitStatus({
                resourceId: this.resourceId,
                trackId: this.meta.trackId,
                status: "hit",
                cacheType: "disk",
                isCacheFull: true,
                isRequestFull: true,
                requestStart: 0,
                cachedSize: cacheEntry.size,
                quality: this.meta.quality,
                isPreview: this.meta.isPreview,
                chunkId: cacheEntry.chunkId
              });
              return new Response(await this.context.readChunk(cacheEntry.chunkId), {
                status: 200,
                statusText: "OK",
                headers: new Headers(cacheEntry.headers)
              });
            } else {
              const { gapBuffer, headers, fullSize } = await this.memoryPromiseWithResolvers.promise;
              const stream5 = gapBuffer.getReader();
              const nextHeaders = new Headers(headers);
              nextHeaders.set("content-length", String(fullSize));
              console.log("newsw", "full cache hit", "fullSize", fullSize);
              this.reportCacheHitStatus({
                resourceId: this.resourceId,
                trackId: this.meta.trackId,
                status: gapBuffer.getFilledSize() > 0 ? "hit" : "miss",
                cacheType: "memory",
                isCacheFull: false,
                isRequestFull: true,
                requestStart: 0,
                cachedSize: gapBuffer.getFilledSize(),
                quality: this.meta.quality,
                isPreview: this.meta.isPreview,
                chunkId: ""
              });
              return new Response(stream5, {
                status: 200,
                statusText: "OK",
                headers: nextHeaders
              });
            }
          }
        }
        cancel() {
          this.loadStatus = "cancelled";
          this.abortController.abort("cancelled");
          if (this.gapBuffer && !this.gapBuffer.isAborted()) {
            this.gapBuffer.abort("cancelled");
          }
        }
        async load({
          targetSize = Infinity,
          timing
        }) {
          const startTime = performance.now();
          const sessionId = crypto.randomUUID();
          const eventParams = {
            session_id: sessionId,
            timing,
            target_offset: isFinite(targetSize) ? targetSize : -1,
            should_cache: 1,
            resource_id: this.resourceId,
            quality: this.meta.quality,
            bitrate: this.meta.bitrate,
            retry_count: this.errors.length,
            is_preview: this.meta.isPreview ? 1 : 0,
            track_id: this.meta.trackId
          };
          try {
            protocolOf("applog" /* applog */).report({
              event: "media_load_metrics",
              params: {
                ...eventParams,
                type: "init"
              }
            });
            if (this.loadStatus === "loading") {
              if (targetSize > this.loadTargetSize) {
                this.loadTargetSize = targetSize;
              }
              protocolOf("applog" /* applog */).report({
                event: "media_load_metrics",
                params: {
                  ...eventParams,
                  type: "early_exit",
                  reason: "already_loading",
                  cost: performance.now() - startTime
                }
              });
              return;
            }
            const result = await this._load({
              targetSize,
              onLoadStart: (args) => {
                eventParams.start_offset = args.startOffset;
                eventParams.target_offset = args.targetOffset;
                protocolOf("applog" /* applog */).report({
                  event: "media_load_metrics",
                  params: {
                    ...eventParams,
                    type: "start",
                    cost: performance.now() - startTime
                  }
                });
              },
              onWarning: (e) => {
                protocolOf("applog" /* applog */).report({
                  event: "media_load_metrics",
                  params: {
                    ...eventParams,
                    type: "warning",
                    reason: e instanceof Error ? e.message : String(e),
                    cost: performance.now() - startTime
                  }
                });
              }
            });
            if (result.status === "early-exit") {
              protocolOf("applog" /* applog */).report({
                event: "media_load_metrics",
                params: {
                  ...eventParams,
                  type: "early_exit",
                  reason: result.reason,
                  cost: performance.now() - startTime
                }
              });
            } else if (result.status === "finished") {
              protocolOf("applog" /* applog */).report({
                event: "media_load_metrics",
                params: {
                  ...eventParams,
                  type: "finish",
                  speed: result.speed,
                  cost: performance.now() - startTime
                }
              });
            }
            this.loadStatus = "loaded";
            this.context.tryResumeTask({ timing: "task_complete" });
            if (this.loadTargetSize > targetSize) {
              console.log("newsw", "wake up task", "targetSize", this.loadTargetSize);
              return this.load({ targetSize: this.loadTargetSize, timing });
            }
          } catch (error) {
            console.error(error);
            if (this.loadStatus === "cancelled" || error.message === "cancelled" || !this.context.tasks.has(this.resourceId)) {
              protocolOf("applog" /* applog */).report({
                event: "media_load_metrics",
                params: {
                  ...eventParams,
                  type: "early_exit",
                  reason: "cancelled",
                  cost: performance.now() - startTime
                }
              });
              return;
            }
            protocolOf("applog" /* applog */).report({
              event: "media_load_metrics",
              params: {
                ...eventParams,
                type: "error",
                reason: error.message ?? String(error),
                cost: performance.now() - startTime
              }
            });
            this.errors.push(error);
            this.loadStatus = "error";
            this.context.tryResumeTask({ timing: "task_error" });
            const retryDelay = 1e3 * Math.min(this.errors.length + 1, 10);
            console.log("newsw", "retrying after", retryDelay, "ms");
            await delay(retryDelay);
            return this.load({ targetSize, timing });
          }
        }
        async _load({
          targetSize = Infinity,
          onLoadStart,
          onWarning
        }) {
          this.loadStatus = "loading";
          this.loadTargetSize = targetSize;
          const cache = this.context.getCache(this.resourceId);
          if (cache) {
            console.log("full cache hit, skip load");
            return {
              status: "early-exit",
              reason: "cache-full"
            };
          }
          let cachedSize = 0;
          let fullSize = 0;
          if (this.gapBuffer) {
            cachedSize = this.gapBuffer.getFilledSize();
            fullSize = this.gapBuffer.getSize();
          }
          this.loadedSize = cachedSize;
          if (cachedSize >= targetSize || fullSize && cachedSize >= fullSize) {
            console.log("cached size is enough", "cachedSize", cachedSize, "targetSize", targetSize);
            return {
              status: "early-exit",
              reason: "target-size-reached"
            };
          }
          console.log("load", cachedSize, "~", targetSize);
          onLoadStart?.({
            startOffset: cachedSize,
            targetOffset: isFinite(targetSize) ? targetSize : -1
          });
          this.abortController = new AbortController();
          const requestInit = {
            mode: "cors",
            credentials: "omit",
            cache: "no-store",
            signal: this.abortController.signal,
            headers: {
              Range: `bytes=${cachedSize}-${isFinite(targetSize) ? targetSize - 1 : ""}`
            }
          };
          const loadUrl = this.meta.urls[this.errors.length % this.meta.urls.length];
          if (!loadUrl) {
            throw new Error("load url is null");
          }
          const response = await fetch2(loadUrl, requestInit);
          if (!response.body) {
            throw new Error("response body is null");
          }
          if (response.status === 206) {
            const contentRange = response.headers.get("content-range");
            const fullSizeStr = contentRange?.split("/")[1]?.trim();
            fullSize = parseInt(fullSizeStr ?? "0");
            if (!fullSize) {
              throw new Error(`cannot get full length from content-range header: ${contentRange}`);
            }
          } else {
            throw new Error(`unexcepted status code: ${response.status}`);
          }
          if (!this.gapBuffer) {
            this.gapBuffer = new GapBuffer(fullSize);
            this.memoryPromiseWithResolvers.resolve({
              gapBuffer: this.gapBuffer,
              headers: new Headers(response.headers),
              fullSize
            });
          }
          if (targetSize >= fullSize) {
            targetSize = Infinity;
          }
          const reader = response.body.getReader();
          const startTime = performance.now();
          let offset = cachedSize;
          const CHUNK_READ_TIMEOUT = 5e3;
          while (true) {
            const readPromise = reader.read();
            const timeoutPromise = new Promise((_6, reject) => {
              setTimeout(() => {
                reject(new Error(`Stream read timeout after ${CHUNK_READ_TIMEOUT / 1e3}s`));
              }, CHUNK_READ_TIMEOUT);
            });
            let readResult;
            try {
              readResult = await Promise.race([readPromise, timeoutPromise]);
            } catch (error) {
              try {
                reader.cancel("Read timeout or error");
              } catch (cancelError) {
              }
              throw error;
            }
            const { done, value } = readResult;
            if (value) {
              this.gapBuffer.write(offset, value);
              offset += value.byteLength;
              this.loadedSize = offset;
              if (offset > this.expecetedPreloadSize && !this.isPartialResumed) {
                this.isPartialResumed = true;
              }
            }
            if (done) {
              break;
            }
          }
          const expectedSize = isFinite(targetSize) && targetSize < fullSize ? targetSize : fullSize;
          if (offset < expectedSize) {
            throw new Error(
              `Incomplete download: expected ${expectedSize} bytes (${getReadableSizeString(expectedSize)}), but only got ${offset} bytes (${getReadableSizeString(offset)}). Download progress: ${(offset / expectedSize * 100).toFixed(1)}%`
            );
          }
          const consumedTime = performance.now() - startTime;
          const increasedSize = this.gapBuffer.getFilledSize() - cachedSize;
          const speed = increasedSize / (consumedTime / 1e3);
          console.log("newsw", "load speed", getReadableSizeString(speed, false, 2), "/s");
          const fullData = this.gapBuffer.getFullData();
          if (fullData) {
            const headers = Object.fromEntries(response.headers.entries());
            delete headers["content-range"];
            delete headers["accept-ranges"];
            try {
              await this.context.putCache({
                resourceId: this.resourceId,
                info: this.meta,
                headers,
                chunkId: crypto.randomUUID()
              }, fullData);
            } catch (e) {
              onWarning?.(e);
            }
          }
          return {
            status: "finished",
            speed
          };
        }
        async getLoadedSize() {
          if (this.loadStatus === "idle") {
            const cache = this.context.getCache(this.resourceId);
            if (cache) {
              return {
                size: cache.size,
                type: "full"
              };
            } else {
              return {
                size: 0,
                type: "none"
              };
            }
          } else if (this.loadStatus === "loading") {
            if (this.gapBuffer) {
              return {
                size: this.gapBuffer.getFilledSize(),
                type: "loading"
              };
            } else {
              return {
                size: 0,
                type: "none"
              };
            }
          } else if (this.loadStatus === "loaded") {
            return {
              size: this.loadedSize,
              type: this.loadTargetSize === Infinity ? "full" : "partial"
            };
          } else {
            return {
              size: this.loadedSize,
              type: "interrupted"
            };
          }
        }
        async reportCacheHitStatus(data) {
          protocolOf("player" /* player */).emitCacheStatus(data);
        }
      }

export {
  MediaTask
};
