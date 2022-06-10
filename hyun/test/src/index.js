const mpu6050 = require('./mpu6050');

const status = {
	tmp: 0
}
const cb = data=>{
	status.tmp = data;
}

mpu6050.receiveTempOut(cb, 500);

setInterval(()=>console.log(status), 1000);
