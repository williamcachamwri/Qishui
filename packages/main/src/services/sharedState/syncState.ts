// src/services/sharedState/syncState.ts
// @ts-nocheck
import { protocolOf } from "../index";
import { AsyncCell } from "../../utils/asyncCell";
import "../serviceId";
import { initialSharedState } from "./initialState";

class SyncState {
        constructor(key) {
          this.key = key;
          this.value = initialSharedState[key];
          let initialized = false;
          protocolOf("sharedState" /* sharedState */).onUpdate(key, (v2, old) => {
            const oldValue = initialized ? old : void 0;
            initialized = true;
            this.value = v2;
            this.callbacks.forEach((cb) => cb(v2, oldValue));
          }, true).then(() => {
            this.readyCell.resolve();
          });
        }
        callbacks = /* @__PURE__ */ new Set();
        readyCell = new AsyncCell();
        value;
        async ready() {
          await this.readyCell.get();
        }
        onUpdate(callback) {
          this.callbacks.add(callback);
          return () => {
            this.callbacks.delete(callback);
          };
        }
      }

export {
  SyncState
};
