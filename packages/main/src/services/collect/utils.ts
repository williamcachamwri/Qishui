// src/services/collect/utils.ts
// @ts-nocheck
import { FollowStatusTypeFollower, FollowStatusTypeNoRelation } from "../../idl/goapi/entity/user";
import { isCollectPending } from "./model";

function collectEntryFromState(state, entity) {
    return state[entity.type][entity.id];
  }

function isCollectPendingFromState(state, entity) {
    return isCollectPending(collectEntryFromState(state, entity));
  }

function isCollectedFromCustomStatus(customStatus) {
    return ![FollowStatusTypeFollower, FollowStatusTypeNoRelation].includes(customStatus ?? FollowStatusTypeNoRelation);
  }

export {
  isCollectedFromCustomStatus,
  isCollectPendingFromState
};
