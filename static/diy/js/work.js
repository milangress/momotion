/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/

//let gn = new GyroNorm();
const wsAdress = location.origin.replace(/^http/, 'ws');

let xValue;
let yValue;
let zValue;
let movementData;
var websocket;
let count;
let recordInterval;
let recoding = false;

const recordingModel = true;

let movementTypes = ["soft", "hard", "sustained", "sudden", "strong", "light"]



writeToScreen("javascript ready");

function selectMovementTypes() {

  let movementTypesDisplay = document.querySelector("#type");
  if (recordingModel) {
  movementTypes = movementTypes[0]
  } else {
  let randomselect = Math.floor(Math.random() * movementTypes.length);
  movementTypes = movementTypes[randomselect];
  }
  movementTypesDisplay.innerHTML = movementTypes;

}
selectMovementTypes();

function recordMotion() {

  websocket.send(JSON.stringify(movementData))
  if (count > 3000) {
//    websocket.send("]}");
    websocket.send(declareMSG("END"));
    writeToScreen("END recording")
//    websocket.close();
    clearInterval(recordInterval);
    recoding = false;
  }
  count += 1;
}



function startRecordingMotion() {
  if (websocket.readyState == 1 && !recoding) {
    recoding = true;
    count = 0;
    var audio = new Audio('res/start-beeps.wav');
    audio.play();
    setTimeout(function () {
//      websocket.send("START")
//      websocket.send("{")
//      let mtString = '"movementType": ' + movementTypes[randomselect] + ',';
//      websocket.send(mtString);
      websocket.send(declareMSG(movementTypes, 'moveType'));
      writeToScreen("START recording")
      recordInterval = setInterval(recordMotion, 10);
    }, 3800);
  } else {
    writeToScreen("no websocket open");
  }
}

function declareMSG(msg, type = "console") {
  let sendMessage = {
    type: type,
    msg: msg,
  }
  return JSON.stringify(sendMessage);
}


function handleMotionEvent(event) {

  let xValue = event.acceleration.x.toFixed(3);
  let yValue = event.acceleration.y.toFixed(3);
  let zValue = event.acceleration.z.toFixed(3);
  let timestamp = Date.now();


  document.querySelector(".xdata").innerText = xValue;
  document.querySelector(".ydata").innerText = yValue;
  document.querySelector(".zdata").innerText = zValue;

  movementData = {
      type: "movementData",
      "msg": {
        x: xValue,
        y: yValue,
        z: zValue,
        t: timestamp
      }
    }
    //  writeToScreen(JSON.stringify(movementData));


}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleMotionEvent);
  writeToScreen("support device motion");

}

websocket = new WebSocket(wsAdress);



// When the connection is open, send some data to the server
websocket.onopen = function () {
  websocket.send(declareMSG("ConnectionOpen")); // Send the message 'Ping' to the server
};


// Log errors
websocket.onerror = function (error) {
  writeToScreen('WebSocket Error ' + error);
};

// Log messages from the server
websocket.onmessage = function (e) {
  console.log('Server: ' + e.data);
  writeToScreen(e.data);
};



function writeToScreen(message) {
  var output = document.getElementById("message");
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}
