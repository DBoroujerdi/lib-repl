const repl = require("repl");
const path = require("path");
const mkdirp = require("mkdirp");
const fs = require("fs");

class Repl {
  constructor(options) {
    this.options = options;

    if (fs.existsSync("node_modules")) {
      this.historyDir = "node_modules/.cache/lib-repl";
    } else {
      this.historyDir = process.env.HOME;
    }
  }

  start(file) {
    this.replInstance = repl.start("lib-repl> ");

    this.replInstance.on("close", () => {
      this.saveHistory();
    });

    this.replInstance.history = this.loadHistory();

    const context = this.replInstance.context;
    const lib = `${file.dir}/${file.base}`;
    context[file.name] = eval(`require('${lib}')`);
  }

  saveHistory() {
    mkdirp(this.historyDir);
    try {
      fs.writeFileSync(
        this.historyDir + "/.lib_repl_history",
        this.replInstance.history.join("\n").trim()
      );
    } catch (e) {}
  }

  loadHistory() {
    try {
      return fs
        .readFileSync(this.historyDir + "/.lib_repl_history", "utf8")
        .trim()
        .split("\n");
    } catch (_) {
      return [];
    }
  }
}

module.exports = Repl;
