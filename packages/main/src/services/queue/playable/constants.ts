// src/services/queue/playable/constants.ts
// @ts-nocheck
import "./type";

let MEDIA_TYPE_PLAYABLE_TYPE_MAP: any = {
        audio: "unsupported" /* Unsupported */,
        track: "track" /* Track */,
        jay_mv: "unsupported" /* Unsupported */,
        ugc_video: "video" /* Video */,
        ugc_clip: "track" /* Track */,
        mv: "video" /* Video */,
        live_room: "unsupported" /* Unsupported */,
        luna_post_video: "unsupported" /* Unsupported */,
        slot: "unsupported" /* Unsupported */,
        ads_video: "unsupported" /* Unsupported */,
        ads_live_room: "unsupported" /* Unsupported */,
        playlist: "unsupported" /* Unsupported */
      };

export {
  MEDIA_TYPE_PLAYABLE_TYPE_MAP
};
