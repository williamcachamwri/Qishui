// src/services/player/qualityDefaults.ts
// @ts-nocheck

let FALLBACK_QUALITIES: any = [
        { key: "highest", name: "\u6781\u9AD8\u97F3\u8D28", desc: "", stage: "free", expire_time: Infinity },
        { key: "medium", name: "\u6807\u51C6\u97F3\u8D28", desc: "", stage: "free", expire_time: Infinity }
      ];

let DEFAULT_QUALITY: any = "higher";

export {
  DEFAULT_QUALITY,
  FALLBACK_QUALITIES
};
