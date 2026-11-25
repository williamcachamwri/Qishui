// src/services/initializer.ts
// @ts-nocheck
import { logger } from "../utils/logger";

class ServiceInitializer {
        constructor(options) {
          this.options = options;
        }
        serviceCtors = /* @__PURE__ */ new Map();
        protocolCtors = /* @__PURE__ */ new Map();
        instances = /* @__PURE__ */ new Map();
        instnacePWRs = /* @__PURE__ */ new Map();
        protocols = /* @__PURE__ */ new Map();
        transport;
        async initialize() {
          this.transport = this.options.transport(this);
          this.transport.notifyWorkerStartup();
          await this.options.initialize?.(this);
        }
        async register(id, moduleLoader) {
          const mod = await moduleLoader;
          const serviceKey = Object.keys(mod).find((k2) => k2.endsWith("Service")) ?? "";
          const protocolKey = Object.keys(mod).find((k2) => k2.endsWith("Protocol")) ?? "";
          const service = mod[serviceKey];
          const protocol4 = mod[protocolKey];
          if (!service) {
            throw new Error(`not service defined in register service file: ${id}`);
          }
          if (!protocol4) {
            throw new Error(`not protocol defined in register service file: ${id}`);
          }
          this.serviceCtors.set(id, service);
          this.protocolCtors.set(id, protocol4);
          await this.transport.notifyServiceReady(id);
          this.initializeWithMetrics(id);
        }
        getService(id) {
          if (!this.serviceCtors.has(id)) {
            throw new Error(
              `service "${id}" is not belongs to this worker (with services: ${[...this.serviceCtors.keys()].join(",")}), use "getServiceProtocol" instead`
            );
          }
          let instance = this.instances.get(id);
          if (!instance) {
            const Ctor = this.serviceCtors.get(id);
            if (!Ctor) {
              throw new Error("service is not registered");
            }
            instance = new Ctor();
            this.instances.set(id, instance);
            if (!this.instnacePWRs.has(id)) {
              this.instnacePWRs.set(id, Promise.withResolvers());
            }
            this.instnacePWRs.get(id).resolve(instance);
          }
          return instance;
        }
        async getServiceWhenReady(id) {
          if (!this.instnacePWRs.has(id)) {
            this.instnacePWRs.set(id, Promise.withResolvers());
          }
          return await this.instnacePWRs.get(id).promise;
        }
        getServiceProtocol(id) {
          if (!this.serviceCtors.get(id)) {
            if (!this.transport) {
              throw new Error("transport is uninitialized");
            }
            return this.transport.getProxy(id);
          } else {
            let protocol4 = this.protocols.get(id);
            if (!protocol4) {
              const Ctor = this.protocolCtors.get(id);
              if (!Ctor) {
                throw new Error("service protocol is not registered");
              }
              const service = this.getService(id);
              if (!service) {
                throw new Error(
                  "service instance not found when create service protocol"
                );
              }
              protocol4 = new Ctor(service);
              this.protocols.set(id, protocol4);
            }
            return protocol4;
          }
        }
        async initializeWithMetrics(id) {
          const service = this.getService(id);
          const start = performance.now();
          logger.info("service_init", (b2) => b2.bold(id).text("start init..."));
          try {
            await service.initialize();
          } catch (e) {
            logger.error("service_init", e);
          }
          logger.info("service_init", (b2) => b2.bold(id).text("init cost").time(performance.now() - start));
        }
      }

export {
  ServiceInitializer
};
