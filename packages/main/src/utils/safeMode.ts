// src/utils/safeMode.ts
// @ts-nocheck
import { __require, __toESM } from "../../../vendor/index";

function cleanDirectorySync(dirPath) {
    try {
      if (!import_fs.default.existsSync(dirPath)) {
        return;
      }
      const items = import_fs.default.readdirSync(dirPath);
      for (const item of items) {
        const itemPath = import_path.default.resolve(dirPath, item);
        try {
          const stat = import_fs.default.statSync(itemPath);
          if (stat.isDirectory()) {
            cleanDirectorySync(itemPath);
            try {
              import_fs.default.rmdirSync(itemPath);
            } catch (error) {
              console.warn(`\u65E0\u6CD5\u5220\u9664\u6587\u4EF6\u5939: ${itemPath}`, error);
            }
          } else {
            try {
              import_fs.default.unlinkSync(itemPath);
            } catch (error) {
              console.warn(`\u65E0\u6CD5\u5220\u9664\u6587\u4EF6: ${itemPath}`, error);
            }
          }
        } catch (error) {
          console.warn(`\u65E0\u6CD5\u8BBF\u95EE: ${itemPath}`, error);
          continue;
        }
      }
    } catch (error) {
      console.error(`\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\u5939: ${dirPath}`, error);
    }
  }

function getProcessPids(processName) {
    try {
      const isWindows = process.platform === "win32";
      let output;
      if (isWindows) {
        const command = `tasklist /FI "IMAGENAME eq ${processName}" /FO CSV /NH`;
        output = (0, import_child_process.execSync)(command, { encoding: "utf-8" });
        const pids = [];
        const lines = output.trim().split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;
          const columns = line.split('","');
          if (columns.length >= 2) {
            const pidStr = columns[1].replace(/"/g, "").trim();
            const pid = parseInt(pidStr, 10);
            if (!isNaN(pid)) {
              pids.push(pid);
            }
          }
        }
        return pids;
      } else {
        try {
          output = (0, import_child_process.execSync)(`pgrep -f "${processName}"`, { encoding: "utf-8" });
          return output.trim().split("\n").filter((line) => line.length > 0).map((pid) => parseInt(pid, 10));
        } catch (error) {
          return [];
        }
      }
    } catch (error) {
      console.error(`\u83B7\u53D6\u8FDB\u7A0B PID \u5931\u8D25: ${processName}`, error);
      return [];
    }
  }

function killProcess(pid) {
    try {
      const isWindows = process.platform === "win32";
      if (isWindows) {
        (0, import_child_process.execSync)(`taskkill /PID ${pid} /F`, { encoding: "utf-8" });
      } else {
        (0, import_child_process.execSync)(`kill -9 ${pid}`, { encoding: "utf-8" });
      }
      console.log(`\u6210\u529F\u7ED3\u675F\u8FDB\u7A0B: ${pid}`);
      return true;
    } catch (error) {
      console.error(`\u7ED3\u675F\u8FDB\u7A0B\u5931\u8D25: ${pid}`, error);
      return false;
    }
  }

function checkSafeMode() {
    if (false) return;
    try {
      import_fs.default.mkdirSync(LAUNCH_RECORD_PATH, { recursive: true });
      const records = import_fs.default.readdirSync(LAUNCH_RECORD_PATH);
      const launchCount = records.filter((t2) => Number(t2) > EARLIEST_LAUNCH_RECORD).length;
      console.log(launchCount);
      if (launchCount >= 4) {
        const result = import_electron7.dialog.showMessageBoxSync(null, {
          title: "\u5F02\u5E38\u8BCA\u65AD",
          message: "\u68C0\u6D4B\u5230\u60A8\u591A\u6B21\u5C1D\u8BD5\u542F\u52A8\u6C7D\u6C34\u97F3\u4E50\uFF0C\u5982\u679C\u60A8\u9047\u5230\u4F7F\u7528\u6545\u969C\uFF0C\u53EF\u4EE5\u5C1D\u8BD5\u4F7F\u7528\u5B89\u5168\u6A21\u5F0F\uFF0C\u60A8\u5C06\u9700\u8981\u91CD\u65B0\u767B\u5F55\u8D26\u53F7\u3002",
          buttons: ["\u8FDB\u5165\u5B89\u5168\u6A21\u5F0F", "\u5FFD\u7565"],
          defaultId: 0
        });
        for (const record of records) {
          import_fs.default.unlinkSync(import_path.default.resolve(LAUNCH_RECORD_PATH, record));
        }
        if (result === 0) {
          const pids = process.platform === "win32" ? getProcessPids("SodaMusic.exe") : getProcessPids("SodaMusic");
          pids.filter((t2) => t2 !== process.pid).forEach((pid) => killProcess(pid));
          cleanDirectorySync(import_path.default.resolve(import_electron7.app.getPath("userData")));
          import_electron7.app.relaunch();
          import_electron7.app.exit();
        }
      }
      if (records.length > 10) {
        (async () => {
          await Promise.all(records.map((t2) => import_fs.default.promises.unlink(import_path.default.resolve(LAUNCH_RECORD_PATH, t2))));
        })();
      }
      import_fs.default.writeFileSync(import_path.default.resolve(LAUNCH_RECORD_PATH, String(CURRENT_LAUNCH_RECORD)), "");
    } catch (error) {
      console.error(error);
    }
  }

let import_electron7: any = __require("electron");

let import_fs: any = __toESM(__require("fs"));

let import_path: any = __toESM(__require("path"));

let import_child_process: any = __require("child_process");

let TEMP_PATH: any = import_electron7.app.getPath("temp");

let LAUNCH_RECORD_PATH: any = import_path.default.resolve(TEMP_PATH, "SodaMusic_Launch_Records");

let CURRENT_LAUNCH_RECORD: any = Date.now();

let EARLIEST_LAUNCH_RECORD: any = Date.now() - 10 * 60 * 1e3;

console.log("LAUNCH_RECORD_PATH", LAUNCH_RECORD_PATH, import_electron7.app.getAppMetrics());

export {
  checkSafeMode
};
