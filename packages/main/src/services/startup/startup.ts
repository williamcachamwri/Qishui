// src/services/startup/startup.ts
// @ts-nocheck
import { __require, __toESM } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { initialSharedState } from "../sharedState/initialState";
import { State } from "../../base/state/state";
import { protocolOf } from "../index";
import "../serviceId";
import "../storage/type";

let import_node_path5: any = __toESM(__require("node:path"));

let import_node_fs6: any = __toESM(__require("node:fs"));

let import_electron25: any = __require("electron");

class StartupService extends Service {
        state = new State(initialSharedState.startup);
        options = {
          args: ["--auto-startup"]
        };
        async initialize() {
          if (process.platform === "win32") {
            const launcher = import_node_path5.default.resolve(import_node_path5.default.dirname(process.execPath), "../SodaMusicLauncher.exe");
            let hasLauncher = false;
            try {
              await import_node_fs6.default.promises.access(launcher);
              hasLauncher = true;
            } catch {
            }
            this.options.path = hasLauncher ? import_node_path5.default.resolve(import_node_path5.default.dirname(process.execPath), "../SodaMusicLauncher.exe") : process.execPath;
          }
          const isDefaultSet = await protocolOf("storage" /* storage */).get("Config" /* config */, "auto_launch_default_set");
          if (!isDefaultSet && !process.mas) {
            await protocolOf("storage" /* storage */).set("Config" /* config */, "auto_launch_default_set", true);
            this.setInternal(false);
          }
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("startup", state);
          });
          this.readAutoStartup();
        }
        readAutoStartup() {
          const settings = import_electron25.app.getLoginItemSettings(this.options);
          this.state.update((state) => {
            if (process.platform === "win32") {
              state.isAutoStartup = settings.openAtLogin && settings.launchItems.some((t2) => t2.enabled);
            } else {
              state.isAutoStartup = settings.openAtLogin;
            }
          });
        }
        async setInternal(v2) {
          if (process.platform === "win32") {
            import_electron25.app.setLoginItemSettings({
              ...this.options,
              openAtLogin: v2,
              enabled: v2
            });
          } else {
            import_electron25.app.setLoginItemSettings({
              ...this.options,
              openAtLogin: v2
            });
          }
          this.readAutoStartup();
        }
      }

class StartupServiceProtocol extends ServiceProtocol {
        setAutoStartup(v2) {
          this.service.state.update((state) => {
            state.isAutoStartup = v2;
          });
          this.service.setInternal(v2);
        }
      }

export {
  StartupService,
  StartupServiceProtocol
};
