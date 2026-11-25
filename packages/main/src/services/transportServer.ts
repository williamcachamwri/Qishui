// src/services/transportServer.ts
// @ts-nocheck
import { __require } from "../../../vendor/index";
import { AsyncCell } from "../utils/asyncCell";
import { logger } from "../utils/logger";
import "./workerId";
import { ServiceId } from "./serviceId";

let import_electron11: any = __require("electron");

let COMMON_WORKERS: any = [
        "main" /* main */
      ];

let RENDERER_WORKERS: any = [
        "rendererMain" /* rendererMain */,
        "rendererLyrics" /* rendererLyrics */,
        "rendererUpdate" /* rendererUpdate */,
        "rendererFeedback" /* rendererFeedback */,
        "rendererTaskbarWidget" /* rendererTaskbarWidget */,
        "rendererTaskbarWidgetShadow" /* rendererTaskbarWidgetShadow */
      ];

class TransportServer {
        constructor(transport) {
          this.transport = transport;
          for (const workerId of [...COMMON_WORKERS, ...RENDERER_WORKERS]) {
            this.readySignals.set(workerId, new AsyncCell());
          }
          for (const workerId of RENDERER_WORKERS) {
            this.handleRendererMessage(workerId);
          }
        }
        rendererPorts = /* @__PURE__ */ new Map();
        readySignals = /* @__PURE__ */ new Map();
        serviceIdToWorkerId = Object.fromEntries(Object.values(ServiceId).map((id) => [id, new AsyncCell()]));
        handleRendererMessage(workerId) {
          import_electron11.ipcMain.on(`${workerId}.port`, (e) => {
            const port = e.ports[0];
            port.on("message", (e2) => {
              const message = e2.data;
              this.handleMessage(message);
            });
            port.start();
            this.rendererPorts.set(workerId, port);
          });
        }
        async sendMessageToWorker(id, message) {
          const readySignal = this.readySignals.get(id);
          if (!readySignal) {
            throw new Error("ready signal not initialized");
          }
          await readySignal.get();
          switch (id) {
            case "main" /* main */: {
              this.transport.receive(message);
              break;
            }
            default: {
              if (RENDERER_WORKERS.includes(id)) {
                this.rendererPorts.get(id)?.postMessage(message);
              } else {
              }
              break;
            }
          }
        }
        async handleMessage(message) {
          switch (message.type) {
            case "method.invoke": {
              const workerId = await this.serviceIdToWorkerId[message.toServiceId].get();
              this.sendMessageToWorker(workerId, message);
              break;
            }
            case "method.return": {
              this.sendMessageToWorker(message.toWorkerId, message);
              break;
            }
            case "method.callback": {
              this.sendMessageToWorker(message.toWorkerId, message);
              break;
            }
            case "worker.startup": {
              logger.info(
                "worker_startup",
                (b2) => b2.bold(message.workerId).text("is now available")
              );
              const readySignal = this.readySignals.get(message.workerId);
              if (!readySignal) {
                throw new Error("ready siangl not initialized");
              }
              readySignal.resolve();
              break;
            }
            case "worker.serviceAvailable": {
              logger.info(
                "worker_startup",
                (b2) => b2.bold(message.workerId).text("service available:").bold(message.serviceId)
              );
              this.serviceIdToWorkerId[message.serviceId].resolve(message.workerId);
              break;
            }
          }
        }
      }

export {
  TransportServer
};
