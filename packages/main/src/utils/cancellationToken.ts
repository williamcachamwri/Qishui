// src/utils/cancellationToken.ts
// @ts-nocheck

class CancellationError extends Error {
        constructor(message = "Operation was canceled.") {
          super(message);
          this.name = "CancellationError";
        }
      }

class CancellationTokenSource {
        _isCancelled = false;
        _rejectPromise;
        _token;
        cancellationPromise;
        constructor() {
          this.cancellationPromise = new Promise((_6, reject) => {
            this._rejectPromise = reject;
          });
          this.cancellationPromise.catch(() => {
          });
          this._token = new CancellationToken(this);
        }
        /**
         * 获取与此 Source 关联的 CancellationToken
         */
        get token() {
          return this._token;
        }
        /**
         * 获取一个值，该值指示是否已请求取消
         */
        get isCancellationRequested() {
          return this._isCancelled;
        }
        /**
         * 发出取消请求
         * 此方法可以被多次调用，但只有第一次调用会生效
         */
        cancel() {
          if (this._isCancelled) {
            return;
          }
          this._isCancelled = true;
          this._rejectPromise(new CancellationError());
        }
      }

class CancellationToken {
        source;
        constructor(source) {
          this.source = source;
        }
        /**
         * 获取一个值，该值指示是否已请求取消
         */
        get isCancellationRequested() {
          return this.source.isCancellationRequested;
        }
        /**
         * 一个 Promise，当 token 被取消时，它会立即变为 rejected 状态
         */
        get cancellationPromise() {
          return this.source.cancellationPromise;
        }
        /**
         * 如果已请求取消，则抛出 CancellationError
         * 这是在代码的关键检查点强制中断操作的便捷方法
         */
        throwIfCancellationRequested() {
          if (this.isCancellationRequested) {
            throw new CancellationError();
          }
        }
      }

export {
  CancellationTokenSource,
  CancellationError
};
