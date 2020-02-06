const { createServer } = require("./server/index");

function devServer(options = {}) {
  const { webServer, socketServer } = createServer(options);

  [("SIGINT", "SIGTERM")].forEach(signal => {
    process.on(signal, () => {
      socketServer.close();
      webServer.close();
      process.exit();
    });
  });

  return {
    name: "dev-server",
    writeBundle: function(bundle) {
      socketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(Object.keys(bundle).toString());
        }
      });
    }
  };
}

module.exports = devServer;
