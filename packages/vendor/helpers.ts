// @ts-nocheck
const __create = Object.create;
const __defProp = Object.defineProperty;
const __getOwnPropDesc = Object.getOwnPropertyDescriptor;
const __getOwnPropNames = Object.getOwnPropertyNames;
const __getProtoOf = Object.getPrototypeOf;
const __hasOwnProp = Object.prototype.hasOwnProperty;

export const __require: NodeRequire = ((x: any) =>
  typeof require !== "undefined"
    ? require
    : typeof Proxy !== "undefined"
      ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] })
      : x)(function (this: any, x: string) {
  if (typeof require !== "undefined") return require.apply(this, arguments as any);
  throw new Error('Dynamic require of "' + x + '" is not supported');
}) as any;

export const __esm = (fn: any, res?: any) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };

export const __commonJS = (cb: any, mod?: any) =>
  function __require2() {
    return (
      mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };

export const __export = (target: any, all: Record<string, () => any>) => {
  for (const name in all) __defProp(target, name, { get: all[name], enumerable: true });
};

export const __copyProps = (to: any, from: any, except?: string, desc?: PropertyDescriptor) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};

export const __reExport = (target: any, mod: any, secondTarget?: any) => (
  __copyProps(target, mod, "default"),
  secondTarget && __copyProps(secondTarget, mod, "default")
);

export const __toESM = (mod: any, isNodeMode?: number, target?: any) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
