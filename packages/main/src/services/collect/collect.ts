// src/services/collect/collect.ts
// @ts-nocheck
import { __toESM, init_nanoid, nanoid, require_lodash } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { State } from "../../base/state/state";
import { logger } from "../../utils/logger";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { initialSharedState } from "../sharedState/initialState";
import { ackCollectMutationEntry, ackSilenceCollectMutationEntry, applyServerSnapshotToEntry, collectEntriesEqual, failCollectMutationEntry, getCollectTimestamp, getEffectiveCollectValue, normalizeCollectEntry, startCollectMutationEntry } from "./model";
import "./type";
import { isCollectPendingFromState, isCollectedFromCustomStatus } from "./utils";

init_nanoid();
function createCollectValue(isCollected, customStatus) {
    return {
      isCollected,
      customStatus
    };
  }

function getOverrideTimerKey(entity) {
    return `${entity.type}:${entity.id}`;
  }

let import_lodash2: any = __toESM(require_lodash());

let SILENCE_DURATION_SECONDS: any = 60;

class CollectService extends Service {
        state = new State(initialSharedState.collect);
        updateListeners = /* @__PURE__ */ new Set();
        completedListeners = /* @__PURE__ */ new Set();
        overrideReleaseTimers = /* @__PURE__ */ new Map();
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("collect", state);
          });
          protocolOf("user" /* user */).onSessionChanged(async () => {
            this.clearOverrideReleaseTimers();
            this.state.update(() => initialSharedState.collect);
          });
        }
        getEntry(entity) {
          return this.state.value[entity.type][entity.id];
        }
        syncOverrideReleaseTimer(entity, entry) {
          const key = getOverrideTimerKey(entity);
          const existingTimer = this.overrideReleaseTimers.get(key);
          if (existingTimer) {
            clearTimeout(existingTimer);
            this.overrideReleaseTimers.delete(key);
          }
          const override = entry?.override;
          if (!override || override.release.type !== "until") {
            return;
          }
          const delayMs = Math.max(0, (override.release.expiresAt - getCollectTimestamp()) * 1e3);
          const timer = setTimeout(() => {
            this.overrideReleaseTimers.delete(key);
            this.updateEntry(entity, {
              actionId: nanoid(),
              byUserAction: false,
              from: "overrideExpired"
            }, (entry2) => normalizeCollectEntry(entry2));
          }, delayMs);
          this.overrideReleaseTimers.set(key, timer);
        }
        clearOverrideReleaseTimers() {
          this.overrideReleaseTimers.forEach((timer) => clearTimeout(timer));
          this.overrideReleaseTimers.clear();
        }
        updateEntry(entity, event, updater) {
          const currentEntry = this.getEntry(entity);
          const previousValue = getEffectiveCollectValue(currentEntry);
          const nextEntry = normalizeCollectEntry(updater(currentEntry));
          if (collectEntriesEqual(currentEntry, nextEntry)) {
            this.syncOverrideReleaseTimer(entity, nextEntry);
            return nextEntry;
          }
          logger.info(
            "collect",
            (b2) => b2.text("update collect state").bold(entity.type).bold(entity.id).text("from").bold(event.from)
          );
          this.state.update((state) => {
            if (nextEntry) {
              state[entity.type][entity.id] = nextEntry;
            } else {
              delete state[entity.type][entity.id];
            }
          });
          this.syncOverrideReleaseTimer(entity, nextEntry);
          const nextValue = getEffectiveCollectValue(nextEntry);
          if (previousValue?.isCollected !== nextValue?.isCollected || previousValue?.customStatus !== nextValue?.customStatus) {
            this.updateListeners.forEach((listener) => {
              listener({
                entity,
                isCollected: nextValue?.isCollected ?? false,
                isUsedCollected: previousValue?.isCollected,
                byUserAction: event.byUserAction,
                actionId: event.actionId
              });
            });
          }
          return nextEntry;
        }
        startMutation(entity, mutationId, value, startedAt, from) {
          return this.updateEntry(entity, {
            actionId: mutationId,
            byUserAction: true,
            from
          }, (entry) => startCollectMutationEntry(entry, mutationId, value, startedAt));
        }
        ackMutation(entity, mutationId, value, from) {
          return this.updateEntry(entity, {
            actionId: mutationId,
            byUserAction: false,
            from
          }, (entry) => ackCollectMutationEntry(entry, mutationId, value));
        }
        ackSilence(entity, mutationId, value, from) {
          return this.updateEntry(entity, {
            actionId: mutationId,
            byUserAction: false,
            from
          }, (entry) => ackSilenceCollectMutationEntry(entry, mutationId, value, getCollectTimestamp() + SILENCE_DURATION_SECONDS));
        }
        failMutation(entity, mutationId, from) {
          return this.updateEntry(entity, {
            actionId: mutationId,
            byUserAction: false,
            from
          }, (entry) => failCollectMutationEntry(entry, mutationId));
        }
        resolveMutationValue(entity, requestedCollected, response) {
          switch (entity.type) {
            case "user" /* user */: {
              const customStatus = response.follow_status;
              return createCollectValue(isCollectedFromCustomStatus(customStatus), customStatus);
            }
            case "artist" /* artist */: {
              const customStatus = "collect_artist_status" in response ? response.collect_artist_status?.[entity.id] : void 0;
              if (customStatus != null) {
                return createCollectValue(isCollectedFromCustomStatus(customStatus), customStatus);
              }
              return createCollectValue(requestedCollected);
            }
            default: {
              return createCollectValue(requestedCollected);
            }
          }
        }
        async setCollect(entities, isCollected, reportOptions) {
          if (!entities.length) {
            return {
              error: new Error("No collect entity")
            };
          }
          if (entities.some((entity) => isCollectPendingFromState(this.state.value, entity))) {
            logger.warn(
              "collect",
              (b2) => b2.text("collect mutation ignored because request is pending").bold(entities.map((entity) => `${entity.type}:${entity.id}`).join(","))
            );
            return {
              error: new Error("\u64CD\u4F5C\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5")
            };
          }
          const collectActionId = nanoid();
          const startedAt = getCollectTimestamp();
          for (const entity of entities) {
            this.startMutation(entity, collectActionId, createCollectValue(isCollected), startedAt, "setCollect.start");
          }
          const withError = (error) => {
            logger.error("collect", error);
            for (const entity of entities) {
              this.failMutation(entity, collectActionId, "setCollect.fail");
            }
            if (reportOptions) {
              protocolOf("applog" /* applog */).report(import_lodash2.default.merge({}, reportOptions, { params: { status: "fail" } }));
            }
            for (const entity of entities) {
              this.completedListeners.forEach((listener) => listener({
                entity,
                isCollected,
                isUsedCollected: void 0,
                byUserAction: true,
                actionId: collectActionId,
                error
              }));
            }
            return {
              error
            };
          };
          const withComplete = (response) => {
            if (response.status_code === 1000057) {
              for (const entity of entities) {
                this.ackSilence(entity, collectActionId, createCollectValue(isCollected), "setCollect.silence");
              }
              if (reportOptions) {
                protocolOf("applog" /* applog */).report(import_lodash2.default.merge({}, reportOptions, { params: { status: "success" } }));
              }
              for (const entity of entities) {
                this.completedListeners.forEach((listener) => listener({
                  entity,
                  isCollected,
                  isUsedCollected: void 0,
                  byUserAction: true,
                  actionId: collectActionId,
                  response,
                  isSilence: true
                }));
              }
              return {
                response,
                isSilence: true
              };
            }
            if (response.status_code) {
              logger.warn(
                "collect",
                (b2) => b2.text("collect failed").bold(entities[0].type).bold(entities.map((entity) => entity.id).join(",")).text("to").bold(String(isCollected)).object(response)
              );
              return withError(new Error(response.status_info?.status_msg ?? "Collect failed"));
            }
            let customStatus;
            for (const entity of entities) {
              const mutationValue = this.resolveMutationValue(entity, isCollected, response);
              customStatus ??= mutationValue.customStatus;
              this.ackMutation(entity, collectActionId, mutationValue, "setCollect.ack");
            }
            if (reportOptions) {
              protocolOf("applog" /* applog */).report(import_lodash2.default.merge({}, reportOptions, { params: { status: "success" } }));
            }
            for (const entity of entities) {
              this.completedListeners.forEach((listener) => listener({
                entity,
                isCollected,
                isUsedCollected: void 0,
                byUserAction: true,
                actionId: collectActionId,
                customStatus: this.resolveMutationValue(entity, isCollected, response).customStatus,
                response
              }));
            }
            return {
              response,
              customStatus
            };
          };
          try {
            switch (entities[0].type) {
              case "playable" /* playable */: {
                if (isCollected) {
                  return withComplete(await protocolOf("request" /* request */).request("CollectMediaList", {
                    scene: "",
                    media: entities.map((entity) => ({
                      type: entity.playable?.media_type ?? "track",
                      id: entity.id
                    }))
                  }));
                }
                return withComplete(await protocolOf("request" /* request */).request("DeleteCollectedMediaList", {
                  media: entities.map((entity) => ({
                    type: entity.playable?.media_type ?? "track",
                    id: entity.id
                  }))
                }));
              }
              case "playlist" /* playlist */: {
                if (isCollected) {
                  return withComplete(await protocolOf("request" /* request */).request("CollectPlaylists", {
                    playlist_ids: entities.map((entity) => entity.id)
                  }));
                }
                return withComplete(await protocolOf("request" /* request */).request("MDeleteCollectedPlaylists", {
                  playlist_ids: entities.map((entity) => entity.id)
                }));
              }
              case "album" /* album */: {
                if (isCollected) {
                  return withComplete(await protocolOf("request" /* request */).request("CollectAlbums", {
                    album_ids: entities.map((entity) => entity.id)
                  }));
                }
                return withComplete(await protocolOf("request" /* request */).request("MDeleteCollectedAlbums", {
                  album_ids: entities.map((entity) => entity.id)
                }));
              }
              case "artist" /* artist */: {
                if (isCollected) {
                  return withComplete(await protocolOf("request" /* request */).request("CollectArtists", {
                    artist_ids: entities.map((entity) => entity.id)
                  }));
                }
                return withComplete(await protocolOf("request" /* request */).request("MDeleteCollectedArtists", {
                  artist_ids: entities.map((entity) => entity.id)
                }));
              }
              case "user" /* user */: {
                if (isCollected) {
                  return withComplete(await protocolOf("request" /* request */).request("FollowUser", {
                    user_id: entities[0].id
                  }));
                }
                return withComplete(await protocolOf("request" /* request */).request("UnfollowUser", {
                  user_id: entities[0].id
                }));
              }
            }
            return {
              error: new Error("Unknown entity type")
            };
          } catch (error) {
            return withError(error);
          }
        }
        applyServerSnapshot({ list }, from) {
          for (const item of list) {
            if (!item) {
              continue;
            }
            const { entity, isCollected, customStatus, time } = item;
            const snapshotValue = createCollectValue(isCollected, customStatus);
            this.updateEntry(entity, {
              actionId: nanoid(),
              byUserAction: false,
              from
            }, (entry) => applyServerSnapshotToEntry(entry, {
              value: snapshotValue,
              observedAt: time,
              source: from
            }));
          }
        }
        updateByResponse(info, from) {
          this.applyServerSnapshot(info, from);
        }
      }

class CollectServiceProtocol extends ServiceProtocol {
        async setCollect(entities, isCollected, reportOptions) {
          return this.service.setCollect(entities, isCollected, reportOptions);
        }
        async applyServerSnapshot(info, from) {
          return this.service.applyServerSnapshot(info, from);
        }
        async updateByResponse(info, from) {
          return this.service.updateByResponse(info, from);
        }
        async listenUpdate(handler) {
          this.service.updateListeners.add(handler);
        }
        async listenCompleted(handler) {
          this.service.completedListeners.add(handler);
        }
      }

export {
  CollectService,
  CollectServiceProtocol
};
