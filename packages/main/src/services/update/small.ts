// src/services/update/small.ts
// @ts-nocheck
import { __require, __toESM, axios_default, init_axios2, init_nanoid, nanoid, require_progress_stream, require_semver2, require_tar_stream } from "../../../../vendor/index";
import { protocolOf } from "../index";
import "../serviceId";
import { logger } from "../../utils/logger";

init_nanoid();
init_axios2();
let import_original_fs: any = __toESM(__require("original-fs"));

let import_node_path8: any = __toESM(__require("node:path"));

let import_promises2: any = __require("node:stream/promises");

let import_node_zlib3: any = __require("node:zlib");

let import_electron27: any = __require("electron");

let import_semver: any = __toESM(require_semver2());

let import_tar_stream: any = __toESM(require_tar_stream());

let import_progress_stream: any = __toESM(require_progress_stream());

class SmallUpdate {
        constructor(service) {
          this.service = service;
        }
        async getPackagesDir() {
          if (process.platform === "win32") {
            const multiVersionDir = import_node_path8.default.dirname(import_node_path8.default.dirname(import_electron27.app.getPath("exe")));
            const multiVersionDirFiles = await import_original_fs.default.promises.readdir(multiVersionDir);
            if (!multiVersionDirFiles.includes("SodaMusicLauncher.exe")) {
              return import_node_path8.default.resolve(import_electron27.app.getPath("userData"), "Packages");
            }
            return import_node_path8.default.resolve(multiVersionDir, "Packages");
          } else {
            return import_node_path8.default.resolve(import_electron27.app.getPath("userData"), "Packages");
          }
        }
        async reportSmallPackage() {
          protocolOf("applog" /* applog */).report({
            event: "update_metrics",
            params: {
              type: "small_package_check",
              is_small_package: globalThis.isSmallPackage ? 1 : 0,
              shell_version: globalThis.shellVersion
            }
          });
        }
        async updateWithSmallPackage(info, startTime, targetVersion) {
          logger.info("update", (b2) => b2.text("start small package download"));
          try {
            const packagesDir = await this.getPackagesDir();
            if (!info.smallPackage || !info.smallPackageShellMinVersion) {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "small_not_available",
                  cost: performance.now() - startTime,
                  target_version: targetVersion
                }
              });
              return false;
            }
            if (import_semver.default.lt("3.7.0", info.smallPackageShellMinVersion)) {
              protocolOf("applog" /* applog */).report({
                event: "update_metrics",
                params: {
                  type: "small_shell_low_version",
                  cost: performance.now() - startTime,
                  required_version: info.smallPackageShellMinVersion,
                  target_version: targetVersion
                }
              });
              return false;
            }
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "start_update_small",
                cost: performance.now() - startTime,
                target_version: targetVersion
              }
            });
            await import_original_fs.default.promises.mkdir(packagesDir, { recursive: true });
            const configPath = import_node_path8.default.resolve(packagesDir, "config.json");
            const response = await axios_default.get(info.smallPackage, {
              responseType: "stream"
            });
            const readable = response.data;
            const extract = import_tar_stream.default.extract();
            const tmpDir = import_node_path8.default.resolve(packagesDir, `${targetVersion}-downloading-${nanoid()}`);
            const versionDir = import_node_path8.default.resolve(packagesDir, targetVersion);
            await import_original_fs.default.promises.mkdir(tmpDir, { recursive: true });
            extract.on("entry", async (header, stream5, next) => {
              const dstPath = import_node_path8.default.resolve(tmpDir, header.name);
              const dstDir = import_node_path8.default.dirname(dstPath);
              await import_original_fs.default.promises.mkdir(dstDir, { recursive: true });
              await (0, import_promises2.pipeline)(stream5, (0, import_original_fs.createWriteStream)(dstPath));
              next();
            });
            const p2 = (0, import_progress_stream.default)({
              length: Number.parseInt(response.headers["content-length"]?.toString() ?? "0", 10),
              time: 32
            });
            p2.on("progress", (progress3) => {
              this.service.state.update((state) => {
                state.progress = { ...progress3 };
              });
            });
            await (0, import_promises2.pipeline)(readable, p2, (0, import_node_zlib3.createGunzip)(), extract);
            await import_original_fs.default.promises.rm(versionDir, { recursive: true, force: true });
            await import_original_fs.default.promises.rename(tmpDir, versionDir);
            await import_original_fs.default.promises.writeFile(configPath, JSON.stringify({
              latestVersion: targetVersion
            }));
            logger.info("update", (b2) => b2.text("small package download finished"));
            return "small";
          } catch (e) {
            protocolOf("applog" /* applog */).report({
              event: "update_metrics",
              params: {
                type: "small_error",
                cost: performance.now() - startTime,
                reason: e.message,
                target_version: targetVersion
              }
            });
            logger.error("update", e);
            return false;
          }
        }
        async tryRemoveOldVersion() {
          const packagesDir = await this.getPackagesDir();
          try {
            await import_original_fs.default.promises.access(packagesDir);
          } catch {
            console.log("No packages dir");
            return;
          }
          const multiVersionDirFiles = await import_original_fs.default.promises.readdir(packagesDir);
          const versionsToRemove = multiVersionDirFiles.filter((t2) => {
            if (/^\d+\.\d+\.\d+$/.test(t2)) {
              return import_semver.default.compare("3.7.0", t2) === 1;
            } else if (t2.includes("-downloading-")) {
              return true;
            } else {
              return false;
            }
          });
          for (const version2 of versionsToRemove) {
            try {
              await import_original_fs.default.promises.rm(import_node_path8.default.resolve(packagesDir, version2), { recursive: true, force: true });
            } catch (e) {
            }
          }
        }
      }

export {
  SmallUpdate
};
