const WebSocket = require("ws");

function createServer({ server }) {
  return new WebSocket.Server({ server });
}

function connection(ws, request, client) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("something");
}

function connect(wss) {
  wss.on("connection", connection);
}

exports.createWebSocketServer = createServer;
exports.connect = connect;
