// src/services/playerProxy/gapBuffer.ts
// @ts-nocheck

class GapBuffer {
        size;
        buffer;
        filledLength = 0;
        fillPromises;
        aborted = false;
        abortError = null;
        activeStreams = /* @__PURE__ */ new Set();
        constructor(size) {
          this.size = size;
          this.buffer = new Uint8Array(size);
          this.fillPromises = /* @__PURE__ */ new Map();
        }
        // 废弃GapBuffer并中断所有操作
        abort(message = "GapBuffer aborted") {
          this.aborted = true;
          this.abortError = new Error(message);
          for (const [key, promiseWithResolvers] of this.fillPromises) {
            promiseWithResolvers.reject(this.abortError);
          }
          this.fillPromises.clear();
          for (const controller of this.activeStreams) {
            try {
              controller.error(this.abortError);
            } catch (error) {
            }
          }
          this.activeStreams.clear();
        }
        // 检查是否已废弃
        isAborted() {
          return this.aborted;
        }
        // 获取废弃错误
        getAbortError() {
          return this.abortError;
        }
        // 写入数据到指定位置（只允许顺序写入）
        write(offset, data) {
          if (this.aborted) {
            throw this.abortError || new Error("GapBuffer aborted");
          }
          if (offset < 0 || offset + data.length > this.size) {
            throw new Error("Write out of bounds");
          }
          if (offset !== this.filledLength) {
            throw new Error(`Sequential write required. Expected offset ${this.filledLength}, got ${offset}`);
          }
          this.buffer.set(data, offset);
          this.filledLength += data.length;
          this.notifyFilledRanges();
        }
        notifyFilledRanges() {
          for (const [key, promiseWithResolvers] of this.fillPromises) {
            const [offset, length] = key.split(":").map(Number);
            if (this.isRangeFilled(offset, length)) {
              promiseWithResolvers.resolve();
              this.fillPromises.delete(key);
            }
          }
        }
        // 检查指定范围的数据是否已填充
        isRangeFilled(offset, length) {
          if (offset < 0 || length <= 0 || offset + length > this.size) {
            return false;
          }
          return offset + length <= this.filledLength;
        }
        // 获取指定范围的数据
        async getRange(offset, length) {
          if (this.aborted) {
            throw this.abortError || new Error("GapBuffer aborted");
          }
          if (offset < 0 || offset + length > this.size || length <= 0) {
            throw new Error("Invalid range");
          }
          if (!this.isRangeFilled(offset, length)) {
            const key = `${offset}:${length}`;
            let promiseWithResolvers = this.fillPromises.get(key);
            if (!promiseWithResolvers) {
              promiseWithResolvers = Promise.withResolvers();
              this.fillPromises.set(key, promiseWithResolvers);
            }
            await promiseWithResolvers.promise;
          }
          return this.getFilledRange(offset, length);
        }
        getFilledRange(offset, length) {
          return this.buffer.slice(offset, offset + length);
        }
        // 获取当前已填充数据的总大小
        getFilledSize() {
          return this.filledLength;
        }
        // 获取总大小
        getSize() {
          return this.size;
        }
        // 获取当前活跃的读取流数量
        getActiveStreamCount() {
          return this.activeStreams.size;
        }
        // 检查整个 buffer 是否已完全填充
        isFullyFilled() {
          return this.filledLength === this.size;
        }
        // 获取所有已填充的数据，如果数据不完整则返回 null
        getFullData() {
          if (this.aborted) {
            throw this.abortError || new Error("GapBuffer aborted");
          }
          if (!this.isFullyFilled()) {
            return null;
          }
          return this.buffer.slice();
        }
        // 获取指定范围的已填充数据，如果指定范围数据不完整则返回 null
        getPartialData(offset, length) {
          if (this.aborted) {
            throw this.abortError || new Error("GapBuffer aborted");
          }
          if (offset < 0 || offset + length > this.size || length <= 0) {
            throw new Error("Invalid range");
          }
          if (!this.isRangeFilled(offset, length)) {
            return null;
          }
          return this.getFilledRange(offset, length);
        }
        // 获取一个 ReadableStream 用于流式读取数据
        getReader(offset, length) {
          if (this.aborted) {
            throw this.abortError || new Error("GapBuffer aborted");
          }
          let startOffset = offset ?? 0;
          let endOffset = length !== void 0 ? startOffset + length : this.size;
          if (startOffset < 0 || this.size > 0 && startOffset >= this.size) {
            throw new Error("Invalid offset");
          }
          if (endOffset > this.size) {
            throw new Error("Invalid length");
          }
          let currentOffset = startOffset;
          const chunkSize = Math.min(32 * 1024, endOffset - startOffset);
          const self2 = this;
          let controller = null;
          return new ReadableStream({
            start: (ctrl) => {
              controller = ctrl;
              self2.activeStreams.add(controller);
              if (startOffset >= endOffset) {
                controller.close();
                self2.activeStreams.delete(controller);
                return;
              }
              if (self2.aborted) {
                controller.error(self2.abortError || new Error("GapBuffer aborted"));
                self2.activeStreams.delete(controller);
              }
            },
            pull: async (ctrl) => {
              if (self2.aborted) {
                ctrl.error(self2.abortError || new Error("GapBuffer aborted"));
                if (controller) {
                  self2.activeStreams.delete(controller);
                }
                return;
              }
              if (currentOffset >= endOffset) {
                ctrl.close();
                if (controller) {
                  self2.activeStreams.delete(controller);
                }
                return;
              }
              const remainingSize = endOffset - currentOffset;
              const readSize = Math.min(chunkSize, remainingSize);
              try {
                const data = await self2.getRange(currentOffset, readSize);
                currentOffset += readSize;
                ctrl.enqueue(data);
              } catch (error) {
                ctrl.error(error);
                if (controller) {
                  self2.activeStreams.delete(controller);
                }
              }
            },
            cancel: (reason) => {
              if (controller) {
                self2.activeStreams.delete(controller);
                controller = null;
              }
            }
          });
        }
      }

export {
  GapBuffer
};
