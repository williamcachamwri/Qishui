# Qishui Music (`汽水音乐` v3.7.0) — 100% TypeScript Reconstructed Monorepo

Dự án mã nguồn **100% TypeScript (`.ts`)** cho cả **Backend** (`entry`, `main`, `addons`, `vendor`) và **Frontend** (8 cửa sổ giao diện Vue 3 + WebAudio WASM), kèm **Runtime & Dylibs tự thân hoàn toàn độc lập** bên trong `/Users/wica/Qishui` (không tham chiếu hay phụ thuộc bất kỳ tệp nào ở `/Applications`).

## Lệnh chạy & phát triển

```bash
cd /Users/wica/Qishui

# (Khi mới git clone trên máy mới) Cài dependencies + tải QishuiRuntime.app từ GitHub Release v3.7.0:
npm install && npm run setup-runtime

# Biên dịch toàn bộ TypeScript (Backend + 8 Frontend Renderers) -> dist/ và mở ứng dụng:
npm start

# Chế độ phát triển (mở khoá DevTools Cmd+Option+I):
npm run dev

# Chỉ biên dịch TypeScript -> dist/:
npm run build

# Kiểm tra kiểu TypeScript toàn dự án (tsc --noEmit):
npm run typecheck
```

## Kiến trúc Monorepo (`/Users/wica/Qishui`)

```text
/Users/wica/Qishui/
├── package.json                     # Cấu hình scripts (tsx + esbuild + tsc)
├── tsconfig.json                    # Cấu hình TypeScript chuẩn ES2023 / Bundler
├── types/
│   └── electron-bytedance.d.ts      # Khai báo kiểu TypeScript cho TTChromiumNetwork, parfait, TTMetrics, ttnet, TTCommon
├── scripts/
│   ├── build.ts                     # Biên dịch toàn bộ packages/entry, packages/main & 8 packages/renderers từ .ts -> dist/
│   └── launch.ts                    # Khởi chạy runtime/QishuiRuntime.app độc lập kèm DYLD_LIBRARY_PATH nội bộ
├── packages/
│   ├── entry/src/                   # 6 module TypeScript gốc của Entry Process:
│   │   ├── entry.ts
│   │   └── utils/                   # fallbackDid.ts, request.ts, slardar/{background.ts, blacklist.ts, transports/electronFetch.ts}
│   ├── main/src/                    # 192 module TypeScript gốc của Electron Main Process (ESM import/export chuẩn):
│   │   ├── index.ts                 # Điểm vào chính
│   │   ├── app.ts                   # Vòng đời AppInstance, protocol https://, ký bdms & bdticket
│   │   ├── beforeReady.ts           # Khởi tạo Chromium switches & scheme app://
│   │   ├── afterReady.ts            # Đăng ký thiết bị, TTNet, Parfait, CrashReporter
│   │   ├── afterReadyMinimal.ts     # Kiểm tra Safe Mode
│   │   ├── base/                    # device.ts, globalConfig/value.ts, state.ts, storageState.ts
│   │   ├── idl/                     # Toàn bộ hợp đồng GoAPI & Commerce (*.ts)
│   │   ├── libs/bdticket/           # Cấu hình Zero-Trust Session Guard (*.ts)
│   │   ├── renderer/                # Định nghĩa cầu nối IPC & SharedState (*.ts)
│   │   ├── services/                # 27 nhóm dịch vụ (window, playerProxy, queue, user, serverPush, desktopLyrics...) (*.ts)
│   │   └── utils/                   # request.ts, resources.ts, ttnet.ts, offlineCache.ts, image.ts... (*.ts)
│   ├── addons/                      # Wrapper TypeScript nạp 5 addon C++ N-API từ native/arm64/:
│   │   ├── loader.ts
│   │   └── {bdms,bdticket,device,lmdb,ttnet,taskbar-widget-helper}/index.ts
│   ├── vendor/                      # Các thư viện phụ trợ đóng gói dưới dạng TypeScript (helpers.ts, index.ts)
│   └── renderers/                   # Toàn bộ 8 giao diện người dùng bằng TypeScript (.ts) + CSS + HTML:
│       ├── main/                    # Trình phát nhạc chính Vue 3:
│       │   ├── main.html
│       │   ├── public/assets/       # Ảnh, SVG, WASM Audio Tuner (byte_audio_tuner_wasm), Emoji, MP4
│       │   └── src/
│       │       ├── main.ts          # Nhân ứng dụng Vue 3
│       │       ├── components/      # catalog.ts (168 Vue 3 SFC components)
│       │       ├── router/          # routes.ts (24 đường dẫn Vue Router)
│       │       ├── services/        # base.ts, player.ts (PlayerEngineV4 + Spade Demuxer), renderer.ts, resPreload.ts, tokenBeat.ts
│       │       ├── worklets/        # audioEffectProcessor.ts (AudioWorklet DSP)
│       │       ├── libs/            # frontierWs.ts, elliptic.ts, jsrsasign.ts, secSdk*.ts
│       │       ├── data/            # lottiePreset01.ts .. lottiePreset11.ts
│       │       └── styles/main.css
│       ├── desktopLyrics/           # Lời bài hát nổi (src/desktopLyrics.ts)
│       ├── taskbarWidget/           # Widget thanh menu (src/taskbarWidget.ts)
│       ├── taskbarWidgetShadow/     # Cửa sổ bóng của widget (src/taskbarWidgetShadow.ts)
│       ├── captcha/                 # Xác thực bảo mật (src/captcha.ts)
│       ├── feedback/                # Phản hồi người dùng (src/feedback.ts)
│       ├── imagePreview/            # Xem ảnh phóng to (src/imagePreview.ts)
│       └── update/                  # Hộp thoại cập nhật (src/update.ts)
├── native/arm64/                    # Toàn bộ .node & .dylib nội bộ (bdms.node, bdticket.node, device.node, lmdb.node, ttnet.node, libMetaSecML.dylib, libsscronet.dylib)
├── runtime/QishuiRuntime.app/       # Nhân Electron 36.4.0-rs.29 + libffmpeg.dylib hỗ trợ TTCommon setDemuxerArg giải mã nhạc gốc
├── resources/                       # Phông MiSansVF.woff2, icons & offline cache
└── dist/                            # Đầu ra biên dịch tự động khi chạy npm run build / npm start
```
