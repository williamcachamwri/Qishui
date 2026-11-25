// src/renderer/compositions/sharedState.ts
// @ts-nocheck
import { init_vue, vue_exports } from "../../../../vendor/index";
import "../../services/index";
import "../../services/serviceId";
import "../../services/sharedState/initialState";

init_vue();
let stateMap: any = (0, vue_exports.reactive)(/* @__PURE__ */ new Map());

