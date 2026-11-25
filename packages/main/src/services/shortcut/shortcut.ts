// src/services/shortcut/shortcut.ts
// @ts-nocheck
import { __require, __toESM, require_lodash } from "../../../../vendor/index";
import { State } from "../../base/state/state";
import { StorageState } from "../../base/storage/storageState";
import { logger } from "../../utils/logger";
import { ShortcutActionFnMap, validateShortcutStr } from "../../utils/shortcut";
import { Service, ServiceProtocol } from "../base";
import { protocolOf } from "../index";
import "../serviceId";
import { initialSharedState } from "../sharedState/initialState";
import "../storage/type";
import { defaultShortcutSettings, shortcutStrBlockList } from "./consts";

function isRegistered(str) {
    try {
      return import_electron30.globalShortcut.unregister(str);
    } catch (e) {
      logger.error("shortcut", e);
      return false;
    }
  }

let import_electron30: any = __require("electron");

let import_lodash4: any = __toESM(require_lodash());

class ShortcutService extends Service {
        shortcutStorage = new StorageState("Config" /* config */, "shortcutSettings", defaultShortcutSettings);
        shortcutState = new State(initialSharedState.shortcut);
        async initialize() {
          await this.shortcutStorage.whenReady();
          this.shortcutState.onUpdate((v2) => {
            protocolOf("sharedState" /* sharedState */).update("shortcut", v2);
            this.shortcutStorage.set(v2);
          });
          logger.info("shortcut", (b2) => b2.text("shortcutSettings storage").object(this.shortcutStorage.get()));
          this.shortcutState.update(() => this.shortcutStorage.get());
          logger.info("shortcut", (b2) => b2.text("initialize\uFF0C\u53D6\u6D88\u6CE8\u518C\u6240\u6709\u5FEB\u6377\u952E"));
          import_electron30.globalShortcut.unregisterAll();
          await this.applyAllShortcuts();
        }
        async rollbackDefaultSettings() {
          logger.info("shortcut", (b2) => b2.text("\u6062\u590D\u9ED8\u8BA4\uFF0C\u53D6\u6D88\u6CE8\u518C\u6240\u6709\u5FEB\u6377\u952E"));
          import_electron30.globalShortcut.unregisterAll();
          this.shortcutState.update(() => defaultShortcutSettings);
          await this.applyAllShortcuts();
        }
        async applyAllShortcuts() {
          if (this.shortcutState.value.isGlobalShortcutEnabled) {
            this.registerAllGlobalShortcuts();
          }
        }
        unregisterAllGlobalShortcuts() {
          import_lodash4.default.values(this.shortcutState.value.shortcuts).map((v2) => this.unregisterShortcut(v2.global));
        }
        registerAllGlobalShortcuts() {
          import_lodash4.default.keys(this.shortcutState.value.shortcuts).map((action) => this.registerShortcut(action, this.shortcutState.value.shortcuts[action].global, "global"));
        }
        updateGlobalShortcutEnabled(value) {
          this.shortcutState.update((v2) => ({ ...v2, isGlobalShortcutEnabled: value }));
          if (value) {
            this.registerAllGlobalShortcuts();
          } else {
            this.unregisterAllGlobalShortcuts();
          }
          protocolOf("applog" /* applog */).report({
            event: "hotkey_settings",
            params: {
              cover_type: "global",
              action_type: value ? "turn_on" : "turn_off"
            }
          });
        }
        /**
         * 更新一个快捷键配置并重新注册
         * @param { ShortcutAction } action 动作
         * @param { string } shortcutStr 快捷键组合字符串
         * @param { 'inApp' | 'global' } type 类型(应用内快捷键/全局快捷键)
         */
        async updateShortcut(action, shortcutStr, type) {
          logger.info("shortcut", (b2) => b2.text(`\u4FEE\u6539${type}\u5FEB\u6377\u952E\u4E3A"${shortcutStr}", \u7528\u4E8E\u89E6\u53D1"${action}"`));
          if (!validateShortcutStr(shortcutStr, type)) {
            logger.info("shortcut", (b2) => b2.text(`shortcut str validate failed: ${shortcutStr}`));
            return false;
          }
          const prevShortcutStr = this.shortcutState.value.shortcuts[action]?.[type];
          if (shortcutStr && import_lodash4.default.chain(this.shortcutState.value.shortcuts).map((e) => [e.inApp, e.global]).flatten().value().includes(shortcutStr)) {
            return false;
          }
          const result = this.registerShortcut(action, shortcutStr, type);
          if (result) {
            this.unregisterShortcut(prevShortcutStr);
            this.shortcutState.update((v2) => import_lodash4.default.merge({}, v2, { shortcuts: { [action]: { [type]: shortcutStr } } }));
          }
          return result;
        }
        registerShortcut(action, shortcutStr, type) {
          if (!shortcutStr) {
            return true;
          }
          if (shortcutStrBlockList.includes(shortcutStr)) {
            return false;
          }
          if (type === "inApp") {
            return true;
          }
          const result = import_electron30.globalShortcut.register(shortcutStr, () => ShortcutActionFnMap[action]?.());
          logger.info("shortcut", (b2) => b2.text(`\u6CE8\u518C${type}\u5FEB\u6377\u952E"${shortcutStr}${result ? "\u6210\u529F" : "\u5931\u8D25"}", \u7528\u4E8E\u89E6\u53D1"${action}"`));
          return result;
        }
        unregisterShortcut(shortcutStr) {
          if (!shortcutStr || !isRegistered(shortcutStr)) {
            return;
          }
          logger.info("shortcut", (b2) => b2.text(`\u53D6\u6D88\u6CE8\u518C${shortcutStr}`));
          try {
            import_electron30.globalShortcut.unregister(shortcutStr);
          } catch (e) {
            logger.error("shortcut", e);
          }
        }
      }

class ShortcutServiceProtocol extends ServiceProtocol {
        async updateGlobalShortcutEnabled(value) {
          this.service.updateGlobalShortcutEnabled(value);
        }
        async updateShortcut(action, shortcutStr, type) {
          const result = await this.service.updateShortcut(action, shortcutStr, type);
          protocolOf("applog" /* applog */).report({
            event: "hotkey_settings",
            params: {
              cover_type: type === "inApp" ? "local" : "global",
              action_type: "change",
              status: result ? "success" : "failed"
            }
          });
          if (!result) {
            protocolOf("renderer" /* renderer */).showToast({ message: "\u5FEB\u6377\u952E\u5DF2\u88AB\u5360\u7528" });
          }
          return result;
        }
        async rollbackDefaultSettings() {
          await this.service.rollbackDefaultSettings();
          protocolOf("renderer" /* renderer */).showToast({ message: "\u5DF2\u6062\u590D\u9ED8\u8BA4" });
        }
      }

export {
  ShortcutService,
  ShortcutServiceProtocol
};
