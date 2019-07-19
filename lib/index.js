const repl = require("repl");
const path = require("path");

const Watcher = require("./watch");
const Args = require("./options");
const Repl = require("./repl");

exports.start = function(args) {
  const options = new Args(args);
  const replInstance = new Repl(options);

  const filename = options.filename();

  if (!filename) {
    throw Error("No filename defined in options.");
  }

  const absoluteFile = path.resolve(process.cwd(), filename);
  const file = path.parse(absoluteFile);

  if (options.watch()) {
    const watcher = new Watcher(file.dir, options);
    watcher.watch();
    watcher.on("quit", function() {
      process.exit(0);
    });
  } else {
    replInstance.start(file);
  }
};
