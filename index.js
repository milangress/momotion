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
    let dataObject = await createObjectFromWS(message);

//    console.log(`parse data: ${JSON.stringify(dataObject)}`)
    await parseData(dataObject);

  }

  catch(e) {
    console.log(e);
  }
};


let movementObject = {};


function createObjectFromWS(wsMsg) {

      return new Promise((resolve, reject) => {

      wsMsg = JSON.parse(wsMsg);

      if (wsMsg.type === 'console') {
        console.log(wsMsg.msg)
        if (wsMsg.msg === 'END') {
          console.log(`resolved promise`);
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

const parseData = function(obj) {
//  const removedDuplicates = onlyUnique(obj);

  obj.data = onlyUnique(obj.data)

  const relativeTime = makeTimeRelative(obj);

  writeDataToFile(relativeTime);

}


//remove double entrys in arrays
const onlyUnique = function(arr) {
  console.log('onlyUnique Function');
  return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
}

//
const makeTimeRelative = function (obj) {
  console.log('makeTimeRelative Function');
  const initialTime = obj.data[0].t
  for (let data of obj.data) {
    data.t = data.t - initialTime +1;
  }
  return obj;

}

const splitArray = function(arr, startVal, endVal) {

  if (startVal === !0) {
  let startPos = arr.findIndex(array => {
    return array.t === startVal
  });
  } else {
    let startPos = 0;
  }

  let endPos = arr.findIndex(array => {
    return array.t === endVal;
  });
  return arr.splice(startPos, endPos);
}

const writeDataToFile = function(data) {

//      writeMsg.data = onlyUnique(writeMsg.data);

//      let jsonPath = 'public/mo_data_' + ipPath + '.json'
      let jsonPath = 'public/mo_data_123.json'
      console.log(`written to ${jsonPath}`)
      fs.appendFileSync(jsonPath, JSON.stringify(data, null, 2) , 'utf-8');

}



//stream.once('open', (fd) => {
//    stream.write("First line\n");
//    stream.write("Second line\n");
//
//    // Important to close the stream when you're ready
//    stream.end();
//});
