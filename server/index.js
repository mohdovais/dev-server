/* node internals */
const { createServer } = require("https");
const { readFileSync } = require("fs");
const path = require("path");

/* node_modules */

/* local */
const { createPolkaServer } = require("./polka");
const { createLivereloadServer } = require("./livereload");

const httpsOptions = {
  key: readFileSync(path.resolve(__dirname, "./ssl/server.key")),
  cert: readFileSync(path.resolve(__dirname, "./ssl/server.crt"))
};

const emptyFn = () => {};

const defaultConfig = {
  host: "localhost",
  port: 3000,
  proxy: false,
  contentBase: path.resolve("./"),
  serveStatic: {},
  compress: true,
  https: true,
  headers: {
    server: "DevServer/1.0"
  },
  clientLogLevel: "silient",
  disableHostCheck: true,
  historyApiFallback: false,
  liveReload: true
};

function start(config) {
  const {
    host,
    port,
    proxy,
    contentBase,
    compress,
    https,
    headers,
    serveStatic,
    liveReload
  } = Object.assign(defaultConfig, config);

  const livereloadServer =
    liveReload && contentBase
      ? createLivereloadServer(liveReload)
      : {
          fake: true,
          watch: emptyFn,
          close: emptyFn
        };

  const { handler } = createPolkaServer({
    headers,
    serveStatic,
    contentBase,
    proxy,
    compress
  });

  const webServer = createServer(Object.assign(httpsOptions, https), handler);

  livereloadServer.watch(contentBase);

  webServer.on("close", () => {
    livereloadServer.close();
  });

  webServer.listen(port, host, () => {
    console.log(`> Running server on https://${host}:${port}\n`);
  });

  return webServer;
}

exports.createServer = start;
