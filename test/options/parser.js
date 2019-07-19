const tap = require("tap");
const parser = require("../../lib/options/parser.js");

const parseOptions = parser.parseOptions;

tap.same(parseOptions(["--watch"]), { "--watch": undefined });
tap.same(parseOptions(["--file", "index.js"]), { "--file": "index.js" });
tap.same(parseOptions(["--file", "index.js", "--watch"]), {
  "--file": "index.js",
  "--watch": undefined
});

tap.throws(function() {
  parseOptions(["--watch", "--watch"]);
}, Error("Option --watch already defined."));

tap.throws(function() {
  parseOptions(["--file", "index.js", "index2.js"]);
}, Error("--file value of index.js already defined."));
