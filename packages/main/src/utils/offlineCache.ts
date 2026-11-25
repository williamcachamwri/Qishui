// src/utils/offlineCache.ts
// @ts-nocheck
import { __require, __toESM } from "../../../vendor/index";
import { getGlobalConfig } from "../base/globalConfig/value";
import "../services/serviceId";
import { fetch2 } from "./request";
import { getResourcesPath } from "./resources";
import { generateResourceId } from "./offlineCacheRules";

async function handleOfflineCacheRequest(req) {
    console.log("handleOfflineCacheRequest", req.url);
    const id = generateResourceId(req.url);
    let offlineResource;
    const builtinDir = await getResourcesPath("offline.asar");
    const updatedDir = import_node_path11.default.resolve(getGlobalConfig().userData, "offline");
    const searchPaths = [
      import_node_path11.default.resolve(updatedDir, id),
      ...builtinDir ? [import_node_path11.default.resolve(builtinDir, id)] : []
    ];
    for (const p2 of searchPaths) {
      try {
        const headers = JSON.parse(await import_node_fs12.default.promises.readFile(p2 + ".headers", "utf-8"));
        const body = await import_node_fs12.default.promises.readFile(p2);
        offlineResource = {
          localPath: p2,
          body,
          headers
        };
        break;
      } catch (e) {
        console.log("offlinecache fallback", e);
        continue;
      }
    }
    console.log("offlineResource", offlineResource);
    downloadResourceAsync(req);
    if (!offlineResource) {
      return fetch2(req);
    }
    return new Response(new Uint8Array(offlineResource.body), {
      status: 200,
      headers: offlineResource.headers
    });
  }

async function downloadResourceAsync(req) {
    const { protocolOf: protocolOf2 } = await import("../services/index");
    const settings = await protocolOf2("appSettings" /* appSettings */).getSetting("offline");
    if (settings?.redirect[req.url]) {
      req = new Request(settings.redirect[req.url], {
        method: req.method,
        headers: req.headers,
        body: req.body
      });
    }
    const updatedDir = import_node_path11.default.resolve(getGlobalConfig().userData, "offline");
    await import_node_fs12.default.promises.mkdir(updatedDir, { recursive: true });
    const response = await fetch2(req);
    const content = await response.arrayBuffer();
    const resourceId = generateResourceId(req.url);
    await import_node_fs12.default.promises.writeFile(import_node_path11.default.resolve(updatedDir, resourceId), Buffer.from(content));
    await import_node_fs12.default.promises.writeFile(import_node_path11.default.resolve(updatedDir, resourceId + ".headers"), JSON.stringify(Object.fromEntries(response.headers.entries())));
  }

let import_node_path11: any = __toESM(__require("node:path"));

let import_node_fs12: any = __toESM(__require("node:fs"));

export {
  handleOfflineCacheRequest
};
