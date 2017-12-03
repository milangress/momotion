/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/


const fs = require('fs');
const stream = fs.createWriteStream("public/motion_data.txt");

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

//var htmlPath = path.join(__dirname, 'html');
app.use(express.static(path.join(__dirname, 'static')));


var server = app.listen(PORT, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });



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
