// src/handleSquirrel.ts
// @ts-nocheck
import { __require, require_electron_squirrel_startup } from "../../vendor/index";

let import_electron4: any = __require("electron");

let _isSquirrelRequestExit: any = false;

if (require_electron_squirrel_startup()) {
        _isSquirrelRequestExit = true;
        import_electron4.app.quit();
      }

let isSquirrelRequestExit: any = () => _isSquirrelRequestExit;

export {
  isSquirrelRequestExit
};
