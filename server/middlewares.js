const request = require("request");

// 1
const fake = (req, res, next) => next();

// 2
const proxyMiddleware = proxy => (req, res) => {
  const method = req.method.toLowerCase().replace(/delete/, "del");
  var r;
  switch (method) {
    case "get":
      r = request.get({
        uri: proxy + req.url
      });
      break;
    case "post":
    case "del":
    case "put":
      r = request[method]({
        uri: proxy + req.url,
        json: req.body
      });
      break;
    default:
      return res.send("invalid method");
  }
  return req.pipe(r).pipe(res);
};

//3
const headersMiddleware = headers => (req, res, next) => {
  Object.keys(headers).forEach(key => {
    res.setHeader(key, headers[key]);
  });
  next();
};

exports.fakeMiddleware = fake;
exports.proxyMiddleware = proxyMiddleware;
exports.headersMiddleware = headersMiddleware;
