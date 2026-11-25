// src/utils/ttnet.ts
// @ts-nocheck
import { __require, __toESM, require_ttnet } from "../../../vendor/index";
import { getFallbackDid } from "./fallbackDid";
import { logger } from "./logger";

function getTTNetIdentity(config) {
    const deviceID = config?.deviceId || getFallbackDid();
    return {
      deviceID,
      channel: config?.channel ?? (false ? "local_test" : false ? "internal" : "official"),
      devicePlatform: process.platform === "darwin" ? "mac" : "windows",
      deviceType: process.platform === "darwin" ? "MacOS" : "Windows"
    };
  }

function createElectronTTNetParams(config) {
    const identity = getTTNetIdentity(config);
    return {
      appID: String(386088),
      appName: "luna_pc",
      deviceID: identity.deviceID,
      versionCode: "30070000",
      deviceType: identity.deviceType,
      channel: identity.channel,
      devicePlatform: identity.devicePlatform,
      uuid: identity.deviceID,
      updateVersionCode: "30070000",
      tncHostFirst: ttNetSharedConfig.tncHosts[0],
      tncHostSecond: ttNetSharedConfig.tncHosts[1],
      tncHostThird: ttNetSharedConfig.tncHosts[2],
      isMainProcess: "1",
      domainHTTPDNS: ttNetSharedConfig.httpDns,
      domainNetlog: ttNetSharedConfig.domainNetlog,
      getDomainDefaultJson: JSON.stringify(ttNetSharedConfig.domainDefaultJson),
      domainBOE: ttNetSharedConfig.domainBoe,
      tncHeaders: [],
      tncLoadFlags: "0",
      httpDNSLoadFlags: "0",
      useDomesticStoreRegion: true
    };
  }

function createElectronTTNetOptions(config) {
    return {
      // HTTPS traffic is already routed through protocol.handle + @luna/ttnet.
      enableProxyNativeNetwork: false,
      enableQUIC: false,
      enableVerboseLog: false,
      persistParams: false,
      storeIDCRuleJSON: "",
      ttnetParams: createElectronTTNetParams(config)
    };
  }

function createLunaTTNetOptions(config) {
    const identity = getTTNetIdentity(config);
    const tncQueries = config?.installId ? { iid: config.installId } : {};
    return {
      storagePath: ttnetStoragePath,
      appId: String(386088),
      appName: "luna_pc",
      deviceId: identity.deviceID,
      versionCode: "30070000",
      deviceType: identity.deviceType,
      channel: identity.channel,
      devicePlatform: identity.devicePlatform,
      uuid: identity.deviceID,
      updateVersionCode: "30070000",
      tncHostFirst: ttNetSharedConfig.tncHosts[0],
      tncHostSecond: ttNetSharedConfig.tncHosts[1],
      tncHostThird: ttNetSharedConfig.tncHosts[2],
      isMainProcess: "1",
      httpDns: ttNetSharedConfig.httpDns,
      domainNetlog: ttNetSharedConfig.domainNetlog,
      domainBoe: ttNetSharedConfig.domainBoe,
      domainDefaultJson: ttNetSharedConfig.domainDefaultJson,
      tncHeaders: [],
      tncQueries,
      tncLoadFlags: 0,
      httpDnsLoadFlags: 0,
      useDomesticStoreRegion: true,
      useInjectMode: true
    };
  }

function maskIdentifier(value) {
    if (!value) {
      return "";
    }
    if (value.length <= 8) {
      return "*".repeat(value.length);
    }
    return `${value.slice(0, 4)}...${value.slice(-4)}`;
  }

function getTNCServerConfigCacheStatus() {
    const serverConfigPath = import_node_path.default.resolve(ttnetStoragePath, "server.json");
    try {
      const stat = import_node_fs.default.statSync(serverConfigPath);
      return {
        path: serverConfigPath,
        exists: true,
        size: stat.size,
        mtimeMs: stat.mtimeMs
      };
    } catch {
      return {
        path: serverConfigPath,
        exists: false,
        size: 0,
        mtimeMs: 0
      };
    }
  }

function summarizeElectronTTNetParams(params) {
    return {
      appID: params.appID,
      appName: params.appName,
      deviceID: maskIdentifier(params.deviceID),
      versionCode: params.versionCode,
      deviceType: params.deviceType,
      channel: params.channel,
      devicePlatform: params.devicePlatform,
      tncHosts: [params.tncHostFirst, params.tncHostSecond, params.tncHostThird],
      isMainProcess: params.isMainProcess,
      domainHTTPDNS: params.domainHTTPDNS,
      domainNetlog: params.domainNetlog,
      domainBOE: params.domainBOE,
      tncHeadersCount: params.tncHeaders.length,
      tncLoadFlags: params.tncLoadFlags,
      httpDNSLoadFlags: params.httpDNSLoadFlags,
      useDomesticStoreRegion: params.useDomesticStoreRegion
    };
  }

