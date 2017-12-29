/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/


const fs = require('fs');

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();


app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(__dirname + '/public'));


var server = app.listen(PORT, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

let writing = 0




wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  ipPath = ip.replace(/:/g, '');
  ws.on('message', function incoming(message) {
//    var logStream = fs.createWriteStream('public/mo_data_' + ipPath + '.json', {'flags': 'a'});

    waitForData(message);


//    logStream.write(writeMsg);

  });

  ws.send('ServerReady');
});

async function waitForData (message) {

  try {
    let parsedData = await createObjectFromWS(message);
    console.log(`parsed data: ${message}`)
    await writeDataToFile(parsedData);
    console.log(`written data: ${parsedData}`)
  }

  catch(e) {
    console.err(e);
  }
};


let movementObject = {};


function createObjectFromWS(wsMsg) {

      return new Promise((resolve, reject) => {

      wsMsg = JSON.parse(wsMsg);

      if (wsMsg.type === 'console') {
        console.log(wsMsg.msg)
        if (wsMsg.msg === 'END') {
          console.log(`if end detected`);
          resolve(movementObject);
        }
      }

      if (wsMsg.type === 'moveType') {
        movementObject.movementType = wsMsg.msg;
        movementObject.data = []
      }
      if (wsMsg.type === 'movementData') {
        //    console.log(`raw: ${wsMsg}`)
        //    console.log(`mD: ${wsMsg.msg}`)
        movementObject.data.push(wsMsg.msg);
      }
    }
)};


//remove double entrys in arrays
const onlyUnique = function(arr) {
  return [...new Set(arr)];
}

//
const makeTimeRelative = function(arr) {

}

const writeDataToFile = function(data) {

//      writeMsg.data = onlyUnique(writeMsg.data);

//      let jsonPath = 'public/mo_data_' + ipPath + '.json'
      let jsonPath = 'public/mo_data_123.json'
      console.log(`written to ${jsonPath}`)
      fs.writeFile(jsonPath, JSON.stringify(data, null, 2) , 'utf-8');

}



//stream.once('open', (fd) => {
//    stream.write("First line\n");
//    stream.write("Second line\n");
//
//    // Important to close the stream when you're ready
//    stream.end();
//});
