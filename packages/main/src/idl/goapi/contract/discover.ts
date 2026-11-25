// src/idl/goapi/contract/discover.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function DiscoverMixRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["block_type", "sub_channel_id", "feed_discover_extra", "exposure_radio_list", "cursor", "count", "session_id", "ab_param", "latest_douyin_liked_playlist_show_ts"])
    };
  }

function DiscoverRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["ab_param", "selected_boost", "playlist_mix_param", "feed_discover_extra", "is_carplay", "first_request", "pc_new_discover_request"])
    };
  }

export {
  DiscoverMixRequestToRequestData,
  DiscoverRequestToRequestData
};
