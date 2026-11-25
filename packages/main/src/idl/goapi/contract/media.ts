// src/idl/goapi/contract/media.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function GetMediaPlayerRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["vid", "media_type", "media_id", "queue_type", "enable_refresh_api", "enable_dash"]),
      body: fieldsAssign(data, ["vid", "media_type", "media_id", "queue_type", "limited_free_param", "enable_refresh_api", "enable_dash", "scene_name"])
    };
  }

function GetMediaStatsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["media_id", "media_type"]),
      body: fieldsAssign(data, ["media_id", "media_type", "artist_ids"])
    };
  }

function GetUploderInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["upload_type", "scene", "sdk_version"]),
      body: fieldsAssign(data, [])
    };
  }

function MCheckMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["media_list", "scene", "limited_free_param_map", "scene_name", "queue_type"])
    };
  }

export {
  GetMediaPlayerRequestToRequestData,
  GetMediaStatsRequestToRequestData,
  GetUploderInfoRequestToRequestData,
  MCheckMediaRequestToRequestData
};
