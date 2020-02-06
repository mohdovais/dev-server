import { sum } from "./sum";

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9));

const webSocket = new WebSocket("wss:localhost:3000");

webSocket.onmessage = function(event) {
  //console.log(document.currentScript);
  //console.log(event.data);
  document.location.reload()
};
