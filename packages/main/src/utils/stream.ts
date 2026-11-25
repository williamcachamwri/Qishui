// src/utils/stream.ts
// @ts-nocheck
import { __require } from "../../../vendor/index";

let import_node_stream: any = __require("node:stream");

class WriteTarget extends import_node_stream.Writable {
        _chunks = [];
        _write(chunk, encoding, callback) {
          this._chunks.push(chunk);
          callback();
        }
        collect() {
          return Buffer.concat(this._chunks);
        }
      }

class StreamSkip extends import_node_stream.Transform {
        constructor(_bytes) {
          super();
          this._bytes = _bytes;
        }
        _transform(chunk, encoding, callback) {
          if (this._bytes === 0) {
            this.push(chunk);
          } else if (this._bytes > chunk.length) {
            this._bytes -= chunk.length;
          } else {
            if (this._bytes !== chunk.length) {
              this.push(chunk.slice(this._bytes));
            }
            this._bytes = 0;
          }
          callback();
        }
      }

export {
  WriteTarget,
  StreamSkip
};
