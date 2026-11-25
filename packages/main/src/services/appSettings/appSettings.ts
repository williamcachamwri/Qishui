// src/services/appSettings/appSettings.ts
// @ts-nocheck
import { __require, __toESM } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { StorageState } from "../../base/storage/storageState";
import { AsyncCell } from "../../utils/asyncCell";
import { logger } from "../../utils/logger";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { SyncState } from "../sharedState/syncState";
import "../storage/type";
import "../window/type";

let import_os: any = __toESM(__require("os"));

class AppSettingsService extends Service {
        cachedSettings = new StorageState("AppSettingsCache" /* appSettingsCache */, "appSettings", void 0);
        userState = new SyncState("user");
        windowState = new SyncState("window");
        ready = new AsyncCell();
        updateCallbacks = /* @__PURE__ */ new Set();
        async initialize() {
          await this.initSettings();
        }
        async initSettings() {
          await this.cachedSettings.whenReady();
          const cached = this.cachedSettings.get();
          if (cached) {
            this.notifyUpdate(cached);
            this.ready.resolve();
            this.fetchSettings().catch((e) => logger.error("appSettings", e));
          } else {
            try {
              await this.fetchSettings();
            } catch (e) {
              logger.error("appSettings", e);
            } finally {
              this.ready.resolve();
            }
          }
          setInterval(() => {
            this.fetchSettings();
          }, 30 * 60 * 1e3);
          this.windowState.onUpdate((state, oldState) => {
            if (state.windows["main" /* main */]?.isFocus && !oldState?.windows["main" /* main */]?.isFocus) {
              this.fetchSettings();
            }
          });
          protocolOf("user" /* user */).onSessionChanged(() => this.fetchSettings());
        }
        async fetchSettings() {
          const { deviceId, channel } = getGlobalConfig();
          const hasCachedSettings = Boolean(await protocolOf("storage" /* storage */).get("AppSettingsCache" /* appSettingsCache */, "appSettings"));
          const { data } = await protocolOf("request" /* request */).requestHttp({
            url: "https://conf.qishui.com/service/settings/v3/",
            method: "GET",
            responseType: "json",
            forceWithQishuiCookies: true,
            query: {
              aid: String(386088),
              iid: "",
              device_id: deviceId,
              uuid: deviceId,
              channel,
              device_platform: "pc",
              version_code: "30070000",
              platform: process.platform,
              os_release: import_os.default.release()
            },
            timeout: hasCachedSettings ? void 0 : 15e3
          });
          logger.info("settings", (b2) => b2.text("fetch settings").object(data));
          const settings = data?.data?.settings;
          if (settings) {
            this.cachedSettings.set(settings);
            this.notifyUpdate(settings);
          }
        }
        notifyUpdate(data) {
          this.updateCallbacks.forEach((cb) => cb(data));
        }
        onUpdate(callback) {
          this.updateCallbacks.add(callback);
        }
        async getSetting(key) {
          await this.cachedSettings.whenReady();
          return this.cachedSettings.get()?.[key];
        }
      }

class AppSettingsServiceProtocol extends ServiceProtocol {
        async settingsAvailable() {
          await this.service.ready.get();
        }
        async getSetting(key, ignoreCache = false) {
          if (ignoreCache) {
            await this.service.ready.get();
          }
          return this.service.getSetting(key);
        }
        async fetchSettings() {
          return this.service.fetchSettings();
        }
        async getAllSettings() {
          await this.service.ready.get();
          return this.service.cachedSettings.get();
        }
        onUpdate(callback) {
          this.service.onUpdate(callback);
        }
      }

export {
  AppSettingsService,
  AppSettingsServiceProtocol
};
