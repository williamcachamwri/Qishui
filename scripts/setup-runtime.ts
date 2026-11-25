import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const RUNTIME_APP = path.join(PROJECT_ROOT, "runtime/QishuiRuntime.app");

if (fs.existsSync(RUNTIME_APP)) {
  console.log("[setup-runtime] runtime/QishuiRuntime.app already exists.");
  process.exit(0);
}

fs.mkdirSync(path.join(PROJECT_ROOT, "runtime"), { recursive: true });
const archivePath = path.join(PROJECT_ROOT, "runtime/QishuiRuntime-macos-arm64.zip");

console.log("[setup-runtime] Downloading QishuiRuntime-macos-arm64.zip from GitHub Release v3.7.0...");
execSync(
  `gh release download v3.7.0 --pattern "QishuiRuntime-macos-arm64.zip" --dir "${path.join(PROJECT_ROOT, "runtime")}" --clobber`,
  { cwd: PROJECT_ROOT, stdio: "inherit" }
);

console.log("[setup-runtime] Extracting QishuiRuntime.app...");
execSync(`ditto -x -k "${archivePath}" "${path.join(PROJECT_ROOT, "runtime")}"`, {
  cwd: PROJECT_ROOT,
  stdio: "inherit"
});
fs.rmSync(archivePath, { force: true });

console.log("[setup-runtime] Signing QishuiRuntime.app locally...");
execSync(`codesign --force --deep --sign - "${RUNTIME_APP}"`, {
  cwd: PROJECT_ROOT,
  stdio: "inherit"
});

console.log("[setup-runtime] Ready! Run `npm start` to launch.");
