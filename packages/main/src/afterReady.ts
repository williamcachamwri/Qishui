// src/afterReady.ts
// @ts-nocheck
import { __require, __toESM, require_A8bJ_RdzB4oMFg_GlXosv, require_bdms, require_device, require_index_cjs } from "../../vendor/index";
import "./utils/launched";
import { setGlobalConfig } from "./base/globalConfig/value";
import { logger } from "./utils/logger";
import { getDeviceInfo, registerDevice, setDeviceInfo } from "./base/device/device";
import { getFallbackDid } from "./utils/fallbackDid";
import { getChannel } from "./utils/channel";
import { setupAlog } from "./libs/alog/index";
import { collectPerf } from "./utils/perf";
import { cleanupColdStartDeeplinkCollector } from "./libs/deeplink/utils";
import { refreshTTNetWithGlobalConfig } from "./utils/ttnet";

async function afterReady() {
    collectPerf("launch_0");
    const mainInspectorPort = process.env[MAIN_INSPECTOR_PORT_ENV];
    if (false) {
      try {
        if (!/^\d+$/.test(mainInspectorPort)) {
          throw new Error(`Invalid ${MAIN_INSPECTOR_PORT_ENV}: ${mainInspectorPort}`);
        }
        const port = Number.parseInt(mainInspectorPort, 10);
        if (port <= 0 || port > 65535) {
          throw new Error(`Invalid ${MAIN_INSPECTOR_PORT_ENV}: ${mainInspectorPort}`);
        }
        inspector.open(port, "127.0.0.1", false);
        logger.info("inspector", (b2) => b2.text(`open on ${port}`));
      } catch (err) {
        logger.error("inspector", err);
      }
    }
    const fakeDid = getFallbackDid();
    const singleInstanceLock = process.mas || import_electron35.app.requestSingleInstanceLock();
    if (!singleInstanceLock) {
      import_electron35.app.exit();
      return;
    }
    bdms7.report("cold_start");
    logger.info("env", (b2) => b2.object({
      IS_DEV: false,
      APP_ID: 386088,
      APP_ID_MOBILE: 8478,
      APP_VERSION: "3.7.0",
      APP_VERSION_CODE: "30070000",
      APP_BRANCH: "master",
      TRON_BUILD_ID: "452316191"
    }));
    process.on("uncaughtException", (err) => {
      logger.error("uncaught", err);
    });
    collectPerf("launch_1");
    const userData = import_electron35.app.getPath("userData");
    let deviceData = await getDeviceInfo() ?? {};
    collectPerf("launch_2");
    const channel = await getChannel();
    logger.info("channel", (b2) => b2.text(channel));
    if ((0, import_device5.getSerial)() !== deviceData.serial) {
      deviceData = {};
      import_node_fs13.default.rmSync(import_node_path12.default.resolve(userData, "LunaStorage"), { recursive: true, force: true });
    }
    if (!deviceData.did || !deviceData.iid) {
      const registeredDeviceInfo = await registerDevice({ deviceData, channel });
      if (registeredDeviceInfo) {
        deviceData = { ...deviceData, ...registeredDeviceInfo };
        setDeviceInfo(registeredDeviceInfo);
      } else {
        logger.info("device_id", (b2) => b2.text("fallback with temporary deviceId").bold(deviceData.did));
      }
    } else {
      registerDevice({ deviceData, channel, isUpdate: true }).then((result) => {
        if (result) {
          deviceData = { ...deviceData, ...result };
          console.log("nextdevicedata", deviceData);
          setDeviceInfo(result);
        }
      });
    }
    collectPerf("launch_3");
    import_electron35.app.setTTConfig({
      userUniqueId: deviceData.did ?? fakeDid,
      enableAppLaunchLog: true
    });
    import_base26.default.config({
      deviceId: deviceData.did ?? fakeDid,
      userId: deviceData.did ?? fakeDid
    });
    import_base26.default.report({
      ev_type: "pageview",
      payload: {
        source: "init",
        pid: "background"
      }
    });
    import_electron35.parfait.init({
      appID: 386088,
      deviceID: deviceData.did ?? fakeDid,
      userID: "",
      debug: false,
      host: "https://pc-mon.zijieapi.com",
      appVersion: "3.7.0",
      channel: "master",
      uploadErrorNetworkLog: true,
      useAlogCloud: true
    });
    import_electron35.ttCrashReporter.init({
      enable: true,
      appID: 386088,
      host: "https://pc-mon.zijieapi.com",
      appVersion: "3.7.0",
      deviceID: deviceData.did ?? fakeDid,
      userID: ""
    });
    if (process.platform === "win32") {
      import_electron35.perfMonitor.setCpuMonitor({ enable: true });
      import_electron35.perfMonitor.setFpsMonitor({ enable: true });
      import_electron35.perfMonitor.setMemoryMonitor({ enable: true, enableChromiumMemory: true });
      import_electron35.perfMonitor.setGpuMonitor({ enable: true });
      import_electron35.perfMonitor.setSampleInterval(1);
      import_electron35.perfMonitor.setHangMonitor({ rendererLongTask: true, longTaskTimeOutSeconds: 1, mainTaskCheckDelay: true, mainTaskCheckThValue: 1e3, mainTaskDelayUploadDump: false });
      import_electron35.perfMonitor.trackStartup("init");
    }
    import_electron35.TTMetrics.setPreferences({
      enable_auto_report: true
    });
    bdms7.init({
      deviceId: deviceData.did ?? fakeDid
    });
    if (true) {
      setupAlog();
    }
    const globalConfig2 = {
      userData,
      deviceId: deviceData.did ?? fakeDid,
      installId: deviceData.iid ?? "",
      windowsDeviceId: deviceData.wdid,
      mainProcessCreationTime: process.getCreationTime() ?? -1,
      os: process.platform === "darwin" ? "macOS" : "Windows",
      osRelease: import_node_os6.default.release(),
      computerName: (0, import_device5.getComputerName)(),
      httpHeaders: {},
      verifyTrackEvent: process.argv.includes("--track-verify"),
      channel,
      fontPrefix: "app://resources/fonts"
    };
    logger.info("main", (b2) => b2.text("create global config").object(globalConfig2));
    setGlobalConfig(globalConfig2);
    refreshTTNetWithGlobalConfig(globalConfig2);
    collectPerf("launch_4");
    const { AppInstance: AppInstance2 } = await import("./app");
    const appInstance = new AppInstance2();
    cleanupColdStartDeeplinkCollector();
    appInstance.start();
  }

let import_register: any = __toESM(require_A8bJ_RdzB4oMFg_GlXosv());

let import_node_path12: any = __toESM(__require("node:path"));

let import_node_fs13: any = __toESM(__require("node:fs"));

let import_node_os6: any = __toESM(__require("node:os"));

let import_electron35: any = __require("electron");

let bdms7: any = __toESM(require_bdms());

let import_device5: any = __toESM(require_device());

let import_base26: any = __toESM(require_index_cjs());

let MAIN_INSPECTOR_PORT_ENV: any = "LUNA_MAIN_INSPECTOR_PORT";

export {
  afterReady
};
