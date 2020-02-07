const { createServer } = require("./server/index");

const server = createServer({
  port: 8000,
  contentBase: "./dist",
  serveStatic: false,
  https: false,
  proxy: 'https://www.google.com'
});
