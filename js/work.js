/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/

let xValue;
let yValue;
let zValue;
let movementData;
let connection = new WebSocket('ws://localhost:8080', ['soap', 'xmpp']);


function handleMotionEvent(event) {

    let xValue = event.accelerationIncludingGravity.x;
    let yValue = event.accelerationIncludingGravity.y;
    let zValue = event.accelerationIncludingGravity.z;


  document.querySelector(".xdata") .innerText = xValue;
  document.querySelector(".ydata") .innerText = yValue;
    document.querySelector(".zdata") .innerText = zValue;

  movementData = {
    xdata: xValue,
    ydata: yValue,
    zdata: zValue
  }

  connection.send(JSON.stringify(movementData))

}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleMotionEvent);
  document.querySelector("#message").innerText = "support device motion";

}


  // When the connection is open, send some data to the server
  connection.onopen = function () {
  connection.send('ConnectionOpen'); // Send the message 'Ping' to the server
};


// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
  document.querySelector("#message").innerText += " & Server: " + e.data
};
