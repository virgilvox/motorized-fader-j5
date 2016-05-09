```js
var five = require("johnny-five");
var board = new five.Board();
var Fader = require("./motorized-fader")(five);

board.on("ready", function() {
  motor = new five.Motor({
   pins: {
     pwm: 10,
     dir: 8,
     cdir: 9
   }
 });
 
 var fader = new Fader({"position_pin": "A0", "motor": motor});
 
 fader.to(0);
 
 fader.to(180);
 
 fader.stop();
 
});
```
