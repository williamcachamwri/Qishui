// src/libs/bdticket/updater.ts
// @ts-nocheck
import { updateBdticketSettings } from "./index";
import { protocolOf } from "../../services/index";
import "../../services/serviceId";

function setupBdticketSettingsUpdater() {
    protocolOf("appSettings" /* appSettings */).getSetting("bdticket").then((bdticket2) => {
      if (bdticket2) {
        updateBdticketSettings(bdticket2);
      }
    });
    protocolOf("appSettings" /* appSettings */).onUpdate((data) => {
      if (data.bdticket) {
        updateBdticketSettings(data.bdticket);
      }
    });
  }

export {
  setupBdticketSettingsUpdater
};
