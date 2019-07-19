# Lib Repl

Auto load js module into repl for easy interaction.

## Usage

```
lib-repl --file src/index.js
```

The library will take the same name of the file in the repl context.

So for the above case it would look like this.

```
> index.myFunction();
```

If you want the library to auto load on changes, use the `--watch` option.

```
lib-repl --file src/index.js --watch
```

The repl and library will restart on any change in `src/`

Repl history is stored in `node_modules/.cache/lib-repl/` or `process.env.HOME` if it doesn't exist.

# license

MIT
