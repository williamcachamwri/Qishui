// src/utils/track.ts
// @ts-nocheck
import "../renderer/compositions/sharedState";
import { isPlayableSupported } from "../services/queue/playable/utils";
import { SyncState } from "../services/sharedState/syncState";

function getCommerceState() {
    if (false) {
      return getSharedState("commerce");
    } else {
      return commerceSyncState?.value;
    }
  }

function getRegionState() {
    if (false) {
      return getSharedState("region");
    } else {
      return regionSyncState?.value;
    }
  }

function noSourceMessage() {
    return getRegionState()?.abroadType === "2" ? "\u56E0\u7248\u6743\u9650\u5236\uFF0C\u6240\u5728\u56FD\u5BB6/\u5730\u533A\u4E0D\u652F\u6301\u64AD\u653E" : "\u6682\u65E0\u97F3\u6E90\uFF0C\u52AA\u529B\u4E89\u53D6\u4E2D";
  }

function checkPlayableUnplayable(playable) {
    if (!playable) {
      return "\u65E0\u6548\u7684\u97F3\u4E50";
    }
    if (!isPlayableSupported(playable)) {
      return "\u6682\u4E0D\u652F\u6301\u64AD\u653E\uFF0C\u6B63\u5728\u5F00\u53D1\u4E2D";
    }
    if (playable.label_info?.on_sale && !getCommerceState()?.purchasedDigitalAlbumsIds.includes(playable.album?.id ?? "")) {
      return "\u8BE5\u6B4C\u66F2\u5C5E\u4E8E\u4ED8\u8D39\u4E13\u8F91\uFF0C\u8BF7\u5230\u6C7D\u6C34 App \u8D2D\u4E70";
    }
    if (!playable.vid) {
      return noSourceMessage();
    }
    if (playable.status) {
      return noSourceMessage();
    }
    return null;
  }

let commerceSyncState: any = true ? new SyncState("commerce") : null;

let regionSyncState: any = true ? new SyncState("region") : null;

export {
  checkPlayableUnplayable
};
