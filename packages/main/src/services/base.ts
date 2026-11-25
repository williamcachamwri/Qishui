// src/services/base.ts
// @ts-nocheck

class Service {
        async initialize() {
        }
      }

class ServiceProtocol {
        constructor(service) {
          this.service = service;
        }
      }

export {
  Service,
  ServiceProtocol
};
