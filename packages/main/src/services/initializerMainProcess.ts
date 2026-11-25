// src/services/initializerMainProcess.ts
// @ts-nocheck
import { ServiceInitializer } from "./initializer";
import "./serviceId";
import { MainProcessServiceTransport } from "./transportMainProcess";
import "./workerId";

globalThis.createServiceInitializer = () => new ServiceInitializer({
        workerId: "main" /* main */,
        transport: (initializer) => new MainProcessServiceTransport(initializer),
        initialize: async (initializer) => {
          initializer.register("internalCheck" /* internalCheck */, import("./internalCheck/internalCheck"));
          initializer.register("window" /* window */, import("./window/window"));
          initializer.register("utils" /* utils */, import("./utils/utils"));
          initializer.register("debug" /* debug */, import("./debug/debug"));
          initializer.register("startup" /* startup */, import("./startup/startup"));
          initializer.register("sharedState" /* sharedState */, import("./sharedState/sharedState"));
          initializer.register("storage" /* storage */, import("./storage/storage"));
          initializer.register("request" /* request */, import("./request/request"));
          initializer.register("appSettings" /* appSettings */, import("./appSettings/appSettings"));
          initializer.register("applog" /* applog */, import("./applog/applog"));
          initializer.register("user" /* user */, import("./user/user"));
          initializer.register("serverPush" /* serverPush */, import("./serverPush/serverPush"));
          initializer.register("update" /* update */, import("./update/update"));
          initializer.register("queue" /* queue */, import("./queue/queue"));
          initializer.register("collect" /* collect */, import("./collect/collect"));
          initializer.register("commerce" /* commerce */, import("./commerce/commerce"));
          initializer.register("playerProxy" /* playerProxy */, import("./playerProxy/index"));
          initializer.register("desktopLyrics" /* desktopLyrics */, import("./desktopLyrics/desktopLyrics"));
          initializer.register("shortcut" /* shortcut */, import("./shortcut/shortcut"));
          initializer.register("notification" /* notification */, import("./notification/notification"));
          initializer.register("taskbarWidget" /* taskbarWidget */, import("./taskbarWidget/taskbarWidget"));
          initializer.register("freqCtrl" /* freqCtrl */, import("./freqCtrl/freqCtrl"));
          initializer.register("imagePreviewer" /* imagePreviewer */, import("./imagePreviewer/imagePreviewer"));
          initializer.register("clock" /* appClock */, import("./appClock/appClock"));
        }
      });

