# 汽水音乐 (Qishui Music v3.7.0) — 100% TypeScript 逆向重构工程

本项目为 **汽水音乐 macOS 客户端 (`v3.7.0`, `arm64`)** 的完整 **100% TypeScript (`.ts`)** 逆向还原与模块化重构仓库，涵盖 **主进程 (`main`)**、**引导进程 (`entry`)**、**原生模块封装 (`addons`)** 以及 **全部 8 个前端渲染窗口 (`renderers`)**，并内置完整的原生动态库与独立运行时（完全脱离 `/Applications` 外部依赖）。

## 快速开始

```bash
# 1. 克隆仓库并安装依赖
git clone https://github.com/williamcachamwri/Qishui.git
cd Qishui
npm install

# 2. 首次克隆时自动从 GitHub Release (v3.7.0) 下载并签名独立运行时 QishuiRuntime.app
npm run setup-runtime

# 3. 编译全部 TypeScript 源码至 dist/ 并启动客户端
npm start

# 4. 开发调试模式（自动开启 DevTools 快捷键 Cmd + Option + I）
npm run dev

# 5. 仅执行编译 / TypeScript 类型检查
npm run build
npm run typecheck
```

## 目录架构

```text
Qishui/
├── package.json                     # 项目脚本配置 (tsx + esbuild + tsc)
├── tsconfig.json                    # TypeScript 编译与路径别名配置
├── types/
│   └── electron-bytedance.d.ts      # 字节定制 Electron API 与 TTCommon 类型声明
├── scripts/
│   ├── setup-runtime.ts             # 自动拉取、解压并本地签名 QishuiRuntime.app
│   ├── build.ts                     # 编译 entry、main 及全部 8 个前端渲染窗口 (.ts -> dist/)
│   └── launch.ts                    # 注入项目内 DYLD_LIBRARY_PATH 并启动独立运行时
├── packages/
│   ├── entry/src/                   # 引导进程源码 (6 个原始 .ts 模块)
│   │   ├── entry.ts                 # 小包热更新校验与主进程入口加载
│   │   └── utils/                   # fallbackDid.ts, request.ts, slardar/*
│   ├── main/src/                    # Electron 主进程源码 (192 个独立 ESM .ts 模块)
│   │   ├── index.ts                 # 主进程启动入口
│   │   ├── app.ts                   # AppInstance 生命周期、https:// 协议接管、bdms 与 bdticket 签名
│   │   ├── beforeReady.ts           # Chromium 启动参数与 app:// 特权协议注册
│   │   ├── afterReady.ts            # 设备注册 (did/iid)、TTNet、Parfait 日志与崩溃上报
│   │   ├── afterReadyMinimal.ts     # 安全模式检测
│   │   ├── base/                    # 设备信息、全局配置、响应式状态与持久化存储封装
│   │   ├── idl/                     # 全部 157 个 GoAPI 接口契约与商业化/会员协议定义 (*.ts)
│   │   ├── libs/bdticket/           # 零信任会话守卫配置与签名拦截器 (*.ts)
│   │   ├── renderer/                # 主进程与渲染进程共享状态桥接 (*.ts)
│   │   ├── services/                # 27 个核心业务服务 (window, playerProxy, queue, user, serverPush, desktopLyrics...)
│   │   └── utils/                   # 网络请求、Cookie 同步、资源定位、离线缓存与图片模板工具 (*.ts)
│   ├── addons/                      # 5 个原生 C++ N-API 插件的 TypeScript 加载封装
│   │   ├── loader.ts
│   │   └── {bdms,bdticket,device,lmdb,ttnet,taskbar-widget-helper}/index.ts
│   ├── vendor/                      # 内置第三方依赖运行时封装 (*.ts)
│   └── renderers/                   # 全部 8 个 Vue 3 前端窗口源码 (.ts + .css + .html)
│       ├── main/                    # 主播放器窗口
│       │   ├── main.html            # 页面入口
│       │   ├── public/assets/       # 静态图像、SVG、Emoji 与音频音效 WASM (byte_audio_tuner_wasm)
│       │   └── src/
│       │       ├── main.ts          # Vue 3 应用核心逻辑
│       │       ├── components/      # catalog.ts (168 个 Vue 3 SFC 组件清单)
│       │       ├── router/          # routes.ts (24 条前端路由表)
│       │       ├── services/        # base.ts, player.ts (PlayerEngineV4 + Spade 解密), renderer.ts, resPreload.ts, tokenBeat.ts
│       │       ├── worklets/        # audioEffectProcessor.ts (WebAudio AudioWorklet 音效处理器)
│       │       ├── libs/            # Frontier WebSocket、加密库与安全 SDK 模块
│       │       ├── data/            # Lottie 动画预设模块 (lottiePreset01.ts .. lottiePreset11.ts)
│       │       └── styles/          # main.css (主界面样式) & renderer.css (弹窗与子页面样式)
│       ├── desktopLyrics/           # 桌面悬浮歌词窗口 (src/desktopLyrics.ts)
│       ├── taskbarWidget/           # 状态栏/任务栏迷你播放器 (src/taskbarWidget.ts)
│       ├── taskbarWidgetShadow/     # 迷你播放器阴影伴随窗口 (src/taskbarWidgetShadow.ts)
│       ├── captcha/                 # 安全验证弹窗 (src/captcha.ts)
│       ├── feedback/                # 用户反馈窗口 (src/feedback.ts)
│       ├── imagePreview/            # 大图预览窗口 (src/imagePreview.ts)
│       └── update/                  # 版本更新窗口 (src/update.ts)
├── native/arm64/                    # 原生 N-API 插件与动态库 (bdms.node, bdticket.node, device.node, lmdb.node, ttnet.node, libMetaSecML.dylib, libsscronet.dylib)
├── runtime/QishuiRuntime.app/       # 定制 Electron 36.4.0-rs.29 运行时（含支持 setDemuxerArg 解密的 libffmpeg.dylib）
├── resources/                       # MiSansVF.woff2 字体、应用图标与内置离线缓存
└── dist/                            # 编译产物目录 (由 npm run build 自动生成)
```

## 原生模块与音频解密链路说明

| 模块文件 | 作用说明 |
| :--- | :--- |
| `ttnet.node` + `libsscronet.dylib` | 字节跳动 Cronet / HTTP2 / QUIC 网络栈与域名调度 |
| `bdms.node` + `libMetaSecML.dylib` | 请求头签名与风控环境校验 |
| `bdticket.node` | 零信任票据守卫（针对收藏、关注、隐私设置等 `ree_path` 接口加签） |
| `device.node` | 硬件序列号读取、AppLog 加密以及音频流 `Spade` 密钥解码 (`decodeSpade`) |
| `lmdb.node` | 高性能内存映射数据库（驱动 `LunaStorage` 配置库与 `LunaCacheV2` 音频分片缓存） |
| `QishuiRuntime.app` (`libffmpeg.dylib`) | 提供渲染层 `TTCommon.executeWithElement(video, "setDemuxerArg", ...)` 接口，完成加密 AAC/MP4/FLAC 音频流实时解复用播放 |
