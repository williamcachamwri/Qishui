// src/services/queue/queueItem.ts
// @ts-nocheck
import { __toESM, init_nanoid, nanoid, require_bdms } from "../../../../vendor/index";
import { State } from "../../base/state/state";
import { protocolOf } from "../index";
import "../serviceId";
import { logger } from "../../utils/logger";
import "../collect/type";
import "./type";
import "./playable/type";
import { QueueLoader } from "./queueLoader";

init_nanoid();
let bdms5: any = __toESM(require_bdms());

class QueueItem {
        constructor(id = nanoid(), playReason = "unknown" /* unknown */, preserveTrackInfo) {
          this.id = id;
          this.playReason = playReason;
          this.preserveTrackInfo = preserveTrackInfo;
          this.loader = new QueueLoader(this);
          this.state.onUpdate((state, oldState) => {
            this.manager?.state.update((s2) => {
              if (s2.queue?.queueId === this.id) {
                s2.queue = state;
              }
            });
            if (state.currentPlayable.key && state.currentPlayable.key !== oldState.currentPlayable.key) {
              this.reportRecentlyPlayed(state.currentPlayable.key);
            }
          });
          queueMicrotask(() => {
            this.state.update((state) => {
              state.title = this.getTitle();
              state.metaInfo = this.getMetaInfo();
            });
          });
        }
        manager;
        state = new State(this.createInitializeQueueItemState());
        customState = new State(this.createInitializeCustomState());
        loader;
        get isActive() {
          return this.manager?.state.value.queue?.queueId === this.id;
        }
        get loggerTag() {
          return `k=${this.getKey()} qid=${this.id}`;
        }
        createInitializeQueueItemState() {
          const baseInitializeParams = {
            queueId: this.id,
            title: "",
            metaInfo: {
              type: "unknown" /* unknown */,
              id: "",
              etParams: {}
            },
            etParams: this.initialEtParams(),
            playReason: "unknown" /* unknown */,
            loading: {
              isFirstLoaded: false,
              isLoading: false,
              isLoadingFirst: false,
              isLoadingMore: false,
              firstError: null,
              moreError: null
            },
            pagination: {
              cursor: null,
              hasMore: true,
              fetchCounter: 0
            },
            playables: {
              defaultKeys: [],
              currentKeys: [],
              byKey: {},
              limitedFreeInfos: {},
              requestIdMap: {}
            },
            currentPlayable: {
              key: null,
              id: null,
              type: null,
              switchType: 6 /* list */
            },
            playback: {
              playOrder: 0 /* listLoop */,
              savedProgress: 0,
              startProgress: 0,
              startInstant: Date.now(),
              isPlayed: false
            }
          };
          const extraInitialParamsWithPreserveTrackInfo = this.preserveTrackInfo && this.preserveTrackInfo.currentPlayableKey ? {
            playables: {
              defaultKeys: [this.preserveTrackInfo.currentPlayableKey],
              currentKeys: [this.preserveTrackInfo.currentPlayableKey],
              byKey: this.preserveTrackInfo.playable ? { [this.preserveTrackInfo.currentPlayableKey]: this.preserveTrackInfo.playable } : {},
              limitedFreeInfos: { [this.preserveTrackInfo.currentPlayableKey]: this.preserveTrackInfo?.limitedFreeInfo },
              requestIdMap: { [this.preserveTrackInfo?.currentPlayableKey]: this.preserveTrackInfo?.requestId }
            },
            currentPlayable: {
              key: this.preserveTrackInfo.currentPlayableKey,
              id: this.preserveTrackInfo.playable.id,
              type: this.preserveTrackInfo.playable.type,
              switchType: 6 /* list */
            },
            playReason: this.playReason
          } : {};
          return {
            ...baseInitializeParams,
            ...extraInitialParamsWithPreserveTrackInfo
          };
        }
        shuffleTracks(keys) {
          const newTracks = [];
          const tracksSet = new Set(keys);
          while (tracksSet.size > 0) {
            const i2 = Math.floor(tracksSet.size * Math.random());
            const item = Array.from(tracksSet)[i2];
            newTracks.push(item);
            tracksSet.delete(item);
          }
          return newTracks;
        }
        reorderTracks(keys) {
          if (this.state.value.playback.playOrder === 2 /* shuffle */) {
            return this.shuffleTracks(keys);
          } else {
            return keys;
          }
        }
        reportMetrics(params) {
          protocolOf("applog" /* applog */).report({
            event: "queue_metrics",
            params: {
              queue_id: this.id,
              tech_queue_type: this.getMetaInfo().type,
              ...this.getMetaInfo().etParams,
              ...params
            }
          });
        }
        resetCurrentPlayableSession(switchType, playSourceParams) {
          this.state.update((state) => {
            return {
              ...state,
              currentPlayable: {
                ...state.currentPlayable,
                switchType,
                playSourceParams
              },
              playback: {
                ...state.playback,
                startInstant: Date.now()
              }
            };
          });
        }
        async gotoNextTrack(switchType, playSourceParams) {
          if (this.state.value.playback.playOrder === 1 /* singleLoop */ && switchType === 4 /* auto */) {
            this.resetCurrentPlayableSession(switchType, playSourceParams);
            protocolOf("player" /* player */).replay();
            return true;
          }
          let nextTrackKey = this.getNextTrackId(switchType);
          if (!nextTrackKey) {
            if (!await this.loader.autoLoadMore()) {
              return false;
            }
          }
          nextTrackKey = this.getNextTrackId(switchType);
          if (!nextTrackKey) {
            return false;
          }
          await this.gotoTrack(nextTrackKey, switchType, 0, playSourceParams);
          return true;
        }
        async gotoPreviousTrack(switchType, startProgressSeconds = 0, playSourceParams) {
          let previousTrackKey = this.getPreviousTrackId(switchType);
          if (!previousTrackKey) {
            if (!await this.loader.autoLoadMore()) {
              return false;
            }
          }
          previousTrackKey = this.getPreviousTrackId(switchType);
          if (!previousTrackKey) {
            return false;
          }
          await this.gotoTrack(previousTrackKey, switchType, startProgressSeconds, playSourceParams);
          return true;
        }
        async gotoTrack(key, switchType, startProgressSeconds = 0, playSourceParams) {
          if (!this.state.value.playables.currentKeys.includes(key)) {
            throw new Error("cannot find playableKey in queue");
          }
          const meta = this.getMetaInfo();
          const shouldRewindPrevIntercept = this.manager?.clientInterceptStrategy?.[meta.type]?.enable_rewind_prev_intercept ?? false;
          if (shouldRewindPrevIntercept) {
            const previousPlayableKey = this.state.value.currentPlayable.key;
            const previousPlayable = previousPlayableKey ? this.state.value.playables.byKey[previousPlayableKey] : void 0;
            const playedTime = Date.now() - this.state.value.playback.startInstant;
            if (previousPlayable && playedTime > 5e3) {
              const limitedFreeInfo = this.state.value.playables.limitedFreeInfos[previousPlayable.key];
              if (limitedFreeInfo) {
                if (limitedFreeInfo.rewind_prev_intercept_type) {
                  this.state.update((state) => {
                    state.playables.limitedFreeInfos[previousPlayable.key].limited_free = false;
                  });
                  protocolOf("player" /* player */).removeTrackCache(previousPlayable);
                }
              }
            }
          }
          bdms5.report("playable_change");
          const playable = this.state.value.playables.byKey[key];
          if (key === this.state.value.currentPlayable.key) {
            this.resetCurrentPlayableSession(switchType, playSourceParams);
            protocolOf("player" /* player */).replay();
          } else {
            this.state.update((state) => {
              return {
                ...state,
                currentPlayable: {
                  key,
                  id: playable?.id ?? null,
                  type: playable?.type ?? null,
                  switchType,
                  playSourceParams
                },
                playback: {
                  ...state.playback,
                  startProgress: startProgressSeconds,
                  startInstant: Date.now()
                }
              };
            });
          }
          this.loader.trySaveCache("save_playing");
          this.loader.autoLoadMore();
        }
        initialize(manager) {
          this.manager = manager;
          this.state.update(() => this.createInitializeQueueItemState());
        }
        async activate(options) {
          logger.info("queue", (b2) => b2.text("activate").bold(this.id));
          if (!this.manager) {
            throw new Error("queue item is detached");
          }
          this.reportMetrics({
            type: "activate"
          });
          this.state.update((state) => {
            state.etParams = {
              ...options.etParams ? options.etParams : state.etParams,
              ...this.getMetaInfo().etParams
            };
            if (options.specificPlayableKey && state.currentPlayable.switchType === 6 /* list */) {
              state.currentPlayable.switchType = 2 /* specific */;
            }
          });
          const queueCountAfterLastPlay = this.manager.queueHistory.length - this.manager.queueHistory.lastIndexOf(this.id);
          if (queueCountAfterLastPlay > 4) {
            this.setPlayOrder(0 /* listLoop */);
          }
          this.manager.queueHistory.push(this.id);
          this.manager.state.update((state) => ({
            ...state,
            queue: this.state.value
          }));
          await this.loader.load({
            isFirst: true,
            autoPlay: options.autoPlay,
            specificPlayableKey: options.specificPlayableKey,
            isRefresh: options.isRefresh
          });
        }
        async refresh() {
          this.customState.update(() => this.createInitializeCustomState());
          this.state.update((state) => ({
            ...this.createInitializeQueueItemState(),
            ...state.currentPlayable.key ? {
              currentPlayable: {
                key: state.currentPlayable.key,
                id: state.currentPlayable.id,
                type: state.currentPlayable.type,
                switchType: state.currentPlayable.switchType
              },
              playables: {
                ...state.playables,
                currentKeys: [state.currentPlayable.key],
                byKey: {
                  [state.currentPlayable.key]: state.playables.byKey[state.currentPlayable.key]
                }
              }
            } : {},
            title: this.getTitle()
          }));
          await this.loader.load({ isRefresh: true });
        }
        togglePlayOrder() {
          this.state.update((state) => {
            let index = this.supportPlayOrder.indexOf(state.playback.playOrder);
            if (index === this.supportPlayOrder.length - 1) {
              index = 0;
            } else {
              index += 1;
            }
            const newPlayOrder = this.supportPlayOrder[index];
            let newTrackKeys = state.playables.currentKeys;
            const isSwitchToShuffle = newPlayOrder === 2 /* shuffle */;
            const isSwitchFromShuffle = state.playback.playOrder === 2 /* shuffle */;
            if (isSwitchFromShuffle) {
              newTrackKeys = [...state.playables.defaultKeys];
            }
            if (isSwitchToShuffle) {
              if (state.currentPlayable.key) {
                newTrackKeys = [
                  state.currentPlayable.key,
                  ...this.shuffleTracks(newTrackKeys).filter((t2) => t2 !== state.currentPlayable.key)
                ];
              }
            }
            return {
              ...state,
              playables: {
                ...state.playables,
                currentKeys: newTrackKeys
              },
              playback: {
                ...state.playback,
                playOrder: newPlayOrder
              }
            };
          });
        }
        async updateCollectInfo(playables, time = 0) {
          await protocolOf("collect" /* collect */).applyServerSnapshot({
            list: playables.map((p2) => ({
              time,
              id: p2.id,
              entity: {
                type: "playable" /* playable */,
                id: p2.id,
                playable: p2
              },
              isCollected: p2.state?.is_collected ?? false
            }))
          }, "queueItem.updateCollectInfo");
        }
        async getQueueCacheStrategy() {
          return null;
        }
        async setPlayOrder(playOrder) {
          if (this.supportPlayOrder.includes(playOrder)) {
            this.state.update((state) => {
              state.playback.playOrder = playOrder;
            });
          }
        }
        async extendsPlayOrder(queueItem) {
          if (queueItem?.state.value.playback.playOrder) {
            this.setPlayOrder(queueItem.state.value.playback.playOrder);
          }
        }
        async reportRecentlyPlayed(key) {
          if (!this.manager?.userState.value.info) {
            return;
          }
          const playable = this.state.value.playables.byKey[key];
          if (!playable) {
            return;
          }
          protocolOf("request" /* request */).request("AppendRecentlyPlayedMedia", {
            media: [
              {
                type: playable.media_type,
                id: playable.id
              }
            ]
          });
        }
        isMain() {
          return false;
        }
        initialEtParams() {
          return {};
        }
        equal(item) {
          return this.getKey() === item?.getKey();
        }
        async insertPlayable(playable) {
          this.state.update((state) => {
            if (!state.currentPlayable.key) {
              return;
            }
            const newKeyList = state.playables.currentKeys.filter((k2) => k2 !== playable.key);
            const trackIndex = newKeyList.indexOf(state.currentPlayable.key);
            newKeyList.splice(trackIndex + 1, 0, playable.key);
            state.playables.currentKeys = newKeyList;
            state.playables.byKey[playable.key] = playable;
          });
        }
        async removeTrack(playableKey) {
          this.state.update((state) => {
            if (!state.playables.currentKeys) {
              return;
            }
            const index = state.playables.currentKeys.indexOf(playableKey);
            if (index === void 0 || index === -1) {
              return;
            }
            const newKeyList = state.playables.currentKeys.filter((k2) => k2 !== playableKey);
            state.playables.currentKeys = newKeyList;
            delete state.playables.byKey[playableKey];
          });
          this.loader.autoLoadMore();
        }
        checkPlayableSwitchable(key, switchType) {
          const playable = this.state.value.playables.byKey[key];
          if (!playable) {
            return false;
          }
          if (playable.type !== "video" /* Video */) {
            return true;
          }
          if (playable.label_info?.background_play) {
            return true;
          }
          if (this.manager?.windowState.value.windows.main?.isMinimize) {
            return false;
          } else if (!this.manager?.state.value.appVisibility.isPlayerVisible) {
            if (switchType === 4 /* auto */) {
              return false;
            }
          }
          return true;
        }
      }

export {
  QueueItem
};
