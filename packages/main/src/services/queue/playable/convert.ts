// src/services/queue/playable/convert.ts
// @ts-nocheck
import "../../../idl/goapi/entity/media";
import { isDefined } from "../../../utils/type";
import { MEDIA_TYPE_PLAYABLE_TYPE_MAP } from "./constants";
import { PlayableKey } from "./type";

function playablesFromMediaResourceLikes(mediaResourceLikes) {
    return mediaResourceLikes?.map((mediaResourceLike) => playableFromMediaResourceLike(mediaResourceLike)).filter(isDefined) ?? [];
  }

function playableFromMediaResourceLike(mediaResource) {
    return playableFromEntityLike(mediaResource?.entity);
  }

function playableFromEntityLike(entityLike) {
    if (!entityLike) {
      return void 0;
    }
    const track = entityLike.track ?? entityLike.track_wrapper?.track;
    if (track) {
      return playableFromTrack(track);
    }
    const video = entityLike.video;
    if (video) {
      return playableFromVideo(video);
    }
    return void 0;
  }

function playableFromTrack(track) {
    const type = mediaTypeToPlayableType(track.media_type);
    if (type === "video" /* Video */) {
      throw new Error("never: track is a video");
    }
    return {
      key: mediaIdToPlayableKey(track.media_type, track.id),
      type,
      track,
      video: void 0,
      id: track.id,
      name: track.name,
      sub_name: track.sub_name,
      media_type: track.media_type,
      cover_url: track.album?.url_cover,
      artists: track.artists,
      album: track.album,
      duration: track.duration,
      vid: track.vid,
      colors: track.colors,
      status: track.status,
      stats: track.stats,
      digital_track_info: track.digital_track_info,
      preview: track.preview,
      limited_free_info: track.limited_free_info,
      bit_rates: track.bit_rates,
      chorus: track.chorus,
      sharable_platforms: track.sharable_platforms,
      label_info: track.label_info,
      vocal: track.vocal,
      song_maker_team: track.song_maker_team,
      state: track.state ? {
        is_collected: track.state.is_collected
      } : void 0
    };
  }

function playableFromVideo(video) {
    const type = mediaTypeToPlayableType(video.type ?? "");
    if (type === "track" /* Track */) {
      throw new Error("never: video is a track");
    }
    return {
      key: mediaIdToPlayableKey(video.type ?? "", video.video_id || ""),
      type,
      video,
      track: void 0,
      id: video.video_id || "",
      name: video.title,
      media_type: video.type ?? "",
      cover_url: video.cover_url,
      artists: video.artists,
      album: video.album,
      duration: video.duration,
      vid: video.vid,
      colors: video.colors,
      status: video.status,
      stats: video.stats,
      label_info: video.label_info,
      chorus: video.nodes?.filter((t2) => t2.type === 2 /* CHORUS */).map((t2) => ({
        start: t2.start,
        duration: t2.duration
      }))[0],
      state: video.state ? {
        is_collected: video.state.is_collected
      } : void 0
    };
  }

function mediaTypeToPlayableType(mediaType) {
    return MEDIA_TYPE_PLAYABLE_TYPE_MAP[mediaType];
  }

function mediaIdToPlayableKey(mediaType, id) {
    return PlayableKey(`${mediaTypeToPlayableType(mediaType)}-${id}`);
  }

export {
  playableFromTrack,
  mediaIdToPlayableKey,
  playableFromVideo,
  playablesFromMediaResourceLikes
};
