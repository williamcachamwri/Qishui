// src/services/freqCtrl/utils.ts
// @ts-nocheck

function resolveKeys(key) {
    if (typeof key === "string") {
      return [key];
    }
    return key;
  }

export {
  resolveKeys
};
