// src/utils/fallbackDid.ts
import { randomBytes } from "node:crypto";

declare global {
  var __fallbackDid: string | undefined;
}

if (!globalThis.__fallbackDid) {
  const didBytes = randomBytes(8);
  let did = didBytes.readBigInt64BE();
  if (did < 0n) {
    did = -did;
  }
  globalThis.__fallbackDid = `100000${String(did).slice(6)}`;
}

export function getFallbackDid(): string {
  return globalThis.__fallbackDid!;
}
