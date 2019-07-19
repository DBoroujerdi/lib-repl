const parser = require("./parser");

class Args {
  constructor(arr) {
    this.options = parser.parseOptions(arr);
    this.arr = arr;
  }

  filename() {
    const file = this.options["--file"];
    if (!file) {
      throw Error("No file name provided for --file option");
    }
    return file;
  }

  watch() {
    return "--watch" in this.options;
  }

  args() {
    return this.arr;
  }
}

module.exports = Args;
