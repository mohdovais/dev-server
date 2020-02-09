const { createServer } = require("./server/index");

const server = createServer({
  host: '0.0.0.0',
  port: 8000,
  contentBase: "./dist",
  serveStatic: false,
  //https: false,
  proxy: 'https://www.google.com'
});
