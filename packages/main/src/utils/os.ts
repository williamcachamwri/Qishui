// src/utils/os.ts
// @ts-nocheck
import { __require, __toESM, require_plist } from "../../../vendor/index";
import { getGlobalConfig } from "../base/globalConfig/value";

function getReadableOsVersion() {
    try {
      if (readableOsVersion) {
        return readableOsVersion;
      }
      if (process.platform === "darwin") {
        const text = import_node_fs9.default.readFileSync("/System/Library/CoreServices/SystemVersion.plist", "utf-8");
        const data = import_plist.default.parse(text) ?? {};
        readableOsVersion = data.ProductUserVisibleVersion ?? data.ProductVersion ?? import_node_os3.default.release();
        return readableOsVersion;
      } else if (process.platform === "win32") {
        readableOsVersion = {
          "10.0": "10",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "7",
          "6.0": "Vista",
          "5.2": "XP",
          "5.1": "XP",
          "5.0": "2000"
        }[import_node_os3.default.release().split(".").slice(0, 2).join(".")] ?? import_node_os3.default.release().split(".").slice(0, 2).join(".");
        return readableOsVersion;
      }
      return "unknown";
    } catch {
      return "unknown";
    }
  }

function isWindows10OrAbove() {
    const globalConfig2 = getGlobalConfig();
    return globalConfig2.os === "Windows" && Number.parseInt(globalConfig2.osRelease.split(".")[0], 10) >= 10;
  }

function supportsTaskbarWidget() {
    const globalConfig2 = getGlobalConfig();
    if (globalConfig2.os === "Windows") {
      return isWindows10OrAbove();
    }
    return false;
  }

function isPopularOS() {
    const globalConfig2 = getGlobalConfig();
    if (globalConfig2.os === "Windows") {
      return isWindows10OrAbove();
    } else {
      return true;
    }
  }

let import_node_fs9: any = __toESM(__require("node:fs"));

let import_node_os3: any = __toESM(__require("node:os"));

let import_plist: any = __toESM(require_plist());

let readableOsVersion: any = "";

export {
  getReadableOsVersion,
  isPopularOS,
  supportsTaskbarWidget
};
