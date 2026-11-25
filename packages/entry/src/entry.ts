// src/entry.ts
import path from "node:path";
import fs from "node:fs";
import electron from "electron";
import { __toESM, __require, require_semver } from "../../vendor/index";
import { slardarBase } from "./utils/slardar/background";

const semver = __toESM(require_semver()).default;

declare global {
  var shellVersion: string;
  var isSmallPackage: boolean;
}

globalThis.shellVersion = "3.7.0";
globalThis.isSmallPackage = false;

try {
  if ((process as any).mas) {
    throw new Error("MAS 环境禁用小包更新");
  }
  const packagesDir = path.resolve(electron.app.getPath("userData"), "Packages");
  const configPath = path.resolve(packagesDir, "config.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("No OTA small package present, booting local main.js");
  }
  const configJson = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const targetPackagePath = path.resolve(packagesDir, configJson.latestVersion);
  const manifest = JSON.parse(fs.readFileSync(path.resolve(targetPackagePath, "manifest.json"), "utf-8"));
  if (manifest.version !== configJson.latestVersion) {
    throw new Error("版本异常不匹配");
  }
  if (!semver.gte("3.7.0", manifest.shellMinVersion)) {
    throw new Error("不满足最低 Shell 要求");
  }
  if (semver.gte("3.7.0", manifest.version)) {
    throw new Error("Shell 版本比 Package 版本相同或更高");
  }
  globalThis.isSmallPackage = true;
  slardarBase.config({ release: manifest.version });
  __require(path.resolve(targetPackagePath, "app.asar/main.js"));
} catch {
  try {
    __require(path.resolve(__dirname, "main.js"));
  } catch (fatalErr) {
    console.error(fatalErr);
    electron.app.whenReady().then(() => {
      const result = electron.dialog.showMessageBoxSync({
        title: "启动失败",
        message: "汽水音乐启动失败，可能是由于程序文件发生了损坏。",
        defaultId: 0,
        buttons: ["官网下载", "退出"]
      });
      if (result === 0) {
        electron.shell.openExternal("https://www.qishui.com/");
      } else {
        electron.app.exit();
      }
    });
  }
}
