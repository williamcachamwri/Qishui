// src/services/appClock/appClock.ts
// @ts-nocheck
import { __toESM, require_dayjs_min } from "../../../../vendor/index";
import { logger } from "../../utils/logger";
import { Service, ServiceProtocol } from "../base";

function getHrtime() {
    return process.hrtime.bigint();
  }

let import_dayjs6: any = __toESM(require_dayjs_min());

let NS_PER_MS: any = 1000000n;

class AppClockService extends Service {
        baseAtRef = Date.now();
        refHrtime = getHrtime();
        now() {
          const elapsedMs = Number((getHrtime() - this.refHrtime) / NS_PER_MS);
          return this.baseAtRef + elapsedMs;
        }
        sync(dateLike) {
          const syncNow = (0, import_dayjs6.default)(dateLike).valueOf();
          if (Number.isNaN(syncNow)) {
            logger.warn("clock", (b2) => b2.text("sync failed. invalid date ").bold(`\`${dateLike}\``));
            return;
          }
          this.baseAtRef = syncNow;
          this.refHrtime = getHrtime();
        }
      }

class AppClockServiceProtocol extends ServiceProtocol {
        async now() {
          return this.service.now();
        }
        async sync(dateLike) {
          return this.service.sync(dateLike);
        }
      }

export {
  AppClockService,
  AppClockServiceProtocol
};
