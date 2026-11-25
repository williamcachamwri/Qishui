// src/utils/benefits.ts
// @ts-nocheck
import { getCurrentTime } from "./currentTime";
import { FALLBACK_QUALITIES } from "../services/player/qualityDefaults";

function getQualityList(benefitQuality) {
    const list = benefitQuality?.quality_list;
    if (list && list.length > 0) {
      return list;
    }
    return FALLBACK_QUALITIES;
  }

function checkQualityBenefit(qualityList, quality) {
    const now = getCurrentTime() / 1e3;
    const item = qualityList.find((q2) => q2.key === quality);
    if (!item) return false;
    return item.expire_time > now;
  }

function checkAudioEffectBenefit(audioEffects, effectKey) {
    const now = getCurrentTime() / 1e3;
    const item = audioEffects.find((e) => e.key === effectKey);
    if (!item) return false;
    return item.expire_time > now;
  }

export {
  getQualityList,
  checkQualityBenefit,
  checkAudioEffectBenefit
};
