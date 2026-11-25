// src/services/debug/debug.ts
// @ts-nocheck
import { __require } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { protocolOf } from "../index";
import "../serviceId";
import "../storage/type";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { getDeviceInfo, registerDevice, setDeviceInfo } from "../../base/device/device";

let import_electron24: any = __require("electron");

class DebugService extends Service {
        cache = {};
      }

class DebugServiceProtocol extends ServiceProtocol {
        async getSetting(key, defaultValue) {
          if (this.service.cache[key]) {
            return this.service.cache[key];
          }
          const data = await protocolOf("storage" /* storage */).get("Debug" /* debug */, `settings:${key}`) ?? defaultValue;
          this.service.cache[key] = data;
          return data;
        }
        async setSetting(key, value) {
          await protocolOf("storage" /* storage */).set("Debug" /* debug */, `settings:${key}`, value);
          this.service.cache[key] = value;
        }
        async openUserDataFolder() {
          import_electron24.shell.openPath(getGlobalConfig().userData);
        }
        async refreshDeviceInfo(isBOE) {
          let deviceData = await getDeviceInfo() ?? {};
          const registeredDeviceInfo = await registerDevice({ deviceData, isBOE });
          if (registeredDeviceInfo) {
            deviceData = registeredDeviceInfo;
            setDeviceInfo(registeredDeviceInfo);
          }
        }
      }

export {
  DebugService,
  DebugServiceProtocol
};
