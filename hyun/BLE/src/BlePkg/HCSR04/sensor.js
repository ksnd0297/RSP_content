const Gpio = require('pigpio').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(17, {mode: Gpio.OUTPUT});
const echo = new Gpio(18, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

let startTick;
let resultHandler = null;

const alertCB = (level, tick) => {
  if (level == 1) {
    startTick = tick;
  } else {
    const endTick = tick;
    const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic

    const result = diff / 2 / MICROSECDONDS_PER_CM;
    resultHandler && resultHandler(result);
    // console.log(diff / 2 / MICROSECDONDS_PER_CM);
  }
}

exports.getSignal = () => {
  trigger.trigger(10, 1);
}
exports.watchHCSR04 = (cb)=>{
  resultHandler = cb;
  echo.on('alert', alertCB);
}
exports.unWatchHCSR04 = ()=>{
  resultHandler = null;
  echo.removeListener('alert', alertCB);
}
