// src/base/globalConfig/value.ts
// @ts-nocheck

function getGlobalConfig() {
    if (!globalConfig.value) {
      throw new Error("global config is unset");
    }
    return globalConfig.value;
  }

function setGlobalConfig(config) {
    globalConfig.value = config;
  }

let globalConfig: any = {
        value: null
      };

export {
  getGlobalConfig,
  setGlobalConfig
};
