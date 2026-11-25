// src/services/queue/playable/utils.ts
// @ts-nocheck
import "./constants";
import "./type";

function isPlayableSupported(playable) {
    return playable.type !== "unsupported" /* Unsupported */;
  }

export {
  isPlayableSupported
};
