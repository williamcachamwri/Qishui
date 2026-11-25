// src/services/index.ts
// @ts-nocheck
import { serviceInitializer } from "./singleton";

function protocolOf(id) {
    return serviceInitializer.getServiceProtocol(id);
  }

function serviceOf(id) {
    return serviceInitializer.getService(id);
  }

function serviceWhenReadyOf(id) {
    return serviceInitializer.getServiceWhenReady(id);
  }

export {
  protocolOf,
  serviceOf,
  serviceWhenReadyOf
};
