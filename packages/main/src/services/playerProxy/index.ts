// src/services/playerProxy/index.ts
// @ts-nocheck
import { __require, __toESM, init_node_index2, open } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { delay } from "../../utils/async";
import { MediaTask } from "./mediaTask";
import { fetch2 } from "../../utils/request";

init_node_index2();
let import_node_path10: any = __toESM(__require("node:path"));

let import_node_fs11: any = __toESM(__require("node:fs"));

let import_node_url2: any = __require("node:url");

class PlayerProxyService extends Service {
        isProxySetup = false;
        infoDB = open({
          path: import_node_path10.default.resolve(this.dirPath, "info.db")
        });
        entriesDB = open({
          path: import_node_path10.default.resolve(this.dirPath, "entries.db")
        });
        accessDB = open({
          path: import_node_path10.default.resolve(this.dirPath, "access.db"),
          dupSort: true
        });
        tasks = /* @__PURE__ */ new Map();
        playingTaskId = null;
        preloadTaskIds = [];
        registeredMeta = {};
        constructor() {
          super();
          this.removeOldCacheDir();
          this.pollResumeTask();
        }
        async removeOldCacheDir() {
          try {
            await import_node_fs11.default.promises.rm(import_node_path10.default.resolve(getGlobalConfig().userData, "LunaCache"), { recursive: true, force: true });
          } catch {
          }
        }
        async pollResumeTask() {
          while (true) {
            await delay(1e3);
            await this.tryResumeTask({ timing: "timer" });
          }
        }
        get dirPath() {
          return import_node_path10.default.resolve(getGlobalConfig().userData, "LunaCacheV2");
        }
        get metadataPath() {
          return import_node_path10.default.resolve(this.dirPath, "index");
        }
        getChunkPath(chunkId) {
          return import_node_path10.default.resolve(this.dirPath, `${chunkId}.bin`);
        }
        async removeChunk(chunkId) {
          const chunkPath = this.getChunkPath(chunkId);
          try {
            await import_node_fs11.default.promises.unlink(chunkPath);
          } catch {
          }
        }
        async clearCacheToTargetSize(targetSize) {
          while ((this.infoDB.get("totalCachedSize") ?? 0) > targetSize) {
            console.log("totalCachedSize clearCacheToTargetSize", this.infoDB.get("totalCachedSize"), targetSize);
            try {
              if (!await this.clearOldestCache()) {
                break;
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
        async clearOldestCache() {
          const items = this.accessDB.getRange({
            offset: 0,
            limit: 1
          });
          const item = items.asArray[0];
          if (!item) {
            return false;
          }
          if (item.value === this.playingTaskId) {
            return false;
          }
          this.accessDB.remove(item.key, item.value);
          const entry = this.entriesDB.get(item.value);
          if (!entry) {
            return false;
          }
          this.removeChunk(entry.chunkId);
          await this.infoDB.put("totalCachedSize", (this.infoDB.get("totalCachedSize") ?? 0) - entry.size);
          this.entriesDB.remove(item.value);
          return true;
        }
        getCache(rid) {
          return this.entriesDB.get(rid);
        }
        async putCache(entry, data) {
          try {
            await this.clearCacheToTargetSize(5 * 1024 * 1024 * 1024);
            const existingEntry = this.getCache(entry.resourceId);
            const chunkId = crypto.randomUUID();
            const chunkPath = this.getChunkPath(chunkId);
            await import_node_fs11.default.promises.mkdir(this.dirPath, { recursive: true });
            await import_node_fs11.default.promises.writeFile(chunkPath, data);
            console.log("swcache full written", chunkPath);
            await this.infoDB.put("totalCachedSize", (this.infoDB.get("totalCachedSize") ?? 0) + data.length);
            const time = Math.floor(Date.now() / 1e3);
            await this.entriesDB.put(entry.resourceId, {
              ...entry,
              previousAccessTime: time,
              size: data.length,
              chunkId
            });
            await this.accessDB.put(time, entry.resourceId);
            if (existingEntry) {
              console.log("swcache remove", existingEntry.chunkId);
              await this.removeChunk(existingEntry.chunkId);
              await this.infoDB.put("totalCachedSize", (this.infoDB.get("totalCachedSize") ?? 0) - existingEntry.size);
            }
          } catch (e) {
            console.error(e);
          }
        }
        async readChunk(chunkId, start, end) {
          const filePath = this.getChunkPath(chunkId);
          const fd = await import_node_fs11.default.promises.open(filePath, "r");
          console.log("readChunk", filePath, start, end ? end - (start ?? 0) + 1 : void 0);
          const file = await fd.stat();
          const length = end ? end - (start ?? 0) + 1 : file.size - (start ?? 0);
          const buffer = Buffer.alloc(length);
          await fd.read(buffer, 0, length, start ?? 0);
          fd.close();
          console.log("readeddata", buffer.length);
          return buffer;
        }
        async acceptRequest(request2) {
          const url2 = new URL(request2.url);
          const resourceId = url2.searchParams.get("_rid");
          if (!resourceId) {
            throw new Error("rid is required");
          }
          let task = this.tasks.get(resourceId);
          if (!task) {
            console.log("newswtask load", request2.url);
            task = new MediaTask({
              url: request2.url,
              context: this
            });
            this.tasks.set(resourceId, task);
          }
          this.tryResumeTask({
            timing: "play"
          });
          return task.acceptRequest(request2);
        }
        destroyInactiveTask() {
          const activeTaskIds = /* @__PURE__ */ new Set();
          for (const id of this.preloadTaskIds) {
            activeTaskIds.add(id);
          }
          if (this.playingTaskId) {
            activeTaskIds.add(this.playingTaskId);
          }
          const taskIdsToCancel = this.tasks.keys().filter((t2) => !activeTaskIds.has(t2));
          for (const t2 of taskIdsToCancel) {
            const task = this.tasks.get(t2);
            if (task) {
              console.log("newswtask cancel", t2);
              task.cancel();
              console.log("newswtask del", t2);
              this.tasks.delete(t2);
            }
          }
        }
        setCurrentUrl(url2) {
          const resourceId = new URL(url2).searchParams.get("_rid");
          if (!resourceId) {
            throw new Error("rid is required");
          }
          this.playingTaskId = resourceId;
          this.destroyInactiveTask();
          this.tryResumeTask({ timing: "current_change" });
        }
        setPreloadUrls(urls) {
          const urlMap = /* @__PURE__ */ new Map();
          const resourceIds = [];
          for (const t2 of urls) {
            const resourceId = new URL(t2).searchParams.get("_rid");
            const isLocalUrl = t2.startsWith("file://");
            if (!resourceId || isLocalUrl || resourceId === this.playingTaskId) {
              continue;
            }
            urlMap.set(resourceId, t2);
            resourceIds.push(resourceId);
          }
          this.preloadTaskIds = resourceIds;
          this.destroyInactiveTask();
          const tasksIdsToCreate = this.preloadTaskIds.filter((t2) => !this.tasks.has(t2));
          for (const t2 of tasksIdsToCreate) {
            const url2 = urlMap.get(t2);
            if (!url2) {
              throw new Error("Unreachable");
            }
            const task = new MediaTask({
              url: url2,
              context: this
            });
            this.tasks.set(t2, task);
          }
          this.tryResumeTask({ timing: "preload_change" });
        }
        async tryResumeTask({ timing }) {
          const playingTask = this.playingTaskId ? this.tasks.get(this.playingTaskId) : void 0;
          if (playingTask) {
            const isFullyLoaded = playingTask.loadStatus === "loaded" && playingTask.loadTargetSize === Infinity;
            if (!isFullyLoaded) {
              playingTask.load({ targetSize: Infinity, timing: "play" });
              const { size } = await playingTask.getLoadedSize();
              if (size < playingTask.expecetedPreloadSize) {
                return;
              }
            }
          }
          for (const taskId of this.preloadTaskIds) {
            const task = this.tasks.get(taskId);
            if (!task) {
              throw new Error("Unreachable");
            }
            const { type } = await task.getLoadedSize();
            if (type === "loading") {
              return;
            }
            if (type === "full" || type === "partial") {
              continue;
            }
            console.log("tryresume", "partial load", task.resourceId, type);
            task.load({ targetSize: task.expecetedPreloadSize, timing: "preload_init" });
            return;
          }
          if (playingTask) {
            const { type } = await playingTask.getLoadedSize();
            if (type === "loading") {
              return;
            }
          }
          for (const taskId of this.preloadTaskIds) {
            const task = this.tasks.get(taskId);
            if (!task) {
              throw new Error("Unreachable");
            }
            const { type } = await task.getLoadedSize();
            if (type === "loading") {
              return;
            }
            if (type === "full") {
              continue;
            }
            console.log("tryresume", "full load", task.resourceId);
            task.load({ targetSize: Infinity, timing: "preload_continue" });
            return;
          }
        }
        async clearCache() {
          await this.entriesDB.clearAsync();
          await this.accessDB.clearAsync();
          await import_node_fs11.default.promises.rm(this.metadataPath);
          await import_node_fs11.default.promises.rm(this.dirPath, { recursive: true, force: true });
        }
        /**
         * 获取调试信息
         */
        async getDebugInfo() {
          const debugInfo = {
            playingTrack: void 0,
            loadTasks: {},
            stats: {
              totalTasks: this.tasks.size,
              loadingTasks: 0,
              errorTasks: 0,
              totalCachedSize: this.infoDB.get("totalCachedSize") ?? 0,
              memoryUsage: 0
            }
          };
          if (this.playingTaskId) {
            const task = this.tasks.get(this.playingTaskId);
            if (task) {
              debugInfo.playingTrack = await this.getTaskDebugInfo(task);
            }
          }
          for (const task of this.tasks.values()) {
            const taskInfo = await this.getTaskDebugInfo(task);
            debugInfo.loadTasks[task.meta.trackId] = taskInfo;
            if (task.loadStatus === "loading") {
              debugInfo.stats.loadingTasks++;
            }
            if (task.loadStatus === "error") {
              debugInfo.stats.errorTasks++;
            }
            if (task.gapBuffer) {
              debugInfo.stats.memoryUsage += task.gapBuffer.getFilledSize();
            }
          }
          return debugInfo;
        }
        /**
         * 获取单个任务的调试信息
         */
        async getTaskDebugInfo(task) {
          const loadedInfo = await task.getLoadedSize();
          const cacheEntry = await this.getCache(task.resourceId);
          let totalSize = 0;
          let memoryChunks = [];
          const diskCached = !!cacheEntry;
          let cacheType = "none";
          if (diskCached) {
            cacheType = "disk";
            totalSize = cacheEntry.size;
          } else if (task.gapBuffer) {
            cacheType = "memory";
            totalSize = task.gapBuffer.getSize();
            const filledSize = task.gapBuffer.getFilledSize();
            if (filledSize > 0) {
              memoryChunks.push({
                start: 0,
                end: filledSize - 1,
                type: "loaded"
              });
            }
          }
          const loadProgress = totalSize > 0 ? loadedInfo.size / totalSize : 0;
          return {
            resourceId: task.resourceId,
            trackId: task.meta.trackId,
            quality: task.meta.quality,
            loadStatus: task.loadStatus,
            loadedSize: loadedInfo.size,
            totalSize,
            loadProgress,
            cacheType,
            memoryChunks,
            diskCached
          };
        }
      }

class PlayerProxyServiceProtocol extends ServiceProtocol {
        async handleRequest(req) {
          const url2 = new URL(req.url);
          if (url2.searchParams.get("_rid")) {
            console.log("handleRequest...", req.url);
            try {
              return this.service.acceptRequest(req);
            } catch (e) {
              console.error(e);
              return new Response("Cache Proxy Error", { status: 500 });
            }
          }
          return fetch2(req);
        }
        /**
         * 查看是否有缓存，并获取资源元信息，但是不加载任何数据
         * @param rid 资源ID
         * @returns 资源元信息
         */
        async peekCache(rid) {
          const entry = this.service.getCache(rid);
          if (!entry) {
            return void 0;
          }
          const url2 = (0, import_node_url2.pathToFileURL)(this.service.getChunkPath(entry.chunkId));
          url2.searchParams.set("_rid", rid);
          return {
            entry,
            url: url2.toString()
          };
        }
        /**
         * 注册资源元信息，以便后续可以正常基于 RID 加载数据，一般只用于预加载
         * @param playInfo 播放信息
         */
        async registerMeta(playInfo) {
          this.service.registeredMeta[playInfo.resourceId] = playInfo.meta;
        }
        async setCurrentUrl(url2) {
          this.service.setCurrentUrl(url2);
        }
        async setPreloadUrls(urls) {
          this.service.setPreloadUrls(urls);
        }
        async removeCache(rid) {
          console.log("swcache removeCache", rid);
          const entry = this.service.getCache(rid);
          this.service.entriesDB.remove(rid);
          this.service.tasks.delete(rid);
          if (entry) {
            this.service.accessDB.remove(entry.previousAccessTime, rid);
            this.service.removeChunk(entry.chunkId);
          }
        }
        async clearCache() {
          await this.service.clearCache();
        }
        /**
         * 获取播放器代理服务的调试信息
         * @returns 调试信息
         */
        async getDebugInfo() {
          return this.service.getDebugInfo();
        }
        async tryResumeTask({ timing }) {
          await this.service.tryResumeTask({ timing });
        }
      }

export {
  PlayerProxyService,
  PlayerProxyServiceProtocol
};
