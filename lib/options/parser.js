const optionKeyRegexp = new RegExp("\\-{1,2}w*[^s]");

exports.parseOptions = function(arr) {
  if (arr.length <= 0) {
    throw new Error("You must provide options..");
  }

  const options = {};

  let arg;
  let optionKey;

  for (let i = 0; i < arr.length; i++) {
    arg = arr[i];

    if (optionKeyRegexp.test(arg)) {
      if (arg in options) {
        throw new Error(`Option ${arg} already defined.`);
      }

      options[arg] = undefined;
      optionKey = arg;
    } else {
      // should expect an option key before an arg
      if (!optionKey) {
        throw new Error(`Invalid option ${key}`);
      }

      if (options[optionKey]) {
        throw new Error(
          `${optionKey} value of ${options[optionKey]} already defined.`
        );
      }

      options[optionKey] = arg;
    }
  }

  return options;
};
