/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const fs = require('fs');
const stream = fs.createWriteStream("motion data.txt");

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    stream.write(message + "\n");
  });

  ws.send('ServerReady');
});


//stream.once('open', (fd) => {
//    stream.write("First line\n");
//    stream.write("Second line\n");
//
//    // Important to close the stream when you're ready
//    stream.end();
//});
