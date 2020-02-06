const { createServer } = require("./server/index");

const { webServer, socketServer } = createServer({
  port: 8000,
  contentBase: "./dist"
});
