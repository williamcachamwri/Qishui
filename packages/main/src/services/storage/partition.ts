// src/services/storage/partition.ts
// @ts-nocheck
import { __require, __toESM, init_nanoid, nanoid, require_multistream } from "../../../../vendor/index";
import { AsyncCell } from "../../utils/asyncCell";
import { StreamSkip, WriteTarget } from "../../utils/stream";
import { logger } from "../../utils/logger";
import { getGlobalConfig } from "../../base/globalConfig/value";

init_nanoid();
let import_node_zlib2: any = __require("node:zlib");

let import_node_stream2: any = __toESM(__require("node:stream"));

let import_node_fs7: any = __toESM(__require("node:fs"));

let import_node_path6: any = __toESM(__require("node:path"));

let import_multistream: any = __toESM(require_multistream());

class StoragePartition {
        constructor(storage, id) {
          this.storage = storage;
          this.id = id;
        }
        data = {};
        initialized;
        get filePath() {
          return import_node_path6.default.resolve(getGlobalConfig().userData, "LunaStorage", `${this.id}`);
        }
        async ready() {
          if (this.initialized) {
            return await this.initialized.get();
          } else {
            this.initialized = new AsyncCell();
            try {
              await import_node_fs7.default.promises.mkdir(import_node_path6.default.dirname(this.filePath), { recursive: true });
              const gunzip = (0, import_node_zlib2.createGunzip)();
              const target2 = new WriteTarget();
              await import_node_stream2.default.promises.pipeline(
                import_node_fs7.default.createReadStream(this.filePath),
                new StreamSkip(4),
                gunzip,
                target2
              );
              this.data = JSON.parse(target2.collect().toString());
            } catch (e) {
              if (e.code === "ENOENT") {
                logger.info("storage", (b2) => b2.text("partition").bold(this.id).text("is uninitialized"));
              } else {
                logger.error("storage", e);
              }
            }
            this.initialized.resolve();
          }
        }
        async save() {
          this.storage.saveQueue.enqueue(async () => {
            await this.saveOnce();
          });
        }
        async saveOnce() {
          const tempFile = `${this.filePath}_${nanoid()}`;
          const data = JSON.stringify(this.data);
          const gzip = (0, import_node_zlib2.createGzip)();
          await import_node_stream2.default.promises.pipeline(
            new import_multistream.default([import_node_stream2.Readable.from("LUNA"), import_node_stream2.Readable.from(data).pipe(gzip)]),
            import_node_fs7.default.createWriteStream(tempFile)
          );
          await import_node_fs7.default.promises.rename(tempFile, this.filePath);
        }
        async get(key) {
          await this.ready();
          return this.data[key] ?? null;
        }
        async set(key, value) {
          await this.ready();
          this.data[key] = value;
          await this.save();
        }
        async delete(key) {
          await this.ready();
          delete this.data[key];
          await this.save();
        }
        async flush() {
          await this.ready();
          this.data = {};
          await this.save();
        }
      }

export {
  StoragePartition
};
