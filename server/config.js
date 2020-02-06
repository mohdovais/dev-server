module.exports = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  after: function(app, server, compiler) {
    // do fancy stuff
  },
  before: function(app, server, compiler) {
    app.get("/some/path", function(req, res) {
      res.json({ custom: "response" });
    });
  },
  headers: {
    "X-Server": "rollup-dev-server"
  },
  host: "localhost",
  https: true,
  open: "Firefox",
  openPage: ""
};
