// src/utils/cron.ts
// @ts-nocheck
import { __toESM, require_dayjs_min } from "../../../vendor/index";

function wrapRandomly(callback, range) {
    return () => setTimeout(() => callback(), Math.floor(range * Math.random()));
  }

function onEachDay(callback, options) {
    eachDayTasks.push({
      lastTime: (0, import_dayjs3.default)(),
      callback: options?.randomSeconds ? wrapRandomly(callback, 1e3 * options.randomSeconds) : callback
    });
  }

function runTask(task) {
    try {
      task.callback();
      task.lastTime = (0, import_dayjs3.default)();
    } catch (e) {
      console.error(e);
    }
  }

function clearTask() {
    const inDayHandleRange = (0, import_dayjs3.default)().hour() === 0;
    if (inDayHandleRange) {
      eachDayTasks.forEach((task) => {
        const isHandled = task.lastTime.isAfter((0, import_dayjs3.default)().subtract(1, "day"));
        if (!isHandled) {
          runTask(task);
        }
      });
    }
    const inHourHandleRange = (0, import_dayjs3.default)().minute() === 0;
    if (inHourHandleRange) {
      eachHourTasks.forEach((task) => {
        const isHandled = task.lastTime.isAfter((0, import_dayjs3.default)().subtract(1, "minute"));
        if (!isHandled) {
          runTask(task);
        }
      });
    }
    const inMinuteHandleRange = (0, import_dayjs3.default)().second() >= 0 && (0, import_dayjs3.default)().second() < 10;
    if (inMinuteHandleRange) {
      eachMinuteTasks.forEach((task) => {
        const isHandled = task.lastTime.isAfter((0, import_dayjs3.default)().subtract(10, "second"));
        if (!isHandled) {
          runTask(task);
        }
      });
    }
  }

let import_dayjs3: any = __toESM(require_dayjs_min());

let eachDayTasks: any = [];

let eachHourTasks: any = [];

let eachMinuteTasks: any = [];

setInterval(() => {
        clearTask();
      }, 1e3);

export {
  onEachDay
};
