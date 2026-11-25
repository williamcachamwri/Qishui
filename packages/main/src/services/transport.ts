// src/services/transport.ts
// @ts-nocheck
import { init_nanoid, nanoid } from "../../../vendor/index";
import { AsyncCell } from "../utils/asyncCell";

init_nanoid();
class ServiceTransport {
        constructor(initializer) {
          this.initializer = initializer;
          this.handleReceive();
        }
        proxies = /* @__PURE__ */ new Map();
        requests = /* @__PURE__ */ new Map();
        callbacks = /* @__PURE__ */ new Map();
        async notifyWorkerStartup() {
          await this.send({
            type: "worker.startup",
            workerId: this.currentWorker
          });
        }
        async notifyServiceReady(serviceId) {
          await this.send({
            type: "worker.serviceAvailable",
            workerId: this.currentWorker,
            serviceId
          });
        }
        receive(data) {
          this.handleReceivedMessage(data);
        }
        getProxy(id) {
          let proxy = this.proxies.get(id);
          if (!proxy) {
            proxy = new Proxy(
              {},
              {
                get: (target2, key) => {
                  if (typeof key !== "string") {
                    throw new TypeError(
                      `service protocol method name(${String(key)}) must be a string`
                    );
                  }
                  return async (...args) => {
                    const requestId = nanoid();
                    const signal = new AsyncCell();
                    this.requests.set(requestId, signal);
                    const callbacks = {};
                    for (const [argIndex, arg] of args.entries()) {
                      if (arg instanceof Function) {
                        const callbackId = nanoid();
                        this.callbacks.set(callbackId, args[argIndex]);
                        args[argIndex] = null;
                        callbacks[argIndex] = callbackId;
                      }
                    }
                    await this.send({
                      type: "method.invoke",
                      fromWorkerId: this.currentWorker,
                      toServiceId: id,
                      methodName: key,
                      requestId,
                      arguments: args,
                      callbacks
                    });
                    const message = await signal.get();
                    if (message.type !== "method.return") {
                      throw new Error(
                        "internal error: request proxy receive an invoke message as result"
                      );
                    }
                    if (message.return.type === "error") {
                      throw new Error(message.return.error);
                    }
                    return message.return.result;
                  };
                }
              }
            );
            this.proxies.set(id, proxy);
          }
          return proxy;
        }
        async handleReceivedMessage(message) {
          switch (message.type) {
            case "method.invoke": {
              const args = [...message.arguments];
              for (const [indexStr, callbackId] of Object.entries(
                message.callbacks
              )) {
                const index = Number.parseInt(indexStr);
                args[index] = async (...callbackArgs) => {
                  await this.send({
                    type: "method.callback",
                    fromWorkerId: this.currentWorker,
                    toWorkerId: message.fromWorkerId,
                    serviceId: message.toServiceId,
                    callbackId,
                    arguments: callbackArgs
                  });
                };
              }
              const protocol4 = this.initializer.getServiceProtocol(
                message.toServiceId
              );
              try {
                const result = await protocol4[message.methodName](...args);
                await this.send({
                  type: "method.return",
                  fromServiceId: message.toServiceId,
                  toWorkerId: message.fromWorkerId,
                  methodName: message.methodName,
                  requestId: message.requestId,
                  return: {
                    type: "success",
                    result
                  }
                });
              } catch (e) {
                console.error(e);
                await this.send({
                  type: "method.return",
                  fromServiceId: message.toServiceId,
                  toWorkerId: message.fromWorkerId,
                  methodName: message.methodName,
                  requestId: message.requestId,
                  return: {
                    type: "error",
                    error: e instanceof Error ? e.message : String(e)
                  }
                });
              }
              break;
            }
            case "method.return": {
              const signal = this.requests.get(message.requestId);
              if (!signal) {
                console.warn(
                  new Error(
                    `request(id:${message.requestId}) is not belongs to this worker`
                  )
                );
                return;
              }
              signal.resolve(message);
              this.requests.delete(message.requestId);
              break;
            }
            case "method.callback": {
              const callback = this.callbacks.get(message.callbackId);
              if (!callback) {
                return;
              }
              callback(...message.arguments);
              break;
            }
          }
        }
      }

export {
  ServiceTransport
};
