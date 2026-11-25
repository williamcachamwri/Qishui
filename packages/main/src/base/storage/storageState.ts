// src/base/storage/storageState.ts
// @ts-nocheck
import { protocolOf } from "../../services/index";
import "../../services/serviceId";
import { AsyncCell } from "../../utils/asyncCell";

class StorageState {
        constructor(partition, key, defaultValue) {
          this.partition = partition;
          this.key = key;
          this.defaultValue = defaultValue;
          this.initialize();
        }
        signalCell = new AsyncCell();
        value = null;
        async initialize() {
          const data = await protocolOf("storage" /* storage */).get(this.partition, this.key);
          if (data) {
            this.value = data;
          } else {
            this.value = this.defaultValue;
          }
          this.signalCell.resolve();
        }
        set(value) {
          this.value = value;
          protocolOf("storage" /* storage */).set(this.partition, this.key, value);
        }
        get() {
          return this.value ?? this.defaultValue;
        }
        async getWhenReady() {
          await this.whenReady();
          return this.value;
        }
        async whenReady() {
          await this.signalCell.get();
        }
      }

export {
  StorageState
};
