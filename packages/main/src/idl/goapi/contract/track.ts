// src/idl/goapi/contract/track.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetTrackV2RequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["track_id", "media_type", "queue_type", "need_show_diversion_anchor", "scene", "enable_refresh_api"]),
      body: fieldsAssign(data, ["track_id", "media_type", "queue_type", "limited_free_param", "need_show_diversion_anchor", "extra_params", "scene", "enable_refresh_api", "scene_name"])
    };
  }

export {
  GetTrackV2RequestToRequestData
};
