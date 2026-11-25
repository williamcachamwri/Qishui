// src/utils/perf.ts
// @ts-nocheck

function collectPerf(stage) {
    perfData[stage] = {
      fromCreationTime: Date.now() - (process.getCreationTime() ?? 0),
      fromPreviousTime: Date.now() - previousTime
    };
    previousTime = Date.now();
  }

let perfData: any = {};

let previousTime: any = process.getCreationTime() ?? 0;

export {
  perfData,
  collectPerf
};
