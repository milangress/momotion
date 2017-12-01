/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/


const fs = require('fs');
const stream = fs.createWriteStream("motion data.txt");

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//const WebSocket = require('ws');
//const wsPort = process.env.PORT || 8080
//const wss = new WebSocket.Server({ express });
//({ 
//  port: wsPort 
//});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//wss.on('connection', function connection(ws) {
//  ws.on('message', function incoming(message) {
//    console.log('received: %s', message);
//    stream.write(message + "\n");
//  });
//
//  ws.send('ServerReady');
//});


//stream.once('open', (fd) => {
//    stream.write("First line\n");
//    stream.write("Second line\n");
//
//    // Important to close the stream when you're ready
//    stream.end();
//});
