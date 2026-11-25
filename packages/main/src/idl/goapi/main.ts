// src/idl/goapi/main.ts
// @ts-nocheck
import { mergeRequestData } from "../_common";
import "./contract/acquisition";
import "./contract/activity";
import "./contract/ads";
import "./contract/ai_assistant";
import "./contract/ai_bot";
import { GetAlbumDetailRequestToRequestData } from "./contract/album";
import { GetArtistDetailRequestToRequestData, ListArtistAlbumsRequestToRequestData, ListArtistTracksRequestToRequestData } from "./contract/artist";
import "./contract/atlist";
import "./contract/audit";
import "./contract/card";
import "./contract/chart";
import { CommentActionRequestToRequestData, CreateCommentRequestToRequestData, DeleteCommentRequestToRequestData, ListCommentsRequestToRequestData, ListRepliesRequestToRequestData } from "./contract/comment";
import "./contract/device";
import { DiscoverMixRequestToRequestData, DiscoverRequestToRequestData } from "./contract/discover";
import { DislikeRequestToRequestData } from "./contract/dislike";
import "./contract/emoticon";
import "./contract/featured_content";
import { FeedModeRequestToRequestData, FeedPlaylistSquareRequestToRequestData, FeedRadioTracksRequestToRequestData, FeedSongTabRequestToRequestData, GetRelatedMediaRequestToRequestData } from "./contract/feed";
import "./flow/flow_contract";
import "./contract/friend_link";
import "./contract/game_play";
import "./contract/hashtag";
import "./contract/im";
import "./contract/live";
import "./contract/log_event";
import "./contract/magic";
import { AppendRecentlyPlayedMediaRequestToRequestData, CancelBlockV2RequestToRequestData, CollectAlbumRequestToRequestData, CollectArtistsRequestToRequestData, CollectMediaListRequestToRequestData, CollectPlaylistRequestToRequestData, CollectTracksRequestToRequestData, CommitBlocV2RequestToRequestData, DeleteCollectedAlbumsRequestToRequestData, DeleteCollectedArtistsRequestToRequestData, DeleteCollectedMediaListRequestToRequestData, DeleteCollectedPlaylistsRequestToRequestData, DeleteCollectedTracksRequestToRequestData, DeleteRecentlyPlayedMediaRequestToRequestData, FollowUserRequestToRequestData, GetBlockUserListRequestToRequestData, GetMyDigitalAlbumsRequestToRequestData, GetMyInfoRequestToRequestData, GetMyMixedCollectionsRequestToRequestData, GetMyPlaylistsRequestToRequestData, GetPrivacySettingRequestToRequestData, GetRecentPlayedMediaRequestToRequestData, UnfollowUserRequestToRequestData } from "./contract/me";
import { GetMediaPlayerRequestToRequestData, GetMediaStatsRequestToRequestData, GetUploderInfoRequestToRequestData, MCheckMediaRequestToRequestData } from "./contract/media";
import "./contract/message";
import "./contract/mini_app";
import "./contract/mini_luna";
import { LaunchRequestToRequestData, ReportActionsRequestToRequestData } from "./contract/misc";
import "./contract/mix";
import "./contract/module";
import "./contract/more_panel";
import "./contract/music_mate";
import { CreatePlaylistRequestToRequestData, GetPlaylistDetailRequestToRequestData, MAppendPlaylistMediaRequestToRequestData, MDeletePlaylistMediaRequestToRequestData, MDeletePlaylistsRequestToRequestData, UpdatePlaylistInfoRequestToRequestData } from "./contract/playlist";
import "./contract/plug";
import "./contract/reco_sample";
import { GetReportReasonRequestToRequestData, ReportRequestToRequestData } from "./contract/report";
import { SearchRequestToRequestData, SugRequestToRequestData } from "./contract/search";
import "./contract/seo";
import { GetShareInfoRequestToRequestData, ShareCountRequestToRequestData } from "./contract/share";
import "./contract/sso";
import "./contract/summary";
import "./contract/summary2023";
import "./contract/summary2024";
import "./contract/summary2025";
import { GetTrackV2RequestToRequestData } from "./contract/track";
import "./contract/ug";
import { GetFollowListRequestToRequestData, GetUserInfoRequestToRequestData, GetUserMixedCollectionsRequestToRequestData, GetUserPlaylistsRequestToRequestData } from "./contract/user";
import { GetVideoV2RequestToRequestData } from "./contract/video";

