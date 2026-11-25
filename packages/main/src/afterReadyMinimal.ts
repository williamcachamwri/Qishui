// src/afterReadyMinimal.ts
// @ts-nocheck
import { checkSafeMode } from "./utils/safeMode";

function afterReadyMinimal() {
    checkSafeMode();
  }

export {
  afterReadyMinimal
};
