const request = require("request");

const { PROXY_URL = "http://localhost:5000" } = process.env;

function proxy(req, res, next) {
  const method = req.method.toLowerCase().replace(/delete/, "del");
  var r;
  switch (method) {
    case "get":
      r = request.get({
        uri: PROXY_URL + req.url
      });
      break;
    case "post":
    case "del":
    case "put":
      r = request[method]({
        uri: PROXY_URL + req.url,
        json: req.body
      });
      break;
    default:
      return res.send("invalid method");
  }
  return req.pipe(r).pipe(res);
}

module.exports = proxy;
