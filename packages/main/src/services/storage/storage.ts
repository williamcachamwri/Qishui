// src/services/storage/storage.ts
// @ts-nocheck
import { __require, __toESM } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { AsyncQueue } from "../../utils/asyncQueue";
import { getGlobalConfig } from "../../base/globalConfig/value";
import { logger } from "../../utils/logger";
import { StoragePartition } from "./partition";

let import_node_path7: any = __toESM(__require("node:path"));

let import_node_fs8: any = __toESM(__require("node:fs"));

class StorageService extends Service {
        partition = /* @__PURE__ */ new Map();
        saveQueue = new AsyncQueue({
          capacity: 1
        });
        getPartition(id) {
          if (this.partition.has(id)) {
            return this.partition.get(id);
          } else {
            const partition = new StoragePartition(this, id);
            this.partition.set(id, partition);
            return partition;
          }
        }
        async generateCacheMap() {
          const cacheMap = {
            size: 0,
            files: []
          };
          const recursiveFile = async (file) => {
            try {
              const stat = await import_node_fs8.default.promises.stat(file);
              if (stat.isDirectory()) {
                const files = await import_node_fs8.default.promises.readdir(file);
                cacheMap.files.push({
                  path: file,
                  isDir: true,
                  size: 0
                });
                await Promise.all(files.map((name) => recursiveFile(import_node_path7.default.resolve(file, name))));
              } else if (stat.isFile()) {
                cacheMap.size += stat.size;
                cacheMap.files.push({
                  path: file,
                  isDir: false,
                  size: stat.size
                });
              }
            } catch (e) {
            }
          };
          await Promise.all(["Cache", "Code Cache", "DawnCache", "GPUCache", "File System", "LunaCache", "LunaCacheV2"].map((name) => recursiveFile(import_node_path7.default.resolve(getGlobalConfig().userData, name))));
          return cacheMap;
        }
        async cleanCacheMap(map) {
          for (const item of map.files.reverse()) {
            try {
              if (item.isDir) {
                await import_node_fs8.default.promises.rmdir(item.path);
              } else {
                await import_node_fs8.default.promises.unlink(item.path);
              }
            } catch (e) {
              logger.error("storage", e);
            }
          }
        }
      }

class StorageServiceProtocol extends ServiceProtocol {
        async get(partition, key) {
          return await this.service.getPartition(partition).get(key);
        }
        async set(partition, key, value) {
          return await this.service.getPartition(partition).set(key, value);
        }
        async delete(partition, key) {
          return await this.service.getPartition(partition).delete(key);
        }
        async flush(partition) {
          return await this.service.getPartition(partition).flush();
        }
        async generateCacheMap() {
          return await this.service.generateCacheMap();
        }
        async cleanCacheMap(map) {
          return await this.service.cleanCacheMap(map);
        }
      }

export {
  StorageService,
  StorageServiceProtocol
};