function summarizeLunaTTNetParams(params) {
    const iid = Array.isArray(params.tncQueries) ? params.tncQueries.find((query) => query.name === "iid")?.value : params.tncQueries?.iid;
    return {
      storagePath: params.storagePath,
      appId: params.appId,
      appName: params.appName,
      deviceId: maskIdentifier(params.deviceId),
      installId: maskIdentifier(iid == null ? "" : String(iid)),
      versionCode: params.versionCode,
      deviceType: params.deviceType,
      channel: params.channel,
      devicePlatform: params.devicePlatform,
      tncHosts: [params.tncHostFirst, params.tncHostSecond, params.tncHostThird],
      isMainProcess: params.isMainProcess,
      httpDns: params.httpDns,
      domainNetlog: params.domainNetlog,
      domainBoe: params.domainBoe,
      tncHeadersCount: params.tncHeaders?.length ?? 0,
      tncQueries: Object.keys(params.tncQueries ?? {}),
      tncLoadFlags: params.tncLoadFlags,
      httpDnsLoadFlags: params.httpDnsLoadFlags,
      useDomesticStoreRegion: params.useDomesticStoreRegion,
      cache: getTNCServerConfigCacheStatus()
    };
  }

function updateTTNetVerificationSummary(stage, electronParams, lunaParams) {
    ttnetVerificationSummary = {
      stage,
      updatedAt: Date.now(),
      electron: summarizeElectronTTNetParams(electronParams),
      luna: summarizeLunaTTNetParams(lunaParams)
    };
    logger.info("ttnet", (b2) => b2.text(`tnc params ${stage}`).object(ttnetVerificationSummary ?? void 0));
  }

function refreshTTNetWithGlobalConfig(config) {
    const electronParams = createElectronTTNetParams(config);
    const lunaParams = createLunaTTNetOptions(config);
    updateTTNetVerificationSummary("global-config", electronParams, lunaParams);
    try {
      import_electron3.ttnet.triggerGetDomain(electronParams, true);
      logger.info("ttnet", (b2) => b2.text("trigger electron get-domain with global config"));
    } catch (error) {
      logger.error("ttnet", error);
    }
    try {
      (0, import_ttnet2.triggerGetDomain)(lunaParams, true);
      logger.info("ttnet", (b2) => b2.text("trigger luna get-domain with global config"));
    } catch (error) {
      logger.error("ttnet", error);
    }
  }

let import_node_fs: any = __toESM(__require("node:fs"));

let import_node_path: any = __toESM(__require("node:path"));

let import_electron3: any = __require("electron");

let import_ttnet2: any = __toESM(require_ttnet());

let ttnetStoragePath: any = import_node_path.default.resolve(import_electron3.app.getPath("userData"), "TTNet");

import_node_fs.default.mkdirSync(ttnetStoragePath, { recursive: true });

let ttNetSharedConfig: any = {
        httpDns: "dig.bdurl.net",
        tncHosts: [
          "tnc3-bjlgy.zijieapi.com",
          "tnc3-alisc1.zijieapi.com",
          "tnc3-aliec2.zijieapi.com"
        ],
        domainDefaultJson: {
          message: "success",
          opaque_data_enabled: false ? 0 : 1,
          data: {
            http_dns_enabled: 1,
            ttnet_http_dns_enabled: 1,
            ttnet_tt_http_dns: 1,
            chromium_open: 1,
            ttnet_http_dns_addr: {
              "dig.bdurl.net": "101.36.166.16,101.36.166.17,101.36.166.18,101.36.166.19"
            },
            ttnet_detect_config: {
              enable_feedback: 1,
              timeout: 10,
              interval: 60,
              actions: 1
            },
            clientKeyConfig: {
              opaqueDataEnabled: false ? 0 : 1,
              clientKeySignEnabled: 1,
              updateHostList: ["api.qishui.com"],
              updatePathList: ["/passport/*"]
            }
          }
        },
        domainBoe: ".boe-gateway.byted.org",
        domainNetlog: "crash.snssdk.com"
      };

let ttnetVerificationSummary: any = null;

let electronTTNetOptions: any = createElectronTTNetOptions();

let initialLunaTTNetOptions: any = createLunaTTNetOptions();

updateTTNetVerificationSummary("initial", electronTTNetOptions.ttnetParams, initialLunaTTNetOptions);

import_electron3.ttnet.init(electronTTNetOptions);

import_electron3.ttnet.startWithParams(electronTTNetOptions);

(0, import_ttnet2.initTTNet)(initialLunaTTNetOptions);

import_electron3.app.on("before-quit", () => {
        (0, import_ttnet2.shutdownTTNet)();
      });

export {
  refreshTTNetWithGlobalConfig
};
