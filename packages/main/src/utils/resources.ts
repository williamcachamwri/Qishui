// src/utils/resources.ts
// @ts-nocheck
import { __require, __toESM } from "../../../vendor/index";

async function getResourcesPath(relativePath: string): Promise<string | undefined> {
  const distDir = import_path2.default.resolve(__dirname);
  const projectRoot = import_path2.default.resolve(__dirname, "..");
  const normalizedRendererRel = relativePath.replace(/^([^/\\]+)\.asar(?=[/\\]|$)/, "renderers/$1");
  const normalizedOfflineRel = relativePath === "offline.asar" ? "offline" : relativePath;
  const searchPaths = [
    import_path2.default.resolve(distDir, normalizedRendererRel),
    import_path2.default.resolve(projectRoot, "resources", normalizedOfflineRel),
    import_path2.default.resolve(projectRoot, "resources", relativePath)
  ];
  for (const searchPath of searchPaths) {
    try {
      await import_fs2.default.promises.stat(searchPath);
      return searchPath;
    } catch {
      continue;
    }
  }
  return undefined;
}
let import_electron21: any = __require("electron");
let import_path2: any = __toESM(__require("path"));
let import_fs2: any = __toESM(__require("fs"));

export {
  getResourcesPath
};
