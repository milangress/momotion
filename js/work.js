/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/

let xValue;
let yValue;
let zValue;
let movementData;
var websocket;
let count;
let recordInterval;
let recoding = false;
let movementTypes = ["soft", "hard", "fast", "slow", "fluently", "interrupted"]

writeToScreen("js ready");

function selectMovementTypes() {
  let movementTypesDisplay = document.querySelector("#type");
  let randomselect = Math.floor(Math.random() * movementTypes.length);
  movementTypesDisplay.innerHTML = movementTypes[randomselect];
}
selectMovementTypes();

function recordMotion() {

  websocket.send(JSON.stringify(movementData))
  if (count > 500) {
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
      websocket.send("START recording")
      websocket.send(movementTypes)
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


  document.querySelector(".xdata").innerText = xValue;
  document.querySelector(".ydata").innerText = yValue;
  document.querySelector(".zdata").innerText = zValue;

  movementData = {
      xdata: xValue,
      ydata: yValue,
      zdata: zValue
    }
    //  writeToScreen(JSON.stringify(movementData));


}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleMotionEvent);
  writeToScreen("support device motion");

}

websocket = new WebSocket("ws://milan.local:8080");



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
