// src/services/applog/timeCalc.ts
// @ts-nocheck

class UsageTimeCalc {
        isCalcForeground = true;
        startTime = 0;
        totalTime = 0;
        foregroundTotalTime = 0;
        foregroundStartTime = 0;
        backgroundTotalTime = 0;
        backgroundStartTime = 0;
        reset(isForeground) {
          this.startTime = performance.now();
          this.totalTime = 0;
          this.isCalcForeground = isForeground;
          this.foregroundStartTime = 0;
          this.foregroundTotalTime = 0;
          this.backgroundStartTime = 0;
          this.backgroundTotalTime = 0;
        }
        getTimeMs() {
          return this.totalTime + (performance.now() - this.startTime);
        }
        handleToBackground() {
          if (this.isCalcForeground) {
            this.isCalcForeground = false;
            this.foregroundTotalTime += this.getTimeMs() - this.foregroundStartTime;
            this.backgroundStartTime = this.getTimeMs();
          }
        }
        handleToForeground() {
          if (!this.isCalcForeground) {
            this.isCalcForeground = true;
            this.backgroundTotalTime += this.getTimeMs() - this.backgroundStartTime;
            this.foregroundStartTime = this.getTimeMs();
          }
        }
        getBackgroundMs() {
          if (this.isCalcForeground) {
            return this.backgroundTotalTime;
          } else {
            return this.backgroundTotalTime + (this.getTimeMs() - this.backgroundStartTime);
          }
        }
        getForegroundMs() {
          if (this.isCalcForeground) {
            return this.foregroundTotalTime + (this.getTimeMs() - this.foregroundStartTime);
          } else {
            return this.foregroundTotalTime;
          }
        }
      }

export {
  UsageTimeCalc
};
