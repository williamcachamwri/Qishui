// src/idl/goapi/contract/video.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetVideoV2RequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["video_id", "type", "enable_refresh_api", "enable_dash"]),
      body: fieldsAssign(data, ["video_id", "type", "enable_refresh_api", "enable_dash", "scene_name", "queue_type"])
    };
  }

export {
  GetVideoV2RequestToRequestData
};
