module.exports = function(five) {
  var position = 0.00;

  return (function() {

    function Fader(opts) {
      if (!(this instanceof Fader)) {
        return new Fader(opts);
      }

      five.Board.Component.call(
        this, opts = five.Board.Options(opts)
      );

      var pin = new five.Pin(opts.position_pin);

      five.Pin.read(pin, function(error, value) {
        if(position != "STOP"){
          var mapped = five.Board.map(value, 0, 1023, 0, 180);
          var val = five.Board.constrain(mapped, 0, 180);
          console.log(val, position);
          var diff = val - position;
          var speed = 240;

          if(position > 50){
            speed = 220;
          }
          if(diff < -2.00){
            opts.motor.forward(speed);
          }else if(diff > 2.00){
            opts.motor.reverse(speed);
          }
          if(diff >= -2.00 && diff <= 2.00 || val == position){
            opts.motor.brake();
            // if(nextPosition <= 180 && nextPosition >= 0){
            //   position = nextPosition;
            //   nextPosition = -1;
            // }
          }
        }else {
          opts.motor.brake();
        }
      });
    }

    Fader.prototype.to = function(val) {
      position = val;
    };

    Fader.prototype.stop = function(val) {
      position = "STOP";
    };

    return Fader;
  }());
};
