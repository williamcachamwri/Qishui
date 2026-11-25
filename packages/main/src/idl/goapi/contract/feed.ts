// src/idl/goapi/contract/feed.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function FeedModeRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["ab_param", "device_profile", "feed_extra"])
    };
  }

function FeedPlaylistSquareRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["includes", "category_id", "feed_playlist_extra"])
    };
  }

function FeedRadioTracksRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["radio_id", "played_tracks", "played_media", "flow_type", "cursor", "trigger_info", "feed_radio_media_extra", "passthrough", "limited_free_scene", "player_info_param", "full_media"])
    };
  }

function FeedSongTabRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["played_tracks", "selected_boost", "is_first_request", "feed_mode", "played_media", "with_client_cache", "preference_mode", "total_request_count", "preference_mode_request_count", "is_did_first_request", "feed_preference", "interesting_search", "feed_type", "feed_counts", "did_first_use_time", "feed_extra", "count", "diversion_extra", "device_profile", "limited_free_scene", "player_info_param", "full_media"])
    };
  }

function GetRelatedMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["media_list", "artist_ids", "scene_name"]),
      body: fieldsAssign(data, ["media_list", "artist_ids", "scene_name", "played_media", "req_count", "first_req_time", "feed_related_media_extra", "search_query", "search_related_info", "category_id", "limited_free_scene", "media_type", "player_info_param", "full_media"])
    };
  }

export {
  FeedModeRequestToRequestData,
  FeedPlaylistSquareRequestToRequestData,
  FeedRadioTracksRequestToRequestData,
  FeedSongTabRequestToRequestData,
  GetRelatedMediaRequestToRequestData
};
