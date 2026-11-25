// src/services/imagePreviewer/imagePreviewer.ts
// @ts-nocheck
import { Service, ServiceProtocol } from "../base";
import { protocolOf } from "../index";
import "../serviceId";
import "../window/type";

class ImagePreviewerService extends Service {
        async preview(url2) {
          await protocolOf("window" /* window */).showWindowAndWaitForReady("imagePreview" /* imagePreview */, { injectedData: { img: url2 } });
        }
      }

class ImagePreviewerServiceProtocol extends ServiceProtocol {
        async preview(url2) {
          return this.service.preview(url2);
        }
      }

export {
  ImagePreviewerService,
  ImagePreviewerServiceProtocol
};
