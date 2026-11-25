// src/index.ts
// @ts-nocheck
import { __require, __toESM, require_ZiNdaD0kA0c4AexQAhIH9 } from "../../vendor/index";
import "./utils/launched";
import "./utils/ttnet";

import "./utils/slardar/background";
async function main() {
    const { beforeReady: beforeReady2 } = await import("./beforeReady");
    beforeReady2();
    await import_electron36.app.whenReady();
    const { afterReadyMinimal: afterReadyMinimal2 } = await import("./afterReadyMinimal");
    afterReadyMinimal2();
    const { afterReady: afterReady2 } = await import("./afterReady");
    await afterReady2();
  }

var import_register2 = __toESM(require_ZiNdaD0kA0c4AexQAhIH9());

var import_electron36 = __require("electron");

main();

