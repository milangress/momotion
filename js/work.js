/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/


function handleMotionEvent(event) {

    let x = event.accelerationIncludingGravity.x;
    let y = event.accelerationIncludingGravity.y;
    let z = event.accelerationIncludingGravity.z;


  document.querySelector(".xdata") .innerText = x;
  document.querySelector(".ydata") .innerText = y;
    document.querySelector(".zdata") .innerText = z;
}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleMotionEvent);
  document.querySelector("#message").innerText = "support device motion";

}


let connection = new WebSocket('ws://localhost:8080', ['soap', 'xmpp']);
// When the connection is open, send some data to the server
connection.onopen = function () {
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};
