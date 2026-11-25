// src/utils/fallbackDid.ts
// @ts-nocheck
import { __require } from "../../../vendor/index";

function getFallbackDid() {
    return globalThis.__fallbackDid;
  }

let import_node_crypto2: any = __require("node:crypto");

if (!globalThis.__fallbackDid) {
        const didBytes = (0, import_node_crypto2.randomBytes)(8);
        let did = didBytes.readBigInt64BE();
        if (did < 0) {
          did = -did;
        }
        globalThis.__fallbackDid = `100000${String(did).slice(6)}`;
      }

export {
  getFallbackDid
};
