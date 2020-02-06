const livereload = require("livereload");

function createServer(config) {
  const livereloadServer = livereload.createServer(
    Object.assign({}, config),
    function() {
      console.log(
        `> livereload listening on ${livereloadServer.config.port}\n`
      );
    }
  );

  return livereloadServer;
}

exports.createLivereloadServer = createServer;
