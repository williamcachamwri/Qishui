// src/services/transportMainProcess.ts
// @ts-nocheck
import { ServiceTransport } from "./transport";
import { TransportServer } from "./transportServer";
import "./workerId";

class MainProcessServiceTransport extends ServiceTransport {
        currentWorker = "main" /* main */;
        transportServer = new TransportServer(this);
        async handleReceive() {
        }
        async send(data) {
          this.transportServer.handleMessage(data);
        }
      }

export {
  MainProcessServiceTransport
};
