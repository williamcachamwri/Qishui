// src/services/freqCtrl/freqCtrl.ts
// @ts-nocheck
import { __toESM, require_dayjs_min } from "../../../../vendor/index";
import { protocolOf } from "../index";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import "../storage/type";
import { resolveKeys } from "./utils";

let import_dayjs5: any = __toESM(require_dayjs_min());

let DISABLE_MAGIC_NUMBER: any = 999999;

class FreqCtrlService extends Service {
        freqCtrlCfg;
        async initialize() {
          protocolOf("sharedState" /* sharedState */).onUpdate("commerce", (commerce) => {
            this.freqCtrlCfg = commerce.upsell?.freq_ctrl_cfg;
          });
        }
        async check(key, now) {
          const keys = resolveKeys(key);
          for (const k2 of keys) {
            if (!await this.checkSingleKey(k2, now)) {
              console.log("freqCtrl check fail");
              return false;
            }
          }
          console.log("freqCtrl check pass");
          return true;
        }
        async update(key, now) {
          const keys = resolveKeys(key);
          await Promise.all(keys.map((k2) => this.updateSingleKey(k2, now)));
        }
        async prune() {
          await protocolOf("storage" /* storage */).flush("FreqCtrl" /* freqCtrl */);
        }
        async getValue(key) {
          const value = await protocolOf("storage" /* storage */).get("FreqCtrl" /* freqCtrl */, key);
          return value;
        }
        async checkSingleKey(key, now) {
          const cfg = this.getItemFreqCtrlCfg(key);
          if (!cfg) {
            console.log("freqCtrl check pass: cfg is undefined");
            return true;
          }
          const value = await protocolOf("storage" /* storage */).get("FreqCtrl" /* freqCtrl */, key);
          if (!value) {
            console.log("freqCtrl check pass: no entry");
            return true;
          }
          const isSameDay = (0, import_dayjs5.default)(now).isSame(value.lastTs, "day");
          console.log("freqCtrl check: isSameDay:", isSameDay, "now:", now, "value.lastTs:", value.lastTs);
          if (cfg.day_max_cnt !== DISABLE_MAGIC_NUMBER && isSameDay && value.dayCnt >= cfg.day_max_cnt) {
            console.log("freqCtrl check fail: value.dayCnt:", value.dayCnt, "cfg.day_max_cnt:", cfg.day_max_cnt);
            return false;
          }
          if (cfg.global_max_cnt !== DISABLE_MAGIC_NUMBER && value.globalCnt >= cfg.global_max_cnt) {
            console.log("freqCtrl check fail: value.globalCnt:", value.globalCnt, "cfg.global_max_cnt:", cfg.global_max_cnt);
            return false;
          }
          const interval = (now ?? Date.now()) - value.lastTs;
          if (cfg.min_interval_sec !== DISABLE_MAGIC_NUMBER && interval < cfg.min_interval_sec * 1e3) {
            console.log("freqCtrl check fail: interval:", interval, "cfg.min_interval_sec:", cfg.min_interval_sec);
            return false;
          }
          console.log("freqCtrl check pass: key:", key);
          return true;
        }
        async updateSingleKey(key, now) {
          const cfg = this.getItemFreqCtrlCfg(key);
          if (!cfg) {
            return;
          }
          const _now = now ?? Date.now();
          const value = await protocolOf("storage" /* storage */).get(
            "FreqCtrl" /* freqCtrl */,
            key
          );
          if (!value) {
            const newValue2 = {
              lastTs: _now,
              dayCnt: 1,
              globalCnt: 1
            };
            await protocolOf("storage" /* storage */).set("FreqCtrl" /* freqCtrl */, key, newValue2);
            return;
          }
          const isSameDay = (0, import_dayjs5.default)(_now).isSame(value.lastTs, "day");
          const newValue = {
            lastTs: _now,
            dayCnt: isSameDay ? value.dayCnt + 1 : 1,
            globalCnt: value.globalCnt + 1
          };
          await protocolOf("storage" /* storage */).set("FreqCtrl" /* freqCtrl */, key, newValue);
        }
        getItemFreqCtrlCfg(key) {
          if (!this.freqCtrlCfg) {
            return void 0;
          }
          const item = this.freqCtrlCfg.freq_ctrl_map?.[key];
          return item;
        }
      }

class FreqCtrlServiceProtocol extends ServiceProtocol {
        /**
         * 检查是否可以通过频控规则
         * @param key 频控 key 或者 key 数组
         * @returns 是否可以通过频控规则
         */
        async check(key, now) {
          return await this.service.check(key, now);
        }
        /**
         * 更新频控计数
         * @param key 频控 key 或者 key 数组
         */
        async update(key, now) {
          return await this.service.update(key, now);
        }
        /**
         * 清理所有频控计数
         */
        async prune() {
          return await this.service.prune();
        }
        /**
         * 获取单个 key 的频控计数
         * @param key 频控 key
         * @returns 频控计数
         */
        async getValue(key) {
          return await this.service.getValue(key);
        }
      }

export {
  FreqCtrlService,
  FreqCtrlServiceProtocol
};
