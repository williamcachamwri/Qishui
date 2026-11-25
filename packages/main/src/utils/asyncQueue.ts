// src/utils/asyncQueue.ts
// @ts-nocheck
import { AsyncCell } from "./asyncCell";
import { logger } from "./logger";

class AsyncQueue {
        constructor(_options) {
          this._options = _options;
          this._capacity = _options.capacity ?? 5;
          this._pushBackAfterError = _options.pushBackAfterError ?? false;
        }
        _runningTask = /* @__PURE__ */ new Set();
        _tasks = [];
        _allDoneSingal = new AsyncCell();
        _capacity;
        _pushBackAfterError;
        enqueue(spawner) {
          this._tasks.push(spawner);
          this._awake();
        }
        async _awake() {
          if (this._runningTask.size >= this._capacity) {
            return;
          }
          const nextTask = this._tasks.shift();
          if (!nextTask) {
            return;
          }
          this._runningTask.add(nextTask);
          nextTask().then(() => {
            this._runningTask.delete(nextTask);
            this._awake();
            if (this._tasks.length === 0 && this._runningTask.size === 0) {
              this._allDoneSingal.resolve();
            }
          }).catch((e) => {
            logger.error("async_queue", e.message);
            this._runningTask.delete(nextTask);
            if (this._pushBackAfterError) {
              this._tasks.push(nextTask);
            }
            this._awake();
          });
          this._awake();
        }
        async waitAll() {
          await this._allDoneSingal.get();
          this._allDoneSingal = new AsyncCell();
        }
      }

export {
  AsyncQueue
};
