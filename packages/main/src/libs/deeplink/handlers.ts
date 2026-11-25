// src/libs/deeplink/handlers.ts
// @ts-nocheck
import { protocolOf } from "../../services/index";
import "../../services/serviceId";
import { logger } from "../../utils/logger";
import "../../services/queue/type";
import { playableFromTrack } from "../../services/queue/playable/convert";
import { createDeeplinkRouter } from "./router";

async function play({ id, mediaType = "track", logPrefix }) {
    if (!id) {
      logger.warn("deeplink", (b2) => b2.text(`${logPrefix}: missing track_id parameter`));
      return null;
    }
    if (mediaType !== "track") {
      logger.warn("deeplink", (b2) => b2.text(`${logPrefix}: unsupported media_type:`).text(mediaType));
      return null;
    }
    await protocolOf("queue" /* queue */).waitIntialQueuePlay();
    const currentPlayable = await protocolOf("queue" /* queue */).getCurrentPlayable();
    if (currentPlayable && currentPlayable.media_type === "track" && currentPlayable.id === id) {
      await protocolOf("player" /* player */).resume();
      logger.info("deeplink", (b2) => b2.text(`${logPrefix}: resumed playing current track`));
      return currentPlayable;
    }
    const response = await protocolOf("request" /* request */).request("GetTrackV2", {
      track_id: id,
      media_type: mediaType,
      queue_type: ""
    });
    if (!response.track) {
      logger.error("deeplink", `${logPrefix}: track not found`);
      return null;
    }
    const track = response.track;
    const playable = playableFromTrack(track);
    const queueState = await protocolOf("sharedState" /* sharedState */).get("queue");
    if (!queueState.queue) {
      await protocolOf("queue" /* queue */).play({
        collectionParams: {
          type: "feed" /* feed */
        },
        autoPlay: false
      });
    }
    await protocolOf("queue" /* queue */).insertPlayable(playable);
    await protocolOf("queue" /* queue */).playNext(3 /* switchPlayable */);
    await protocolOf("player" /* player */).resume();
    logger.info("deeplink", (b2) => b2.text(`${logPrefix}: successfully started playing track`));
    return playable;
  }

let router: any = createDeeplinkRouter();

router.handle("/playing", async ({ track_id, media_type }) => {
        await play({ id: track_id, mediaType: media_type, logPrefix: "/playing" });
      });

router.handle("/comment", async ({ track_id, media_type }) => {
        const playable = await play({ id: track_id, mediaType: media_type, logPrefix: "/comment" });
        if (playable) {
          const isCommentPanelVisible = await protocolOf("renderer" /* renderer */).isCommentPanelVisible();
          if (!isCommentPanelVisible) {
            await protocolOf("renderer" /* renderer */).openCommentPanel({
              trackId: playable.id,
              mediaType: playable.media_type
            });
            logger.info("deeplink", (b2) => b2.text("/comment: comment panel opened"));
          } else {
            logger.info("deeplink", (b2) => b2.text("/comment: comment panel already open"));
          }
        }
      });

router.handle("/vip", async ({ et_params, upsell_key, offer_group }) => {
        let eventParams = {};
        if (et_params) {
          try {
            eventParams = JSON.parse(et_params);
          } catch {
            logger.warn("deeplink", (b2) => b2.text("/vip: invalid et_params JSON"));
          }
        }
        await protocolOf("renderer" /* renderer */).showVipDialog({
          eventParams,
          upsellKey: upsell_key,
          offerGroup: offer_group
        });
        logger.info("deeplink", (b2) => b2.text("/vip: vip dialog opened"));
      });

router.handle("/quality_preview", async ({ quality }) => {
        await protocolOf("renderer" /* renderer */).showSoundQualityPanel(quality);
        logger.info("deeplink", (b2) => b2.text("/quality_preview: sound quality panel opened with tab:").text(quality ?? "default"));
      });

let handleDeeplink: any = router.createHandler();

export {
  handleDeeplink
};
