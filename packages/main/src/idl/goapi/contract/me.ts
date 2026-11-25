// src/idl/goapi/contract/me.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function AppendRecentlyPlayedMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["media"])
    };
  }

function CancelBlockV2RequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["block_items"])
    };
  }

function CollectAlbumRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["album_ids"])
    };
  }

function CollectArtistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["artist_ids"])
    };
  }

function CollectMediaListRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["media", "scene", "collect_action"])
    };
  }

function CollectPlaylistRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_ids"])
    };
  }

function CollectTracksRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["track_ids"])
    };
  }

function CommitBlocV2RequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["block_items"])
    };
  }

function DeleteCollectedAlbumsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["album_ids"])
    };
  }

function DeleteCollectedArtistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["artist_ids"])
    };
  }

function DeleteCollectedMediaListRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["media"])
    };
  }

function DeleteCollectedPlaylistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["playlist_ids"])
    };
  }

function DeleteCollectedTracksRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["track_ids"])
    };
  }

function DeleteRecentlyPlayedMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["media"])
    };
  }

function FollowUserRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["user_id"])
    };
  }

function GetBlockUserListRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["cursor", "count"]),
      body: fieldsAssign(data, [])
    };
  }

function GetMyDigitalAlbumsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, [])
    };
  }

function GetMyInfoRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["includes"])
    };
  }

function GetMyMixedCollectionsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["cursor", "count", "item_types"]),
      body: fieldsAssign(data, [])
    };
  }

function GetMyPlaylistsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["cursor", "count"]),
      body: fieldsAssign(data, ["cursor", "count", "ab_param"])
    };
  }

function GetPrivacySettingRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, [])
    };
  }

function GetRecentPlayedMediaRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["cursor", "count", "media_type", "scene"]),
      body: fieldsAssign(data, [])
    };
  }

function UnfollowUserRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["user_id"])
    };
  }

export {
  AppendRecentlyPlayedMediaRequestToRequestData,
  CancelBlockV2RequestToRequestData,
  CollectAlbumRequestToRequestData,
  CollectArtistsRequestToRequestData,
  CollectMediaListRequestToRequestData,
  CollectPlaylistRequestToRequestData,
  CollectTracksRequestToRequestData,
  CommitBlocV2RequestToRequestData,
  DeleteCollectedMediaListRequestToRequestData,
  DeleteRecentlyPlayedMediaRequestToRequestData,
  FollowUserRequestToRequestData,
  GetBlockUserListRequestToRequestData,
  GetMyDigitalAlbumsRequestToRequestData,
  GetMyInfoRequestToRequestData,
  GetMyMixedCollectionsRequestToRequestData,
  GetMyPlaylistsRequestToRequestData,
  GetPrivacySettingRequestToRequestData,
  GetRecentPlayedMediaRequestToRequestData,
  DeleteCollectedAlbumsRequestToRequestData,
  DeleteCollectedArtistsRequestToRequestData,
  DeleteCollectedPlaylistsRequestToRequestData,
  DeleteCollectedTracksRequestToRequestData,
  UnfollowUserRequestToRequestData
};
