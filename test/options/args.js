const tap = require("tap");
const { Args } = require("../../lib/options");

tap.equal(new Args(["--watch"]).watch(), true);
tap.equal(new Args([]).watch(), false);

tap.equal(new Args(["--file", "index.js"]).filename(), "index.js");
