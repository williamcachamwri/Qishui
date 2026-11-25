// src/services/queue/queue.ts
// @ts-nocheck
import { State } from "../../base/state/state";
import { protocolOf } from "../index";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { initialSharedState } from "../sharedState/initialState";
import "../storage/type";
import { SyncState } from "../sharedState/syncState";
import { AsyncCell } from "../../utils/asyncCell";
import { FeedQueueItem } from "./items/feed";
import { FeedModeQueueItem } from "./items/feedmode";
import "./type";
import { PlaylistQueueItem } from "./items/playlist";
import { AlbumQueueItem } from "./items/album";
import { RelatedQueueItem } from "./items/related";
import { ArtistQueueItem } from "./items/artist";
import { RadioQueueItem } from "./items/radio";
import { SimpleLimietedQueueItem } from "./items/simpleLimited";

class QueueService extends Service {
        state = new State(initialSharedState.queue);
        windowState = new SyncState("window");
        userState = new SyncState("user");
        playerState = new SyncState("player");
        clientInterceptStrategy = {};
        feedQueue;
        commonQueue;
        onSwitchListeners = [];
        queueHistory = [];
        savedFeedProgress = 0;
        initialQueuePlayCell = AsyncCell.createPending();
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("queue", state);
          });
          protocolOf("user" /* user */).onSessionChanged((type) => this.handleSessionChanged(type));
        }
        async initialize() {
          const commonServerParams = await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params");
          this.clientInterceptStrategy = commonServerParams?.client_intercept_strategy ?? {};
          await this.play({
            collectionParams: {
              type: "feed" /* feed */
            },
            autoPlay: false
          });
          this.initialQueuePlayCell.resolve();
        }
        async handleSessionChanged(type) {
          await protocolOf("storage" /* storage */).flush("QueueCache" /* queueCache */);
          this.state.update(() => initialSharedState.queue);
          delete this.feedQueue;
          delete this.commonQueue;
          let preservePlayable;
          if (this.queue && this.state.value.queue?.queueId === "feed") {
            const currentKey = this.queue.state.value.currentPlayable.key;
            preservePlayable = currentKey ? this.queue.state.value.playables.byKey[currentKey] : void 0;
          }
          await this.play({
            collectionParams: {
              type: "feed" /* feed */,
              preserveCurrentPlayable: preservePlayable
            },
            autoPlay: false
          });
        }
        get queue() {
          return this.state.value.queue?.queueId === "feed" ? this.feedQueue : this.commonQueue;
        }
        async playPrevious(switchType, reportParams = {}, startProgressSeconds = 0, playSourceParams) {
          if (!this.queue) {
            return;
          }
          this.onSwitchListeners.forEach((f2) => f2({ direction: "previous", type: switchType }));
          const didGo = await this.queue?.gotoPreviousTrack(switchType, startProgressSeconds, playSourceParams);
          if (didGo && !this.playerState.value.isPlaying) {
            protocolOf("player" /* player */).resume(reportParams, playSourceParams);
          }
        }
        async playNext(switchType, reportParams = {}, playSourceParams) {
          if (!this.queue) {
            return;
          }
          this.onSwitchListeners.forEach((f2) => f2({ direction: "next", type: switchType }));
          const didGo = await this.queue.gotoNextTrack(switchType, playSourceParams);
          if (didGo && !this.playerState.value.isPlaying) {
            protocolOf("player" /* player */).resume(reportParams, playSourceParams);
          }
        }
        refreshQueue() {
          this.queue?.refresh();
        }
        togglePlayOrder() {
          this.queue?.togglePlayOrder();
        }
        async play({
          collectionParams,
          specificPlayableKey,
          autoPlay = true,
          etParams
        }) {
          let queueItem;
          if (collectionParams) {
            switch (collectionParams.type) {
              case "feed" /* feed */: {
                queueItem = new FeedQueueItem(collectionParams);
                break;
              }
              case "playlist" /* playlist */: {
                queueItem = new PlaylistQueueItem(collectionParams);
                break;
              }
              case "album" /* album */: {
                queueItem = new AlbumQueueItem(collectionParams);
                break;
              }
              case "artist" /* artist */: {
                queueItem = new ArtistQueueItem(collectionParams);
                break;
              }
              case "related" /* related */: {
                queueItem = new RelatedQueueItem(collectionParams);
                break;
              }
              case "radio" /* radio */: {
                queueItem = new RadioQueueItem(collectionParams);
                break;
              }
              case "simpleLimited" /* simpleLimited */: {
                queueItem = new SimpleLimietedQueueItem(collectionParams);
                break;
              }
              case "feedMode" /* feedMode */: {
                queueItem = new FeedModeQueueItem(collectionParams);
                break;
              }
            }
          } else if (this.queue) {
            queueItem = this.queue;
          }
          const isSameQueue = this.queue?.equal(queueItem) ?? false;
          if (specificPlayableKey && this.queue && isSameQueue) {
            let targetPlayableKey;
            if (this.queue.state.value.playables.currentKeys.includes(specificPlayableKey)) {
              targetPlayableKey = specificPlayableKey;
            }
            if (targetPlayableKey) {
              this.onSwitchListeners.forEach((f2) => f2({ direction: "next", type: 3 /* switchPlayable */ }));
              await this.queue.gotoTrack(targetPlayableKey, 3 /* switchPlayable */);
              if (autoPlay) {
                await protocolOf("player" /* player */).resume();
              }
              return;
            }
          }
          if (!queueItem) {
            throw new Error("not available queueItem");
          }
          queueItem.initialize(this);
          if (queueItem.isMain()) {
            if (!this.feedQueue) {
              this.feedQueue = queueItem;
            }
            this.feedQueue.state.update((state) => {
              state.currentPlayable.switchType = autoPlay ? 8 /* feedSwitch */ : 7 /* feedInit */;
            });
            const isRefresh = collectionParams?.type === "feed" /* feed */ && collectionParams?.playReason === "sessionChanged" /* sessionChanged */;
            await this.feedQueue.activate({
              etParams,
              autoPlay,
              specificPlayableKey,
              isRefresh
            });
            return;
          }
          this.commonQueue = queueItem;
          await queueItem.activate({
            etParams,
            autoPlay,
            specificPlayableKey
          });
        }
      }

