const { createServer } = require("./server/index");

function devServer(options = {}) {
  const server = createServer(options);

  [("SIGINT", "SIGTERM")].forEach(signal => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });

  return {
    name: "dev-server"
  };
}

module.exports = devServer;
