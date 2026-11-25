// src/services/internalCheck/internalCheck.ts
// @ts-nocheck
import { __require, init_esm } from "../../../../vendor/index";
import { Service, ServiceProtocol } from "../base";
import { StorageState } from "../../base/storage/storageState";
import "../storage/type";
import "../../utils/request";
import "../../base/globalConfig/value";

init_esm();
let import_electron12: any = __require("electron");

class InternalCheckService extends Service {
        pendingCode = null;
        ssoToken = new StorageState("Config" /* config */, "ssoToken", null);
        abortController;
        isAbort = false;
        openSSOPage() {
          const url2 = new URL("https://sso.bytedance.com/oidc/v1/authorize");
          url2.searchParams.set("response_type", "code");
          url2.searchParams.set("client_id", "md1jzjfsk4h3uv9vqgao");
          url2.searchParams.set("redirect_uri", "luna://luna.com/sso");
          url2.searchParams.set("scope", "openid email profile");
          url2.searchParams.set("state", "pc");
          import_electron12.shell.openExternal(url2.toString());
        }
        async showWaitingDialog({ retry = false } = {}) {
          this.abortController = new AbortController();
          const result = await import_electron12.dialog.showMessageBox({
            message: retry ? "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u5728\u6253\u5F00\u7684\u6D4F\u89C8\u5668\u7A97\u53E3\u4E2D\u5B8C\u6210 SSO \u767B\u5F55\u9A8C\u8BC1" : "\u8BF7\u5728\u6253\u5F00\u7684\u6D4F\u89C8\u5668\u7A97\u53E3\u4E2D\u5B8C\u6210 SSO \u767B\u5F55\u9A8C\u8BC1",
            buttons: ["\u786E\u8BA4\u767B\u5F55", "\u91CD\u8BD5", "\u53D6\u6D88"],
            defaultId: 0,
            cancelId: 2,
            signal: this.abortController.signal
          });
          if (this.isAbort) {
            return;
          }
          if (result.response === 1) {
            this.openSSOPage();
            await this.showWaitingDialog();
            return;
          } else if (result.response === 2) {
            if (this.isAbort) {
              return;
            }
            import_electron12.app.exit();
            return;
          }
          if (!this.pendingCode) {
            this.openSSOPage();
            await this.showWaitingDialog({ retry: true });
            return;
          }
        }
        async showSSOLogin() {
          if (false) {
            const token = await this.ssoToken.getWhenReady();
            if (token) {
              const decoded = jwtDecode(token);
              if (decoded.expires_at * 1e3 > Date.now()) {
                return;
              } else {
                this.ssoToken.set(null);
              }
            }
            this.openSSOPage();
            await this.showWaitingDialog();
            if (!this.pendingCode) {
              import_electron12.app.exit();
              return;
            }
            const urlObj = new URL("https://api.qishui.com/sso/token");
            urlObj.searchParams.set("code", this.pendingCode);
            urlObj.searchParams.set("state", "pc");
            urlObj.searchParams.set("device_id", getGlobalConfig2().deviceId);
            const response = await fetch3(urlObj.toString(), {
              method: "GET"
            });
            const jwtResponse = {
              status: response.status,
              headers: Object.fromEntries(response.headers.entries()),
              data: await response.json()
            };
            console.log("jwtResponse", jwtResponse.data);
            if (!jwtResponse.data?.auth_token) {
              return;
            }
            this.ssoToken.set(jwtResponse.data.auth_token);
          }
        }
        async receiveCode(code) {
          import_electron12.app.focus();
          if (process.platform === "darwin") {
            import_electron12.app.show();
          }
          this.pendingCode = code;
          this.isAbort = true;
          this.abortController?.abort();
        }
      }

class InternalCheckServiceProtocol extends ServiceProtocol {
        async renewSSO() {
          this.service.ssoToken.set(null);
          import_electron12.app.relaunch();
          import_electron12.app.exit();
        }
        async showSSOLogin() {
          await this.service.showSSOLogin();
        }
        async ssoToken() {
          return await this.service.ssoToken.getWhenReady();
        }
        async receiveCode(code) {
          return this.service.receiveCode(code);
        }
      }

export {
  InternalCheckService,
  InternalCheckServiceProtocol
};