class QueueServiceProtocol extends ServiceProtocol {
        async playPrevious(switchType, reportParams = {}, startProgressSeconds = 0, playSourceParams) {
          this.service.playPrevious(switchType, reportParams, startProgressSeconds, playSourceParams);
        }
        async playNext(switchType, reportParams = {}, playSourceParams) {
          this.service.playNext(switchType, reportParams, playSourceParams);
        }
        async play(options) {
          await this.service.play(options);
        }
        async refreshQueue() {
          this.service.refreshQueue();
        }
        async togglePlayOrder() {
          this.service.togglePlayOrder();
        }
        async flushCache() {
          await protocolOf("storage" /* storage */).flush("QueueCache" /* queueCache */);
        }
        async onSwitch(listener) {
          this.service.onSwitchListeners.push(listener);
        }
        async markPlayed(queueId) {
          this.service.queue?.state.update((v2) => {
            if (v2.queueId === queueId) {
              v2.playback.isPlayed = true;
            }
          });
        }
        async getCurrentPlayable() {
          const currentKey = this.service.state.value.queue?.currentPlayable.key;
          return currentKey ? this.service.state.value.queue?.playables.byKey?.[currentKey] : void 0;
        }
        async insertPlayable(playable) {
          if (!this.service.queue) {
            return;
          }
          this.service.queue.insertPlayable(playable);
        }
        async removePlayable(playableKey) {
          if (!this.service.queue) {
            return;
          }
          this.service.queue.removeTrack(playableKey);
        }
        async setPlayerVisible(isVisible) {
          this.service.state.update((state) => {
            state.appVisibility.isPlayerVisible = isVisible;
          });
        }
        async waitIntialQueuePlay() {
          await this.service.initialQueuePlayCell.get();
        }
      }

export {
  QueueService,
  QueueServiceProtocol
};
