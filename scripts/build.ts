import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");

async function buildBackend(): Promise<void> {
  // 1. Compile packages/entry/src/entry.ts -> dist/entry.js
  await esbuild.build({
    entryPoints: [path.join(PROJECT_ROOT, "packages/entry/src/entry.ts")],
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    external: ["electron", "*.node"],
    outfile: path.join(DIST_DIR, "entry.js"),
    logLevel: "error"
  });

  // 2. Compile packages/main/src/index.ts -> dist/main.js
  await esbuild.build({
    entryPoints: [path.join(PROJECT_ROOT, "packages/main/src/index.ts")],
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    external: ["electron", "*.node"],
    outfile: path.join(DIST_DIR, "main.js"),
    logLevel: "error"
  });

  console.log("[build] Compiled Backend TypeScript (packages/entry & packages/main) -> dist/entry.js & dist/main.js");
}

async function buildRenderers(): Promise<void> {
  const renderersSrcRoot = path.join(PROJECT_ROOT, "packages/renderers");
  const renderersDistRoot = path.join(DIST_DIR, "renderers");
  fs.rmSync(renderersDistRoot, { recursive: true, force: true });

  const windows = fs.readdirSync(renderersSrcRoot).filter((w) =>
    fs.statSync(path.join(renderersSrcRoot, w)).isDirectory()
  );

  for (const win of windows) {
    const srcWinDir = path.join(renderersSrcRoot, win);
    const dstWinDir = path.join(renderersDistRoot, win);
    const dstAssetsDir = path.join(dstWinDir, "assets");
    fs.mkdirSync(dstAssetsDir, { recursive: true });

    // Copy HTML entry
    fs.copyFileSync(path.join(srcWinDir, `${win}.html`), path.join(dstWinDir, `${win}.html`));

    // Copy static assets (images, SVGs, WASM, MP4, JSON)
    const pubAssets = path.join(srcWinDir, "public/assets");
    if (fs.existsSync(pubAssets)) {
      for (const f of fs.readdirSync(pubAssets)) {
        fs.copyFileSync(path.join(pubAssets, f), path.join(dstAssetsDir, f));
      }
    }

    // Copy / compile all CSS stylesheets in src/styles/*.css
    const stylesDir = path.join(srcWinDir, "src/styles");
    if (fs.existsSync(stylesDir)) {
      for (const cssFile of fs.readdirSync(stylesDir)) {
        if (!cssFile.endsWith(".css")) continue;
        await esbuild.build({
          entryPoints: [path.join(stylesDir, cssFile)],
          bundle: false,
          outfile: path.join(dstAssetsDir, cssFile),
          logLevel: "error"
        });
      }
    }

    // Compile TypeScript renderer entry (with ESM splitting for `main`!)
    const entryTs = path.join(srcWinDir, "src", `${win}.ts`);
    if (win === "main") {
      await esbuild.build({
        entryPoints: [entryTs],
        bundle: true,
        splitting: true,
        format: "esm",
        platform: "browser",
        target: "es2022",
        external: ["electron", "util"],
        outdir: dstAssetsDir,
        entryNames: "[name]",
        chunkNames: "[name]-[hash]",
        logLevel: "error"
      });

      // Compile AudioWorklet processor separately as standalone module
      const workletTs = path.join(srcWinDir, "src/worklets/audioEffectProcessor.ts");
      if (fs.existsSync(workletTs)) {
        await esbuild.build({
          entryPoints: [workletTs],
          bundle: true,
          format: "esm",
          platform: "browser",
          target: "es2022",
          outfile: path.join(dstAssetsDir, "audioEffectProcessor.js"),
          logLevel: "error"
        });
      }
    } else {
      await esbuild.build({
        entryPoints: [entryTs],
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2022",
        external: ["electron", "util"],
        outfile: path.join(dstAssetsDir, `${win}.js`),
        logLevel: "error"
      });
    }
  }

  console.log(`[build] Compiled all ${windows.length} Frontend Renderers from TypeScript -> dist/renderers/`);
}

async function main(): Promise<void> {
  const t0 = performance.now();
  fs.mkdirSync(DIST_DIR, { recursive: true });
  await buildBackend();
  await buildRenderers();
  console.log(`[build] Done in ${((performance.now() - t0) / 1000).toFixed(2)}s.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
