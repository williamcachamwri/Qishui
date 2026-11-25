// src/utils/currentTime.ts
// @ts-nocheck
import { protocolOf } from "../services/index";
import "../services/serviceId";
import { delay } from "./async";

async function syncTime() {
    while (true) {
      currentTime = await protocolOf("clock" /* appClock */).now();
      previousSyncTime = performance.now();
      await delay(1e4);
    }
  }

function getCurrentTime() {
    return currentTime + (performance.now() - previousSyncTime);
  }

let currentTime: any = Date.now();

let previousSyncTime: any = performance.now();

setTimeout(() => {
        syncTime();
      });

export {
  getCurrentTime
};
