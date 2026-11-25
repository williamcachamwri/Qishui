// src/utils/value.ts
// @ts-nocheck
import { getGlobalConfig } from "../base/globalConfig/value";

function getValueByPlatform(win32, darwin, emptyValue) {
    if (getGlobalConfig().os === "Windows") {
      return win32;
    }
    if (getGlobalConfig().os === "macOS") {
      return darwin;
    }
    return emptyValue;
  }

export {
  getValueByPlatform
};
