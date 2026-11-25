// src/services/user/user.ts
// @ts-nocheck
import { __require, __toESM, require_bdms } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { State } from "../../base/state/state";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import { initialSharedState } from "../sharedState/initialState";
import { StorageState } from "../../base/storage/storageState";
import "../storage/type";
import { AsyncCell } from "../../utils/asyncCell";
import { logger } from "../../utils/logger";

let import_electron26: any = __require("electron");

let bdms4: any = __toESM(require_bdms());

class UserService extends Service {
        state = new State(initialSharedState.user);
        userInfoStateCache = new StorageState("Config" /* config */, "userInfoStateCache", null);
        userInfoState = new AsyncCell();
        sessionChangedListeners = [];
        loginListeners = [];
        constructor() {
          super();
          this.state.onUpdateBatched((state) => {
            protocolOf("sharedState" /* sharedState */).update("user", state);
          });
        }
        async initialize() {
          const oldCookies = await protocolOf("storage" /* storage */).get("Config" /* config */, "userCookie");
          const isMigrated = await protocolOf("storage" /* storage */).get("Config" /* config */, "userCookieMigrated");
          if (oldCookies && !isMigrated) {
            const cookies = Object.fromEntries(oldCookies.split(";").map((t2) => t2.trim()).map((t2) => t2.split("=").map((t3) => t3.trim())));
            for (const [key, value] of Object.entries(cookies)) {
              await import_electron26.session.defaultSession.cookies.remove("https://api.qishui.com", key);
              await import_electron26.session.defaultSession.cookies.set({
                url: "https://api.qishui.com",
                name: key,
                value,
                domain: ".qishui.com",
                path: "/",
                secure: true,
                sameSite: "no_restriction",
                expirationDate: (Date.now() + 365 * 24 * 60 * 60 * 1e3) / 1e3
              });
            }
            await protocolOf("storage" /* storage */).set("Config" /* config */, "userCookieMigrated", true);
          }
          await this.initializeUserInfo();
        }
        async initializeUserInfo() {
          const cache = await this.userInfoStateCache.getWhenReady();
          if (cache) {
            this.state.update(() => ({
              isLoading: false,
              info: cache
            }));
            this.userInfoState.resolve(cache);
            await this.fetchUserInfo();
          } else {
            this.state.update(() => ({
              isLoading: false,
              info: null
            }));
            this.userInfoState.resolve(null);
            return;
          }
        }
        async fetchUserInfo() {
          try {
            const myInfo = await protocolOf("request" /* request */).request("GetMyInfo", {});
            if (myInfo.status_code) {
              protocolOf("renderer" /* renderer */).showToast({
                message: myInfo.status_info?.status_msg ?? "\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
              });
              if (myInfo.status_code === 1000016) {
                this.deleteUserInfo();
              }
              throw new Error(myInfo.status_info?.status_msg || "\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
            }
            if (myInfo.my_info) {
              const info = {
                my_info: myInfo.my_info,
                my_stats: myInfo.my_stats,
                redeem_freevip_info: myInfo.redeem_freevip_info,
                tab_entries: myInfo.tab_entries,
                free_vip_banner: myInfo.free_vip_banner
              };
              this.userInfoStateCache.set(info);
              this.userInfoState.resolve(info);
              this.state.update(() => ({
                isLoading: false,
                info
              }));
            } else {
              throw new Error("no my_info in GetMyInfo response");
            }
          } catch (e) {
            console.error(e);
          }
        }
        async deleteUserInfo() {
          this.state.update(() => ({
            isLoading: false,
            info: null
          }));
          this.userInfoStateCache.set(null);
          this.userInfoState.resolve(null);
        }
        async login({ waitComplete = true, etParams = {} }) {
          bdms4.report("login");
          const promise = protocolOf("renderer" /* renderer */).showLoginPanel(etParams);
          if (waitComplete) {
            const logged = await promise;
            if (!logged) {
              return;
            }
            await this.handleLogged();
            return true;
          } else {
            promise.then((logged) => {
              if (!logged) {
                return;
              }
              this.handleLogged();
            });
            return false;
          }
        }
        async handleLogged() {
          await this.fetchUserInfo();
          this.loginListeners.forEach((l2) => l2());
          this.sessionChangedListeners.forEach((l2) => l2("login"));
        }
        async logout() {
          bdms4.report("logout");
          try {
            await protocolOf("renderer" /* renderer */).callLoginSdkLogout();
          } catch (e) {
            logger.error("auth", e);
          }
          await this.deleteUserInfo();
          this.sessionChangedListeners.forEach((l2) => l2("logout"));
        }
      }

class UserServiceProtocol extends ServiceProtocol {
        async getSessionId() {
          const sessionId = await import_electron26.session.defaultSession.cookies.get({
            url: "https://api.qishui.com",
            name: "sessionid"
          });
          return sessionId[0]?.value;
        }
        async getQishuiCookies() {
          const cookies = await import_electron26.session.defaultSession.cookies.get({ url: "https://api.qishui.com" });
          return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
        }
        async isLogged() {
          return this.service.state.value.info !== null;
        }
        async login(options = {}) {
          return await this.service.login(options);
        }
        async logout() {
          await this.service.logout();
        }
        async onSessionChanged(callback) {
          this.service.sessionChangedListeners.push(callback);
        }
        async onLogin(callback) {
          this.service.loginListeners.push(callback);
        }
        async getUserInfoState() {
          return await this.service.userInfoState.get();
        }
        async deleteUserInfo() {
          await this.service.deleteUserInfo();
        }
        async refreshUserInfo() {
          await this.service.fetchUserInfo();
        }
      }

export {
  UserService,
  UserServiceProtocol
};
