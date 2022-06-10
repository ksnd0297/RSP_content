const mpu6050 = require('mpu6050');

const mpu = new mpu6050();
mpu.initialize();

mpu.testConnection(function(err, testPassed){
	if(testPassed){
		mpu.getMotion6(function(err, data){
			console.log(data);
		});
		mpu.setSleepEnabled(1);
	}
});

return;
const i2c = require('i2c-bus');

const ADDR = 0x68;
const TEMP_H = 0x41;
const TEMP_L = 0x42;

const i2c1 = i2c.openSync(1);
const H = i2c1.readWordSync(ADDR, TEMP_H);
const L = i2c1.readWordSync(ADDR, TEMP_L);

console.log(H, L);
i2c1.closeSync();
