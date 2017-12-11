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
let movementTypes = ["soft", "hard", "fast", "slow", "fluently", "interrupted"]
let randomselect = Math.floor(Math.random() * movementTypes.length);

writeToScreen("javascript ready");

function selectMovementTypes() {
  let movementTypesDisplay = document.querySelector("#type");
  movementTypesDisplay.innerHTML = movementTypes[randomselect];
}
selectMovementTypes();

function recordMotion() {

  websocket.send(JSON.stringify(movementData) + ',')
  if (count > 300) {
    websocket.send("]}");
    websocket.send("END");
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
      websocket.send("START")
      websocket.send("{")
//      let mtString = '"movementType": ' + movementTypes[randomselect] + ',';
//      websocket.send(mtString);
      websocket.send('"' + movementTypes[randomselect] + '": [')
      writeToScreen("START recording")
      recordInterval = setInterval(recordMotion, 10);
    }, 3800);
  } else {
    writeToScreen("no websocket open");
  }
}


function handleMotionEvent(event) {

  let xValue = event.acceleration.x;
  let yValue = event.acceleration.y;
  let zValue = event.acceleration.z;
  let timestamp = Date.now();


  document.querySelector(".xdata").innerText = xValue;
  document.querySelector(".ydata").innerText = yValue;
  document.querySelector(".zdata").innerText = zValue;

  movementData = {
      x: xValue,
      y: yValue,
      z: zValue,
      t: timestamp
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
  websocket.send('ConnectionOpen'); // Send the message 'Ping' to the server
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
