// src/renderer/utils/size.ts
// @ts-nocheck

function getReadableSizeString(bytes2, si = false, dp = 1) {
    const thresh = si ? 1e3 : 1024;
    if (Math.abs(bytes2) < thresh) {
      return `${bytes2} B`;
    }
    const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u2 = -1;
    const r2 = 10 ** dp;
    do {
      bytes2 /= thresh;
      ++u2;
    } while (Math.round(Math.abs(bytes2) * r2) / r2 >= thresh && u2 < units.length - 1);
    return `${bytes2.toFixed(dp)} ${units[u2]}`;
  }

export {
  getReadableSizeString
};
