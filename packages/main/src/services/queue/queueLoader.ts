// src/services/queue/queueLoader.ts
// @ts-nocheck
import { __toESM, require_dayjs_min } from "../../../../vendor/index";
import { AsyncCell } from "../../utils/asyncCell";
import { protocolOf } from "../index";
import "../serviceId";
import { logger } from "../../utils/logger";
import "../storage/type";
import { checkPlayableUnplayable } from "../../utils/track";
import { QueueCacheVersion } from "./type";
import { PlayableKey } from "./playable/type";

let import_dayjs2: any = __toESM(require_dayjs_min());

let DEFAULT_LOADMORE_THRESHOLD: any = 6;

class QueueLoader {
        constructor(queueItem) {
          this.queueItem = queueItem;
        }
        loadedSignal = new AsyncCell();
        extractPlayablesFromCache(queueCache) {
          const allPlayables = queueCache.playables ?? [];
          const lastPlayedIndex = queueCache.lastPlayedKey ? allPlayables.findIndex((t2) => t2.key === queueCache.lastPlayedKey) : -1;
          const currentPlayable = lastPlayedIndex !== -1 ? allPlayables[lastPlayedIndex] : allPlayables[0];
          return { allPlayables, currentPlayable };
        }
        restoreFullFromCache(queueCache) {
          const { allPlayables, currentPlayable } = this.extractPlayablesFromCache(queueCache);
          this.queueItem.state.update((state) => ({
            ...state,
            playables: {
              currentKeys: allPlayables.map((t2) => t2.key),
              defaultKeys: allPlayables.map((t2) => t2.key),
              byKey: Object.fromEntries(allPlayables.map((t2) => [t2.key, t2])),
              requestIdMap: queueCache.requestIdMap ?? {},
              limitedFreeInfos: queueCache.limitedFreeInfos ?? {}
            },
            pagination: {
              cursor: queueCache.cursor ?? "",
              hasMore: queueCache.hasMore ?? false,
              fetchCounter: 0
            },
            loading: {
              isFirstLoaded: true,
              isLoading: false,
              isLoadingFirst: false,
              isLoadingMore: false,
              firstError: null,
              moreError: null
            },
            currentPlayable: {
              key: currentPlayable?.key ?? null,
              id: currentPlayable?.id ?? null,
              type: currentPlayable?.type ?? null,
              switchType: 6 /* list */
            }
          }));
        }
        restorePlayablesFromCache(queueCache) {
          const { allPlayables, currentPlayable } = this.extractPlayablesFromCache(queueCache);
          this.queueItem.state.update((state) => ({
            ...state,
            playables: {
              currentKeys: allPlayables.map((t2) => t2.key),
              defaultKeys: allPlayables.map((t2) => t2.key),
              byKey: Object.fromEntries(allPlayables.map((t2) => [t2.key, t2])),
              requestIdMap: queueCache.requestIdMap ?? {},
              limitedFreeInfos: queueCache.limitedFreeInfos ?? {}
            },
            currentPlayable: {
              key: currentPlayable?.key ?? null,
              id: currentPlayable?.id ?? null,
              type: currentPlayable?.type ?? null,
              switchType: 6 /* list */
            }
          }));
        }
        startLoading() {
          this.queueItem.state.update((state) => ({
            ...state,
            loading: {
              isFirstLoaded: state.loading.isFirstLoaded,
              isLoading: true,
              isLoadingFirst: !state.loading.isFirstLoaded,
              isLoadingMore: state.loading.isFirstLoaded,
              firstError: null,
              moreError: null
            },
            pagination: {
              cursor: state.pagination.cursor,
              hasMore: state.pagination.hasMore,
              fetchCounter: state.pagination.fetchCounter + 1
            }
          }));
        }
        applyFetchResult(params) {
          const { playables, hasMore, cursor, requestId, limitedFreeInfos, specificPlayableKey } = params;
          this.queueItem.state.update((state) => {
            const newPlayableKeys = this.queueItem.reorderTracks(playables.map((t2) => t2.key));
            const currentTrackKeys = [...state.playables.currentKeys, ...newPlayableKeys];
            const requestIdMap = Object.assign({}, state.playables.requestIdMap, Object.fromEntries(playables.map((t2) => [t2.key, requestId])));
            const firstKey = specificPlayableKey ?? state.currentPlayable.key ?? currentTrackKeys[0];
            const firstPlayable = firstKey ? state.playables.byKey[firstKey] ?? playables.find((p2) => p2.key === firstKey) : playables[0];
            return {
              ...state,
              playables: {
                defaultKeys: [...state.playables.defaultKeys, ...playables.map((t2) => t2.key)],
                currentKeys: currentTrackKeys,
                byKey: {
                  ...state.playables.byKey,
                  ...Object.fromEntries(playables.map((t2) => [t2.key, t2]))
                },
                limitedFreeInfos: {
                  ...state.playables.limitedFreeInfos,
                  ...limitedFreeInfos
                },
                requestIdMap
              },
              pagination: {
                cursor,
                hasMore,
                fetchCounter: state.pagination.fetchCounter
              },
              loading: {
                isFirstLoaded: true,
                isLoading: false,
                isLoadingFirst: false,
                isLoadingMore: false,
                firstError: null,
                moreError: null
              },
              currentPlayable: {
                key: firstKey,
                id: firstPlayable?.id ?? null,
                type: firstPlayable?.type ?? null,
                switchType: state.currentPlayable.switchType
              }
            };
          });
        }
        markLoadFailed(error, isAppend) {
          this.queueItem.state.update((state) => ({
            ...state,
            loading: {
              isFirstLoaded: state.loading.isFirstLoaded,
              isLoading: false,
              isLoadingFirst: false,
              isLoadingMore: false,
              firstError: isAppend ? state.loading.firstError : error,
              moreError: isAppend ? error : state.loading.moreError
            }
          }));
        }
        async tryLoadCache() {
          const startTime = performance.now();
          const continueLoad = { preventLoad: false };
          this.queueItem.reportMetrics({ type: "load_cache" });
          try {
            if (this.queueItem.state.value.loading.isFirstLoaded) {
              return continueLoad;
            }
            const cacheStrategy = await this.queueItem.getQueueCacheStrategy();
            if (!cacheStrategy) {
              this.queueItem.reportMetrics({ type: "no_cache", reason: "no_cache_strategy", cost: performance.now() - startTime });
              return continueLoad;
            }
            const queueCache = await protocolOf("storage" /* storage */).get("QueueCache" /* queueCache */, cacheStrategy.key);
            if (!queueCache) {
              this.queueItem.reportMetrics({ type: "no_cache", reason: "no_cache", cost: performance.now() - startTime });
              return continueLoad;
            }
            if (queueCache.version !== QueueCacheVersion) {
              this.queueItem.reportMetrics({ type: "no_cache", reason: "version_not_matched", cost: performance.now() - startTime });
              return continueLoad;
            }
            if (this.isCacheExpired(queueCache.savedAt, cacheStrategy.expireType)) {
              logger.info("queue", (b2) => b2.bold(this.queueItem.loggerTag).text("cache expired"));
              this.queueItem.reportMetrics({ type: "no_cache", reason: "expired", cost: performance.now() - startTime });
              return continueLoad;
            }
            if (!queueCache.playables?.length) {
              logger.warn("queue", (b2) => b2.bold(this.queueItem.loggerTag).text("cache has no track"));
              this.queueItem.reportMetrics({ type: "no_cache", reason: "no_tracks", cost: performance.now() - startTime });
              return continueLoad;
            }
            if (cacheStrategy.preventLoad) {
              this.restoreFullFromCache(queueCache);
              this.trySaveCache("save_playing");
              this.queueItem.reportMetrics({ type: "loaded_from_cache_and_use", cost: performance.now() - startTime });
              return { preventLoad: true };
            } else {
              this.restorePlayablesFromCache(queueCache);
              this.trySaveCache("save_playing");
              logger.info("queue", (b2) => b2.bold(this.queueItem.loggerTag).text("is using cache"));
              this.queueItem.reportMetrics({ type: "loaded_from_cache_and_refresh", cost: performance.now() - startTime });
              return continueLoad;
            }
          } catch (e) {
            logger.error("error", e);
            this.queueItem.reportMetrics({ type: "cache_error", reason: e.message, cost: performance.now() - startTime });
            return { preventLoad: false };
          }
        }
        async trySaveCache(reason) {
          const cacheStrategy = await this.queueItem.getQueueCacheStrategy();
          if (!cacheStrategy) {
            return;
          }
          const state = this.queueItem.state.value;
          const currentKey = state.currentPlayable.key;
          const latestPlayables = state.playables.currentKeys.slice(-50).map((key) => state.playables.byKey[key]).filter(Boolean);
          const latestPlayableKeys = new Set(latestPlayables.map((t2) => t2.key));
          const lastPlayedKey = currentKey && latestPlayableKeys.has(currentKey) ? currentKey : null;
          await protocolOf("storage" /* storage */).set("QueueCache" /* queueCache */, cacheStrategy.key, {
            version: QueueCacheVersion,
            savedAt: Date.now(),
            cursor: state.pagination.cursor,
            hasMore: state.pagination.hasMore,
            playables: latestPlayables,
            limitedFreeInfos: state.playables.limitedFreeInfos,
            requestIdMap: state.playables.requestIdMap,
            lastPlayedKey
          });
          this.queueItem.reportMetrics({ type: "save_cache", reason });
        }
        isCacheExpired(savedAt, expireType) {
          switch (expireType) {
            case 0 /* never */:
              return false;
            case 1 /* day */:
              return Date.now() >= (0, import_dayjs2.default)(savedAt).add(1, "day").valueOf();
            default:
              return true;
          }
        }
        async load({
          isFirst = false,
          isRefresh = false,
          isAppend = false,
          autoPlay = false,
          specificPlayableKey
        } = {}) {
          const startTime = performance.now();
          console.warn("load");
          logger.info("queue", (b2) => b2.text("load").bold(this.queueItem.id));
          let loadNextImmediatelyExternal = false;
          if (!this.queueItem.state.value.pagination.hasMore) {
            this.queueItem.reportMetrics({ type: "end", reason: "no_more", cost: performance.now() - startTime });
            return false;
          }
          if (this.queueItem.state.value.loading.isLoadingMore) {
            this.queueItem.reportMetrics({ type: "loading_lock" });
            const result = await this.loadedSignal.get();
            return result;
          }
          const currentSignal = new AsyncCell();
          this.loadedSignal = currentSignal;
          try {
            let loadFromNetwork = true;
            let hasAddedNewSongs = false;
            let loadedFromCache = false;
            if (!isRefresh) {
              const { preventLoad } = await this.tryLoadCache();
              logger.info("queue", (b2) => b2.bold(this.queueItem.loggerTag).text("prevent load by cache").bold(preventLoad ? "YES" : "NO"));
              if (preventLoad) {
                loadFromNetwork = false;
                loadedFromCache = true;
              }
            }
            if (loadFromNetwork) {
              this.queueItem.reportMetrics({ type: "load_network" });
              this.startLoading();
              let { playables, hasMore, cursor, loadNextImmediately, requestId, limitedFreeInfos } = await this.queueItem.fetch({
                isFirst,
                isAppend,
                isRefresh,
                fetchCounter: this.queueItem.state.value.pagination.fetchCounter
              });
              loadNextImmediatelyExternal = loadNextImmediately ?? false;
              const rawCount = playables.length;
              playables = playables.filter((t2) => !checkPlayableUnplayable(t2)).filter((t2) => !this.queueItem.state.value.playables.byKey[t2.key]);
              hasAddedNewSongs = playables.length > 0;
              this.queueItem.reportMetrics({ type: "loaded_from_network", count: rawCount, filtered_count: playables.length, request_id: requestId, cost: performance.now() - startTime });
              this.applyFetchResult({ playables, hasMore, cursor, requestId, limitedFreeInfos, specificPlayableKey });
            }
            if (this.queueItem.state.value.playables.currentKeys.length === 0) {
              throw new Error("empty tracks");
            }
            if (this.queueItem.isActive && autoPlay) {
              await protocolOf("player" /* player */).resume();
            }
            if (loadFromNetwork) {
              this.trySaveCache("queue_cache");
            }
            logger.info("queue", (b2) => b2.bold(this.queueItem.loggerTag).text("loaded cost").time(performance.now() - startTime));
            currentSignal.resolve(hasAddedNewSongs);
            if (loadNextImmediatelyExternal) {
              this.load({ isAppend: true });
            } else if (hasAddedNewSongs || loadedFromCache) {
              this.autoLoadMore();
            }
            this.queueItem.reportMetrics({ type: "end", cost: performance.now() - startTime });
            return hasAddedNewSongs;
          } catch (e) {
            logger.error("queue", e);
            this.markLoadFailed(e.message, isAppend);
            currentSignal.resolve(false);
            this.queueItem.reportMetrics({ type: "error", reason: e.message, cost: performance.now() - startTime });
            return false;
          }
        }
        async autoLoadMore() {
          const state = this.queueItem.state.value;
          const currentTrackIndex = state.playables.currentKeys.indexOf(
            state.currentPlayable.key ?? PlayableKey("")
          );
          const abParams = await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params");
          const useNewThresholdMechanism = abParams?.queue?.loadmore_threshold_enabled ?? false;
          let shouldLoadMore;
          if (useNewThresholdMechanism) {
            const remainingTracks = state.playables.currentKeys.length - 1 - currentTrackIndex;
            shouldLoadMore = remainingTracks < DEFAULT_LOADMORE_THRESHOLD;
          } else {
            shouldLoadMore = currentTrackIndex >= state.playables.currentKeys.length - 3;
          }
          if (shouldLoadMore) {
            return await this.load({ isAppend: true });
          }
          return false;
        }
      }

export {
  QueueLoader
};
