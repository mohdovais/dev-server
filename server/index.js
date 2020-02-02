const { createServer } = require("https");
const { readFileSync } = require("fs");
const path = require("path");

const { handler } = require("./app.js");

const options = {
  key: readFileSync(path.resolve(__dirname, "./ssl/server.key")),
  cert: readFileSync(path.resolve(__dirname, "./ssl/server.crt"))
};

const { PORT = 3000 } = process.env;

// Mount Polka to HTTPS server
createServer(options, handler).listen(PORT, _ => {
  console.log(`> Running on https://localhost:${PORT}`);
});
