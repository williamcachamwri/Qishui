// src/services/commerce/commerce.ts
// @ts-nocheck
import { protocolOf } from "../index";
import { State } from "../../base/state/state";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { StorageState } from "../../base/storage/storageState";
import "../storage/type";
import { SyncState } from "../sharedState/syncState";
import { initialSharedState } from "../sharedState/initialState";
import { logger } from "../../utils/logger";
import "../window/type";
import { MembershipTypeFreeVIP } from "../../idl/commerce_membership/common/product";
import { checkAudioEffectBenefit, checkQualityBenefit, getQualityList } from "../../utils/benefits";
import { FALLBACK_QUALITIES } from "../player/qualityDefaults";

class CommerceService extends Service {
        state = new State(initialSharedState.commerce);
        windowState = new SyncState("window");
        commerceStateCache = new StorageState("Config" /* config */, "commerceState", null);
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("commerce", state);
          });
        }
        async initialize() {
          const cachedState = await this.commerceStateCache.getWhenReady();
          if (cachedState) {
            this.state.update(() => cachedState);
          }
          this.refreshCommerceInfo("init");
          setInterval(() => {
            this.refreshCommerceInfo("timer");
          }, 30 * 60 * 1e3);
          protocolOf("user" /* user */).onSessionChanged((type) => {
            if (type === "logout") {
              this.commerceStateCache.set(null);
              this.state.update(() => this.computeState({ commerceInfo: null, digitalAlbums: null, upsell: null, commerceConfig: null }));
            }
            this.refreshCommerceInfo("session-changed");
          });
          this.windowState.onUpdate((state, oldState) => {
            if (!oldState) {
              return;
            }
            if (state.windows["main" /* main */]?.isFocus && !oldState.windows["main" /* main */]?.isFocus) {
              this.refreshCommerceInfo("focus");
            }
          });
        }
        computeState(data) {
          const { commerceInfo, digitalAlbums, upsell, commerceConfig } = data;
          if (!commerceInfo) {
            return {
              purchasedDigitalAlbumsIds: digitalAlbums?.albums?.map((t2) => t2.id).filter((t2) => t2) ?? [],
              type: "free",
              isAdFree: false,
              isVip: false,
              isFreeVip: false,
              vipExpireAt: 0,
              hasPlayEntitlement: false,
              upsell: upsell ?? void 0,
              audioEffects: [],
              commerceConfig: commerceConfig ?? void 0
            };
          }
          const { play_entitlements, membership } = commerceInfo;
          const type = commerceInfo.membership?.membership_type ?? "free";
          const isAdFree = (play_entitlements?.expire_at ?? 0) * 1e3 > Date.now();
          const vipExpireAt = (membership?.expire_time ?? 0) * 1e3;
          const isVip = membership?.is_membership ?? false;
          const isFreeVip = membership?.membership_type === MembershipTypeFreeVIP;
          const hasPlayEntitlement = isVip;
          const purchasedDigitalAlbumsIds = digitalAlbums?.albums?.map((t2) => t2.id).filter((t2) => t2) ?? [];
          return {
            commerceInfo,
            isAdFree,
            type,
            isVip,
            isFreeVip,
            vipExpireAt,
            hasPlayEntitlement,
            purchasedDigitalAlbumsIds,
            upsell: upsell ?? void 0,
            audioEffects: commerceInfo?.benefit_base?.audio_effect?.audio_effect_detail ?? [],
            commerceConfig: commerceConfig ?? void 0
          };
        }
        async refreshCommerceInfo(type) {
          const isLogin = !!await protocolOf("user" /* user */).getUserInfoState();
          let commerceInfo;
          let digitalAlbums;
          let upsell;
          let commerceConfig;
          upsell = await protocolOf("request" /* request */).request("GetUpsell", {});
          protocolOf("resPreload" /* resPreload */).addObject(upsell);
          commerceInfo = await protocolOf("request" /* request */).request("GetCommerceInfo", {
            includes: [
              "membership",
              "offers",
              "trade",
              "assets",
              "benefit_base"
            ]
          });
          console.log("new commerce info", commerceInfo);
          if (isLogin) {
            digitalAlbums = await protocolOf("request" /* request */).request("GetDigitalAlbums", {});
            commerceConfig = await protocolOf("request" /* request */).request("GetCommerceConfig", {});
          }
          const prevState = this.computeState({
            commerceInfo: this.state.value.commerceInfo ?? null,
            digitalAlbums: digitalAlbums ?? null,
            upsell: this.state.value.upsell ?? null,
            commerceConfig: this.state.value.commerceConfig ?? null
          });
          const nextState = this.computeState({
            commerceInfo: commerceInfo ?? null,
            digitalAlbums: digitalAlbums ?? null,
            upsell: upsell ?? null,
            commerceConfig: commerceConfig ?? null
          });
          const isEntitlementChanged = this.state.value.hasPlayEntitlement !== nextState.hasPlayEntitlement;
          const qualityList = getQualityList(nextState.commerceInfo?.benefit_base?.quality);
          const playerState = await protocolOf("sharedState" /* sharedState */).get("player");
          const currentQuality = playerState.quality;
          const currentAudioEffect = playerState.currentAudioEffect;
          const isQualityBenefitNotAvailable = nextState.commerceInfo?.benefit_base?.quality && !checkQualityBenefit(qualityList, currentQuality);
          const isAudioEffectBenefitNotAvailable = currentAudioEffect && !checkAudioEffectBenefit(nextState.audioEffects, currentAudioEffect);
          if (prevState.type !== nextState.type || type !== "timer" && type !== "focus") {
            protocolOf("applog" /* applog */).report({
              event: "vip_status_log",
              params: {
                type: {
                  "init": "start",
                  "focus": "background_to_foreground",
                  "session-changed": "change",
                  "server-push": "change",
                  "timer": "change",
                  "purchase": "purchase",
                  "open": "open",
                  "purchase_delay_poll": "purchase_delay_poll"
                }[type],
                from_vip_status: prevState.type,
                to_vip_status: nextState.type
              }
            });
          }
          this.commerceStateCache.set(nextState);
          this.state.update(() => nextState);
          logger.info("commerce", (b2) => b2.text("is_vip status").bold(String(this.state.value.isVip)).text("->").bold(String(nextState.isVip)));
          if (isEntitlementChanged) {
            protocolOf("player" /* player */).refresh();
          }
          if (isQualityBenefitNotAvailable) {
            const fallbackQuality = FALLBACK_QUALITIES[0].key;
            logger.info("commerce", (b2) => b2.text("current quality not available due to quality benefit changed. switch to").bold(fallbackQuality));
            protocolOf("player" /* player */).setQuality(fallbackQuality).then(() => protocolOf("player" /* player */).refresh());
          }
          if (isAudioEffectBenefitNotAvailable) {
            logger.info("commerce", (b2) => b2.text("current audio effect not available due to audio effect benefit changed. turning off audio effect"));
            protocolOf("player" /* player */).setAudioEffect(null);
          }
          return nextState;
        }
      }

class CommerceServiceProtocol extends ServiceProtocol {
        async notifyVipTierChanged() {
          this.service.refreshCommerceInfo("focus");
        }
        async refreshCommerceInfo(type) {
          return this.service.refreshCommerceInfo(type);
        }
      }

export {
  CommerceService,
  CommerceServiceProtocol
};
