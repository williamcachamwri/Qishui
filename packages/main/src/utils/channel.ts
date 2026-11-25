// src/utils/channel.ts
// @ts-nocheck
import { __require, __toESM, require_device } from "../../../vendor/index";
import { logger } from "./logger";

async function getChannel() {
    if (false) {
      return "internal";
    }
    if (process.platform === "darwin") {
      if (process.mas) {
        return "mas";
      } else {
        return "official";
      }
    }
    if (process.platform === "win32") {
      try {
        const channelFilePath = import_node_path3.default.resolve(import_electron9.app.getPath("exe"), "../../channel");
        const channel = await import_node_fs3.default.promises.readFile(channelFilePath, "utf-8");
        return channel || "official";
      } catch (e) {
        logger.error("channel", e);
        return CHANNEL_ID_MAP[(0, import_device2.getChannelId)()] ?? "official";
      }
    }
    return "official";
  }

let import_node_path3: any = __toESM(__require("node:path"));

let import_node_fs3: any = __toESM(__require("node:fs"));

let import_electron9: any = __require("electron");

let import_device2: any = __toESM(require_device());

let CHANNEL_ID_MAP: any = {
        10001: "tencent",
        10002: "360",
        10003: "huawei",
        10004: "lenovo",
        2e4: "ug",
        20001: "seo",
        20002: "douyin-pc"
      };

export {
  getChannel
};
