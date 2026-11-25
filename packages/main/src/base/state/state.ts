// src/base/state/state.ts
// @ts-nocheck
import { fn, init_immer_esm } from "../../../../vendor/index";

init_immer_esm();
class State {
        constructor(value) {
          this.value = value;
          this.previousValue = value;
        }
        callbacks = /* @__PURE__ */ new Set();
        batchedCallbacks = /* @__PURE__ */ new Set();
        previousValue;
        update(updater) {
          const newValue = fn(this.value, (draft) => {
            return updater(draft);
          });
          const oldValue = this.value;
          if (oldValue !== newValue) {
            this.value = newValue;
            this.callbacks.forEach((cb) => cb(this.value, oldValue));
          }
          queueMicrotask(() => {
            if (this.previousValue !== this.value) {
              this.batchedCallbacks.forEach((cb) => {
                cb(this.value, this.previousValue);
              });
              this.previousValue = this.value;
            }
          });
        }
        onUpdate(callback, immediate) {
          if (immediate) {
            callback(this.value, this.previousValue);
          }
          this.callbacks.add(callback);
          return () => {
            this.callbacks.delete(callback);
          };
        }
        onUpdateBatched(callback, immediate) {
          if (immediate) {
            callback(this.value, this.previousValue);
          }
          this.batchedCallbacks.add(callback);
          return () => {
            this.batchedCallbacks.delete(callback);
          };
        }
      }

export {
  State
};
