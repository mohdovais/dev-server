const polka = require("polka");
const staticMiddleware = require("serve-static");
const compression = require("compression");
const debugMiddleware = require("./debug");

const {
  fakeMiddleware,
  headersMiddleware,
  proxyMiddleware
} = require("./middlewares");

function createServer({ headers, contentBase, proxy, compress, serveStatic }) {
  const polkaServer = polka();

  return polkaServer.use(
    headersMiddleware(Object.assign({}, headers)),
    debugMiddleware,
    proxy !== false ? proxyMiddleware(proxy) : fakeMiddleware,
    contentBase !== false && serveStatic !== false
      ? staticMiddleware(contentBase, serveStatic)
      : fakeMiddleware,
    compress !== false
      ? compression(Object.assign({}, compress))
      : fakeMiddleware
  );
}

exports.createPolkaServer = createServer;
