// src/utils/logger.ts
// @ts-nocheck

class LogBuilder {
        logText = [];
        time(ms) {
          this.logText.push(`${ms.toFixed(1)}ms`);
          return this;
        }
        text(t2) {
          this.logText.push(t2);
          return this;
        }
        object(t2) {
          this.logText.push(JSON.stringify(t2, void 0, 2));
          return this;
        }
        bold(t2) {
          this.logText.push(t2);
          return this;
        }
        build() {
          return this.logText.join(" ");
        }
      }

class Logger {
        info(category, builder) {
          console.log(`${(/* @__PURE__ */ new Date()).toISOString()} INFO [${category}] ${builder(new LogBuilder()).build()}`);
        }
        warn(category, builder) {
          console.log(`${(/* @__PURE__ */ new Date()).toISOString()} WARN [${category}] ${builder(new LogBuilder()).build()}`);
        }
        error(category, error) {
          console.log(`${(/* @__PURE__ */ new Date()).toISOString()} ERROR [${category}] ${error.stack ?? JSON.stringify(error)}`);
        }
      }

let logger: any = new Logger();

export {
  logger
};
