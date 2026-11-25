// src/base/device/device.ts
// @ts-nocheck
import { __require, __toESM, axios_default, init_axios2, require_bdms, require_device } from "../../../../vendor/index";
import { logger } from "../../utils/logger";

init_axios2();
async function getDeviceInfo() {
    let cacheObj;
    try {
      const cacheBuf = await import_node_fs2.default.promises.readFile(deviceFile);
      const cacheStr = import_node_zlib.default.gunzipSync(cacheBuf).toString();
      cacheObj = JSON.parse(cacheStr);
      logger.info("device_id", (b2) => b2.text("cache").object(cacheObj ?? {}));
    } catch (e) {
      logger.error("device_id", e);
    }
    return cacheObj;
  }

async function setDeviceInfo(data) {
    const cacheStr = JSON.stringify(data);
    const cacheBuf = import_node_zlib.default.gzipSync(cacheStr);
    await import_node_fs2.default.promises.writeFile(deviceFile, cacheBuf);
  }

async function registerDevice({ deviceData, channel, isBOE, isUpdate }) {
    try {
      const cdid = deviceData?.cdid ?? (0, import_node_crypto3.randomUUID)();
      const url2 = "https://api.qishui.com/service/2/desktop/device_register/";
      const query = {
        aid: 386088,
        channel,
        os: import_node_os.default.type(),
        os_version: import_node_os.default.version(),
        device_platform: process.platform === "darwin" ? "MacOS" : "PC",
        app_version: "3.7.0"
      };
      const serial = (0, import_device.getSerial)();
      const payload = {
        header: {
          device_id: deviceData?.did ?? "",
          install_id: deviceData?.iid ?? "",
          os: process.platform === "darwin" ? "MacOS" : "Windows",
          device_platform: process.platform === "darwin" ? "MacOS" : "PC",
          sdk_version: "1.0",
          sdk_version_code: 1,
          aid: 386088,
          mc: "00:00:00:00:00:00",
          channel,
          package: "com.soda.music",
          language: Intl.DateTimeFormat().resolvedOptions().locale,
          app_version: "3.7.0",
          os_version: import_node_os.default.version(),
          device_model: "no detected",
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          tz_name: Intl.DateTimeFormat().resolvedOptions().timeZone,
          tz_offset: 0,
          resolution: "no detected",
          app_region: "cn",
          app_language: "zh-CN",
          display_name: "\u6C7D\u6C34\u97F3\u4E50",
          ...process.platform === "darwin" ? {
            macos_uuid: cdid,
            macos_serial: serial,
            sku: ""
          } : {
            pc_uuid: cdid,
            pc_serial: serial
          }
        },
        gen_time: Date.now(),
        magic_tag: "ss_app_log"
      };
      const gzipeedPayload = import_node_zlib.default.gzipSync(Buffer.from(JSON.stringify(payload)));
      const decoratedPayload = (0, import_device.applogDecorated)(gzipeedPayload);
      const startRequestTime = performance.now();
      const response = await axios_default.post(url2, decoratedPayload, {
        params: query,
        timeout: 5e3,
        headers: isBOE ? {
          "x-use-boe": "1"
        } : {}
      });
      logger.info("device_id", (b2) => b2.text("request deviceId cost").time(performance.now() - startRequestTime));
      logger.info("device_id", (b2) => b2.text("deviceId response").object(response.data));
      if (!response.data.device_id_str) {
        return null;
      }
      if (!isUpdate) {
        bdms.report("did-iid-update");
      }
      return {
        did: response.data.device_id_str,
        iid: response.data.install_id_str,
        cdid,
        serial
      };
    } catch (e) {
      logger.error("device_id", e);
      return null;
    }
  }

let import_node_path2: any = __toESM(__require("node:path"));

let import_node_fs2: any = __toESM(__require("node:fs"));

let import_node_crypto3: any = __require("node:crypto");

let import_node_os: any = __toESM(__require("node:os"));

let import_node_zlib: any = __toESM(__require("node:zlib"));

let import_device: any = __toESM(require_device());

let import_electron8: any = __require("electron");

let bdms: any = __toESM(require_bdms());

let userDataPath: any = import_electron8.app.getPath("userData");

let deviceFile: any = import_node_path2.default.join(userDataPath, "DeviceV1");

export {
  getDeviceInfo,
  registerDevice,
  setDeviceInfo
};
