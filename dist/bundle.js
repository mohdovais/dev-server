(function () {
  'use strict';

  function sum() {
    return Array.prototype.reduce.call(
      arguments,
      function(sum, item) {
        return sum + item;
      },
      0
    );
  }

  console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));

  const webSocket = new WebSocket(
    `wss:${location.host.replace(":" + location.port, "")}:35729`
  );

  webSocket.onmessage = function(event) {
    //console.log(document.currentScript);
    //console.log(event.data);
    document.location.reload();
  };

}());
//# sourceMappingURL=bundle.js.map
