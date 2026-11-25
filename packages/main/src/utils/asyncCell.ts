// src/utils/asyncCell.ts
// @ts-nocheck

let AsyncCell: any = class _AsyncCell {
        _promise;
        _resolve;
        _reject;
        _isDone;
        _isError;
        _error;
        _value;
        constructor(promise) {
          this._isDone = false;
          this._isError = false;
          this._promise = promise ?? new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
          });
        }
        static createPending() {
          return new _AsyncCell();
        }
        static createDone(value) {
          const instance = new _AsyncCell();
          instance.resolve(value);
          return instance;
        }
        static createAsync(task) {
          return new _AsyncCell(task());
        }
        resolve(data) {
          if (this._isError) {
            throw new Error("cannot resolve a error promise");
          }
          this._value = data;
          this._isDone = true;
          this._resolve(data);
        }
        reject(error) {
          if (this._isDone) {
            throw new Error("cannot reject a resolved promise");
          }
          this._error = error;
          this._isError = true;
          this._reject(error);
        }
        async get() {
          await this._promise;
          return this._value;
        }
        tryGet() {
          if (this._isDone) {
            return {
              done: true,
              value: this._value
            };
          } else if (this._isError) {
            throw this._error;
          } else {
            return {
              done: false,
              value: void 0
            };
          }
        }
        isDone() {
          return this._isDone;
        }
        isError() {
          return this._isError;
        }
      };

export {
  AsyncCell
};
