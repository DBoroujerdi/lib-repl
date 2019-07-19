const chokidar = require("chokidar");
const { spawn } = require("child_process");
const fs = require("fs");
const { EventEmitter } = require("events");
const rl = require("readline");

const bin = require.resolve("../bin/index.js");

class Watcher extends EventEmitter {
  constructor(dir, options) {
    super();
    this.dir = dir;
    this.options = options;
  }

  onChange() {
    this.kill();
  }

  closeWatcher() {
    if (this.watcher) {
      this.watcher.close();
    }
    this.watcher = null;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  watch() {
    this.closeWatcher();

    const args = this.options.args().filter(x => x !== "--watch");
    this.proc = spawn(process.execPath, [bin, ...args], {
      stdio: "inherit"
    });

    this.proc.on("close", async (code, signal) => {
      if (signal === "SIGTERM") {
        this.watch();
      } else if (signal === null) {
        if (code === 0) {
          this.emit("quit");
        } else if (code === 1) {
          await this.sleep(1000);
          this.watch();
        }
      }
    });

    this.watcher = chokidar.watch(this.dir);

    this.watcher.on("change", (ev, file) => {
      console.log("\nReloading....\n");
      this.onChange();
    });
  }

  kill() {
    if (this.proc) {
      this.proc.kill("SIGTERM");
    }
  }
}

module.exports = Watcher;
