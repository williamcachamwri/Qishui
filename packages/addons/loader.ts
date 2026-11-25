import path from "node:path";

const nativeReq: NodeRequire = typeof require !== "undefined" ? require : (module as any).createRequire(__filename);

export function loadNativeAddon<T = any>(name: string): T {
  const addonPath = path.resolve(__dirname, "../native", process.arch, `${name}.node`);
  return nativeReq(addonPath) as T;
}
