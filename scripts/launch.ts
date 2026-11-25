import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const runtimeExecutable = path.join(
  PROJECT_ROOT,
  "runtime/QishuiRuntime.app/Contents/MacOS/汽水音乐"
);
const nativeDir = path.join(PROJECT_ROOT, "native", process.arch);
const frameworksDir = path.join(
  PROJECT_ROOT,
  "runtime/QishuiRuntime.app/Contents/Frameworks"
);

const env: NodeJS.ProcessEnv = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

if (process.platform === "darwin") {
  env.DYLD_LIBRARY_PATH = [nativeDir, frameworksDir, env.DYLD_LIBRARY_PATH]
    .filter(Boolean)
    .join(":");
}

const extraArgs = process.argv.slice(2);
const child = spawn(runtimeExecutable, extraArgs, {
  cwd: PROJECT_ROOT,
  env,
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