async function AppendRecentlyPlayedMedia(caller, req, context) {
    const requestData = mergeRequestData([
      AppendRecentlyPlayedMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "AppendRecentlyPlayedMedia",
      paths: [{ method: "POST", path: `/luna/me/recently-played-media` }, { method: "POST", path: `/luna/pc/me/recently-played-media` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CancelBlockV2(caller, req, context) {
    const requestData = mergeRequestData([
      CancelBlockV2RequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CancelBlockV2",
      paths: [{ method: "POST", path: `/luna/me/block_v2/cancel` }, { method: "POST", path: `/luna/pc/me/block_v2/cancel` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CollectAlbums(caller, request2, context) {
    const requestData = mergeRequestData([
      CollectAlbumRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "CollectAlbums",
      paths: [{ method: "POST", path: `/luna/me/collection/album` }, { method: "POST", path: `/luna/pc/me/collection/album` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CollectArtists(caller, request2, context) {
    const requestData = mergeRequestData([
      CollectArtistsRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "CollectArtists",
      paths: [{ method: "POST", path: `/luna/me/collection/artist` }, { method: "POST", path: `/luna/pc/me/collection/artist` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CollectMediaList(caller, request2, context) {
    const requestData = mergeRequestData([
      CollectMediaListRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "CollectMediaList",
      paths: [{ method: "POST", path: `/luna/me/collection/media` }, { method: "POST", path: `/luna/pc/me/collection/media` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CollectPlaylists(caller, req, context) {
    const requestData = mergeRequestData([
      CollectPlaylistRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CollectPlaylists",
      paths: [{ method: "POST", path: `/luna/me/collection/playlist` }, { method: "POST", path: `/luna/pc/me/collection/playlist` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CollectTracks(caller, request2, context) {
    const requestData = mergeRequestData([
      CollectTracksRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "CollectTracks",
      paths: [{ method: "POST", path: `/luna/me/collection/track` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CommentAction(caller, req, context) {
    const requestData = mergeRequestData([
      CommentActionRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CommentAction",
      paths: [{ method: "POST", path: `/luna/comments/action` }, { method: "POST", path: `/luna/pc/comments/action` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CommitBlockV2(caller, req, context) {
    const requestData = mergeRequestData([
      CommitBlocV2RequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CommitBlockV2",
      paths: [{ method: "POST", path: `/luna/me/block_v2` }, { method: "POST", path: `/luna/pc/me/block_v2` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CreateComment(caller, req, context) {
    const requestData = mergeRequestData([
      CreateCommentRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CreateComment",
      paths: [{ method: "POST", path: `/luna/comments/create` }, { method: "POST", path: `/luna/pc/comments/create` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function CreatePlaylist(caller, req, context) {
    const requestData = mergeRequestData([
      CreatePlaylistRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "CreatePlaylist",
      paths: [{ method: "POST", path: `/luna/me/playlist` }, { method: "POST", path: `/luna/pc/me/playlist` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DeleteCollectedMediaList(caller, request2, context) {
    const requestData = mergeRequestData([
      DeleteCollectedMediaListRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "DeleteCollectedMediaList",
      paths: [{ method: "POST", path: `/luna/me/collection/media/delete` }, { method: "POST", path: `/luna/pc/me/collection/media/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DeleteComment(caller, req, context) {
    const requestData = mergeRequestData([
      DeleteCommentRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "DeleteComment",
      paths: [{ method: "POST", path: `/luna/comments/delete` }, { method: "POST", path: `/luna/pc/comments/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DeletePlaylistMedia(caller, req, context) {
    const requestData = mergeRequestData([
      MDeletePlaylistMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "DeletePlaylistMedia",
      paths: [{ method: "POST", path: `/luna/me/playlist/media/delete` }, { method: "POST", path: `/luna/pc/me/playlist/media/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DeleteRecentlyPlayedMedia(caller, req, context) {
    const requestData = mergeRequestData([
      DeleteRecentlyPlayedMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "DeleteRecentlyPlayedMedia",
      paths: [{ method: "POST", path: `/luna/me/recently-played-media/delete` }, { method: "POST", path: `/luna/pc/me/recently-played-media/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DiscoverMix(caller, req, context) {
    const requestData = mergeRequestData([
      DiscoverMixRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "DiscoverMix",
      paths: [{ method: "POST", path: `/luna/discover/mix` }, { method: "POST", path: `/luna/pc/discover/mix` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function DiscoverView(caller, req, context) {
    const requestData = mergeRequestData([
      DiscoverRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "DiscoverView",
      paths: [{ method: "POST", path: `/luna/discover` }, { method: "POST", path: `/luna/pc/discover` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function Dislike(caller, req, context) {
    const requestData = mergeRequestData([
      DislikeRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "Dislike",
      paths: [{ method: "POST", path: `/luna/dislike` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function FeedMode(caller, request2, context) {
    const requestData = mergeRequestData([
      FeedModeRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "FeedMode",
      paths: [{ method: "GET", path: `/luna/feed/mode` }, { method: "GET", path: `/luna/pc/feed/mode` }, { method: "POST", path: `/luna/feed/mode` }, { method: "POST", path: `/luna/pc/feed/mode` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function FeedPlaylistSquare(caller, request2, context) {
    const requestData = mergeRequestData([
      FeedPlaylistSquareRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "FeedPlaylistSquare",
      paths: [{ method: "POST", path: `/luna/feed/playlist-square` }, { method: "POST", path: ` /luna/pc/feed/playlist-square` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function FeedRadioTracks(caller, request2, context) {
    const requestData = mergeRequestData([
      FeedRadioTracksRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "FeedRadioTracks",
      paths: [{ method: "POST", path: `/luna/feed/radio/tracks` }, { method: "POST", path: `/luna/pc/feed/radio/tracks` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function FeedSongTab(caller, req, context) {
    const requestData = mergeRequestData([
      FeedSongTabRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "FeedSongTab",
      paths: [{ method: "POST", path: `/luna/feed/song-tab` }, { method: "POST", path: `/luna/pc/feed/song-tab` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function FollowUser(caller, req, context) {
    const requestData = mergeRequestData([
      FollowUserRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "FollowUser",
      paths: [{ method: "POST", path: `/luna/me/follow` }, { method: "POST", path: `/luna/pc/me/follow` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetAlbumDetail(caller, req, context) {
    const requestData = mergeRequestData([
      GetAlbumDetailRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetAlbumDetail",
      paths: [{ method: "GET", path: `/luna/albums/${requestData.params.album_id}` }, { method: "GET", path: `/luna/pc/albums/${requestData.params.album_id}` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetArtistDetail(caller, req, context) {
    const requestData = mergeRequestData([
      GetArtistDetailRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetArtistDetail",
      paths: [{ method: "GET", path: `/luna/artists/${requestData.params.artist_id}` }, { method: "GET", path: `/luna/pc/artists/${requestData.params.artist_id}` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetBlockUserList(caller, req, context) {
    const requestData = mergeRequestData([
      GetBlockUserListRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetBlockUserList",
      paths: [{ method: "GET", path: `/luna/me/block/list` }, { method: "GET", path: `/luna/pc/me/block/list` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetDigitalAlbums(caller, req, context) {
    const requestData = mergeRequestData([
      GetMyDigitalAlbumsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetDigitalAlbums",
      paths: [{ method: "GET", path: `/luna/me/assets/albums` }, { method: "GET", path: `/luna/pc/me/assets/albums` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetFollowerList(caller, req, context) {
    const requestData = mergeRequestData([
      GetFollowListRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetFollowerList",
      paths: [{ method: "GET", path: `/luna/users/${requestData.params.user_id}/follower` }, { method: "GET", path: `/luna/pc/users/${requestData.params.user_id}/follower` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetFollowingList(caller, req, context) {
    const requestData = mergeRequestData([
      GetFollowListRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetFollowingList",
      paths: [{ method: "GET", path: `/luna/users/${requestData.params.user_id}/following` }, { method: "GET", path: `/luna/pc/users/${requestData.params.user_id}/following` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMediaPlayer(caller, req, context) {
    const requestData = mergeRequestData([
      GetMediaPlayerRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMediaPlayer",
      paths: [{ method: "GET", path: `/luna/media-player` }, { method: "GET", path: `/luna/pc/media-player` }, { method: "POST", path: `/luna/media-player` }, { method: "POST", path: `/luna/pc/media-player` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMediaStats(caller, req, context) {
    const requestData = mergeRequestData([
      GetMediaStatsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMediaStats",
      paths: [{ method: "GET", path: `/luna/media-stats` }, { method: "GET", path: `/luna/pc/media-stats` }, { method: "POST", path: `/luna/media-stats` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMyInfo(caller, req, context) {
    const requestData = mergeRequestData([
      GetMyInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMyInfo",
      paths: [{ method: "GET", path: `/luna/me` }, { method: "GET", path: `/luna/pc/me` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMyMixedCollections(caller, req, context) {
    const requestData = mergeRequestData([
      GetMyMixedCollectionsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMyMixedCollections",
      paths: [{ method: "GET", path: `/luna/me/collection/mixed` }, { method: "GET", path: `/luna/pc/me/collection/mixed` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMyPlaylists(caller, req, context) {
    const requestData = mergeRequestData([
      GetMyPlaylistsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMyPlaylists",
      paths: [{ method: "GET", path: `/luna/me/playlist` }, { method: "GET", path: `/luna/pc/me/playlist` }, { method: "POST", path: `/luna/me/playlist/v2` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetMyPrivacySetting(caller, req, context) {
    const requestData = mergeRequestData([
      GetPrivacySettingRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetMyPrivacySetting",
      paths: [{ method: "GET", path: `/luna/me/privacy/setting` }, { method: "GET", path: `/luna/pc/me/privacy/setting` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetPlaylistDetail(caller, req, context) {
    const requestData = mergeRequestData([
      GetPlaylistDetailRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetPlaylistDetail",
      paths: [{ method: "GET", path: `/luna/playlist/detail` }, { method: "GET", path: `/luna/pc/playlist/detail` }, { method: "POST", path: `/luna/playlist/detail` }, { method: "POST", path: `/luna/pc/playlist/detail` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetRecentPlayedMedia(caller, req, context) {
    const requestData = mergeRequestData([
      GetRecentPlayedMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetRecentPlayedMedia",
      paths: [{ method: "GET", path: `/luna/me/recently-played-media` }, { method: "GET", path: `/luna/pc/me/recently-played-media` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetRelatedMedia(caller, req, context) {
    const requestData = mergeRequestData([
      GetRelatedMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetRelatedMedia",
      paths: [{ method: "POST", path: `/luna/media/related` }, { method: "POST", path: `/luna/pc/media/related` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetReportReason(caller, req, context) {
    const requestData = mergeRequestData([
      GetReportReasonRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetReportReason",
      paths: [{ method: "GET", path: `/luna/pc/report/reason` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetShareInfo(caller, req, context) {
    const requestData = mergeRequestData([
      GetShareInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetShareInfo",
      paths: [{ method: "GET", path: `/luna/share_info` }, { method: "GET", path: `/luna/pc/share_info` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetTrackV2(caller, req, context) {
    const requestData = mergeRequestData([
      GetTrackV2RequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetTrackV2",
      paths: [{ method: "GET", path: `/luna/track_v2` }, { method: "GET", path: `/luna/pc/track_v2` }, { method: "POST", path: `/luna/track_v2` }, { method: "POST", path: `/luna/pc/track_v2` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetUploaderInfo(caller, req, context) {
    const requestData = mergeRequestData([
      GetUploderInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetUploaderInfo",
      paths: [{ method: "GET", path: `/luna/video/uploader` }, { method: "GET", path: `/luna/pc/video/uploader` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetUserInfo(caller, req, context) {
    const requestData = mergeRequestData([
      GetUserInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetUserInfo",
      paths: [{ method: "GET", path: `/luna/users/${requestData.params.user_id}` }, { method: "GET", path: `/luna/user/info` }, { method: "GET", path: `/luna/pc/users/${requestData.params.user_id}` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetUserMixedCollections(caller, request2, context) {
    const requestData = mergeRequestData([
      GetUserMixedCollectionsRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "GetUserMixedCollections",
      paths: [{ method: "GET", path: `/luna/user/collection/mixed` }, { method: "GET", path: `/luna/pc/user/collection/mixed` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetUserPlaylists(caller, req, context) {
    const requestData = mergeRequestData([
      GetUserPlaylistsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetUserPlaylists",
      paths: [{ method: "GET", path: `/luna/user/playlist` }, { method: "GET", path: `/luna/pc/user/playlist` }, { method: "POST", path: `/luna/user/playlist` }, { method: "POST", path: `/luna/pc/user/playlist` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function GetVideoV2(caller, req, context) {
    const requestData = mergeRequestData([
      GetVideoV2RequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "GetVideoV2",
      paths: [{ method: "POST", path: `/luna/video_v2` }, { method: "POST", path: `/luna/pc/video_v2` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function Launch(caller, req, context) {
    const requestData = mergeRequestData([
      LaunchRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "Launch",
      paths: [{ method: "GET", path: `/luna/launch` }, { method: "GET", path: `/luna/pc/launch` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ListArtistAlbums(caller, req, context) {
    const requestData = mergeRequestData([
      ListArtistAlbumsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ListArtistAlbums",
      paths: [{ method: "GET", path: `/luna/artists/${requestData.params.artist_id}/albums` }, { method: "GET", path: `/luna/pc/artists/${requestData.params.artist_id}/albums` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ListArtistTracks(caller, req, context) {
    const requestData = mergeRequestData([
      ListArtistTracksRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ListArtistTracks",
      paths: [{ method: "GET", path: `/luna/artists/${requestData.params.artist_id}/tracks` }, { method: "GET", path: `/luna/pc/artists/${requestData.params.artist_id}/tracks` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ListComments(caller, req, context) {
    const requestData = mergeRequestData([
      ListCommentsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ListComments",
      paths: [{ method: "GET", path: `/luna/comments` }, { method: "GET", path: `/luna/h5/comments` }, { method: "GET", path: `/luna/pc/comments` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ListReplies(caller, req, context) {
    const requestData = mergeRequestData([
      ListRepliesRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ListReplies",
      paths: [{ method: "GET", path: `/luna/comments/${requestData.params.comment_id}/replies` }, { method: "GET", path: `/luna/pc/comments/${requestData.params.comment_id}/replies` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MAppendPlaylistMedia(caller, req, context) {
    const requestData = mergeRequestData([
      MAppendPlaylistMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "MAppendPlaylistMedia",
      paths: [{ method: "POST", path: `/luna/me/playlist/media/append` }, { method: "POST", path: `/luna/pc/me/playlist/media/append` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MCheckMedia(caller, req, context) {
    const requestData = mergeRequestData([
      MCheckMediaRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "MCheckMedia",
      paths: [{ method: "POST", path: `/luna/mcheck` }, { method: "POST", path: `/luna/pc/mcheck` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MDeleteCollectedAlbums(caller, request2, context) {
    const requestData = mergeRequestData([
      DeleteCollectedAlbumsRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "MDeleteCollectedAlbums",
      paths: [{ method: "POST", path: `/luna/me/collection/album/delete` }, { method: "POST", path: `/luna/pc/me/collection/album/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MDeleteCollectedArtists(caller, request2, context) {
    const requestData = mergeRequestData([
      DeleteCollectedArtistsRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "MDeleteCollectedArtists",
      paths: [{ method: "POST", path: `/luna/me/collection/artist/delete` }, { method: "POST", path: `/luna/pc/me/collection/artist/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MDeleteCollectedPlaylists(caller, req, context) {
    const requestData = mergeRequestData([
      DeleteCollectedPlaylistsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "MDeleteCollectedPlaylists",
      paths: [{ method: "POST", path: `/luna/me/collection/playlist/delete` }, { method: "POST", path: `/luna/pc/me/collection/playlist/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MDeleteCollectedTracks(caller, request2, context) {
    const requestData = mergeRequestData([
      DeleteCollectedTracksRequestToRequestData(request2)
    ]);
    const response = await caller({
      context,
      name: "MDeleteCollectedTracks",
      paths: [{ method: "POST", path: `/luna/me/collection/track/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function MDeletePlaylists(caller, req, context) {
    const requestData = mergeRequestData([
      MDeletePlaylistsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "MDeletePlaylists",
      paths: [{ method: "POST", path: `/luna/me/playlist/delete` }, { method: "POST", path: `/luna/pc/me/playlist/delete` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function Report(caller, req, context) {
    const requestData = mergeRequestData([
      ReportRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "Report",
      paths: [{ method: "POST", path: `/luna/report` }, { method: "POST", path: `/luna/pc/report` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ReportAction(caller, req, context) {
    const requestData = mergeRequestData([
      ReportActionsRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ReportAction",
      paths: [{ method: "POST", path: `/luna/action` }, { method: "POST", path: `/luna/pc/action` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function Search(caller, req, context) {
    const requestData = mergeRequestData([
      SearchRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "Search",
      paths: [{ method: "GET", path: `/luna/search/${requestData.params.search_type}` }, { method: "GET", path: `/luna/pc/search/${requestData.params.search_type}` }, { method: "POST", path: `/luna/search/${requestData.params.search_type}` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function ShareCount(caller, req, context) {
    const requestData = mergeRequestData([
      ShareCountRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "ShareCount",
      paths: [{ method: "POST", path: `/luna/count/shared` }, { method: "POST", path: `/luna/pc/count/shared` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function Sug(caller, req, context) {
    const requestData = mergeRequestData([
      SugRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "Sug",
      paths: [{ method: "GET", path: `/luna/sug` }, { method: "GET", path: `/luna/pc/sug` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function UnfollowUser(caller, req, context) {
    const requestData = mergeRequestData([
      UnfollowUserRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "UnfollowUser",
      paths: [{ method: "POST", path: `/luna/me/unfollow` }, { method: "POST", path: `/luna/pc/me/unfollow` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

async function UpdatePlaylistInfo(caller, req, context) {
    const requestData = mergeRequestData([
      UpdatePlaylistInfoRequestToRequestData(req)
    ]);
    const response = await caller({
      context,
      name: "UpdatePlaylistInfo",
      paths: [{ method: "POST", path: `/luna/me/playlist/update` }, { method: "POST", path: `/luna/pc/me/playlist/update` }],
      query: requestData.query,
      body: requestData.body
    });
    return response;
  }

export {
  FeedSongTab,
  GetMyInfo,
  GetMyPlaylists,
  GetPlaylistDetail,
  GetAlbumDetail,
  CollectTracks,
  MDeleteCollectedTracks,
  GetTrackV2,
  Sug,
  Search,
  Dislike,
  GetRelatedMedia,
  ListArtistTracks,
  GetMyMixedCollections,
  CollectPlaylists,
  MDeleteCollectedPlaylists,
  CollectAlbums,
  MDeleteCollectedAlbums,
  DiscoverView,
  DiscoverMix,
  FeedRadioTracks,
  GetMediaPlayer,
  GetUserInfo,
  GetUserPlaylists,
  GetUserMixedCollections,
  GetArtistDetail,
  CollectArtists,
  MDeleteCollectedArtists,
  FollowUser,
  UnfollowUser,
  GetRecentPlayedMedia,
  AppendRecentlyPlayedMedia,
  GetMediaStats,
  ListArtistAlbums,
  CollectMediaList,
  DeleteCollectedMediaList,
  DeleteRecentlyPlayedMedia,
  MCheckMedia,
  FeedPlaylistSquare,
  ReportAction,
  GetMyPrivacySetting,
  GetBlockUserList,
  GetFollowerList,
  GetFollowingList,
  CancelBlockV2,
  CommitBlockV2,
  GetDigitalAlbums,
  CreatePlaylist,
  UpdatePlaylistInfo,
  MAppendPlaylistMedia,
  MDeletePlaylists,
  DeletePlaylistMedia,
  Launch,
  GetUploaderInfo,
  GetReportReason,
  Report,
  GetShareInfo,
  ShareCount,
  FeedMode,
  ListComments,
  ListReplies,
  CommentAction,
  DeleteComment,
  CreateComment,
  GetVideoV2
};
