// src/idl/goapi/contract/playlist.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function CreatePlaylistRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["name", "is_private", "track_ids", "media"])
    };
  }

function GetPlaylistDetailRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["playlist_id", "cursor", "count", "user_id", "type", "only_need_media", "only_need_media_id", "sec_uid", "feed_playlist_extra", "scene", "media", "sort_type", "session_id", "reverse", "ab_param"]),
      body: fieldsAssign(data, ["playlist_id", "cursor", "count", "user_id", "type", "only_need_media", "only_need_media_id", "sec_uid", "feed_playlist_extra", "feed_playlist_trigger", "scene", "media", "sort_type", "session_id", "reverse", "limited_free_scene", "ab_param"])
    };
  }

function MAppendPlaylistMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_id", "media"])
    };
  }

function MDeletePlaylistMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_id", "media"])
    };
  }

function MDeletePlaylistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_ids"])
    };
  }

function UpdatePlaylistInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_id", "name", "description", "is_private", "cover_uri"])
    };
  }

export {
  CreatePlaylistRequestToRequestData,
  MDeletePlaylistMediaRequestToRequestData,
  GetPlaylistDetailRequestToRequestData,
  MAppendPlaylistMediaRequestToRequestData,
  MDeletePlaylistsRequestToRequestData,
  UpdatePlaylistInfoRequestToRequestData
};
