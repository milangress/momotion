/*jshint esversion: 6 */
/*jshint asi: true */
/*jshint browser: true*/


function handleMotionEvent(event) {

    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;


  document.querySelector(".xdata") .innerText = x;
  document.querySelector(".ydata") .innerText = y;
    document.querySelector(".zdata") .innerText = z;
}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', handleMotionEvent);
  document.querySelector("#message").innerText = "support device motion";

}
