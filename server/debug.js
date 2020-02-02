const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

function debug(req, res, next) {
  if (req.url === "/debug") {
    const x = JSON.stringify(req, getCircularReplacer());
    res.writeHead(400, {
      "Content-Type": "application/json"
    });
    res.end(x);
  }
  next();
}

module.exports = debug;
