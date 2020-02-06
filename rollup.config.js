const devServer = require("./rollup-plugin-devserver");

const watching = process.env.ROLLUP_WATCH;

module.exports = {
  input: "./src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    watching &&
      devServer({
        contentBase: "./dist"
      })
  ],
  watch: {
    clearScreen: false
  }
};
