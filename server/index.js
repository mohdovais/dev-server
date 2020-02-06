/* node internals */
const { createServer } = require("https");
const { readFileSync } = require("fs");
const path = require("path");

/* node_modules */
const polka = require("polka");
const staticMiddleware = require("serve-static");
const compression = require("compression");
const livereload = require("livereload");

/* local */
const proxyMiddleware = require("./proxy");

const options = {
  key: readFileSync(path.resolve(__dirname, "./ssl/server.key")),
  cert: readFileSync(path.resolve(__dirname, "./ssl/server.crt"))
};

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
    allowedHosts,
    proxy,
    contentBase,
    compress,
    https,
    headers,
    disableHostCheck,
    historyApiFallback,
    liveReload
  } = Object.assign(defaultConfig, config);
  let livereloadServer;

  const headersMiddleware = function(req, res, next) {
    Object.keys(headers).forEach(key => {
      res.setHeader(key, headers[key]);
    });
    next();
  };

  const allowedHostsMiddleware = function(req, res, next) {
    console.log(req.headers.host);
    if (allowedHosts.length !== 0) {
      return next();
    }
    next();
  };

  const polkaServer = polka();
  const { handler } = polkaServer.use.apply(
    polkaServer,
    [
      !disableHostCheck && allowedHostsMiddleware,
      headersMiddleware,
      proxy
        ? proxyMiddleware
        : contentBase !== false && staticMiddleware(contentBase),
      compress && compression
    ].filter(x => x !== false)
  );
  const webServer = createServer(https ? options : {}, handler);

  if (liveReload && contentBase) {
    livereloadServer = livereload.createServer(
      Object.assign({}, liveReload),
      function() {
        console.log(
          `> livereload listening on ${livereloadServer.config.port}\n`
        );
      }
    );
    livereloadServer.watch(contentBase);
  }

  webServer.listen(port, host, _ => {
    console.log(`> Running server on https://${host}:${port}\n`);
  });

  return webServer;
}

exports.createServer = start;
