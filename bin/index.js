#!/usr/bin/env node

const importLocal = require("import-local");

const [, , ...args] = process.argv;

if (!importLocal(__filename)) {
  require("../lib").start(args);
}
