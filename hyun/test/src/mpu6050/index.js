const i2c = require('i2c-bus');


const MCP6050_LOW = 0x68;
const MCP6050_HIGH = 0x69;

const ACCEL_XOUT_H = 0x3B;
const ACCEL_XOUT_L = 0x3C;
const ACCEL_YOUT_H = 0x3D;
const ACCEL_YOUT_L = 0x3E;
const ACCEL_ZOUT_H = 0x3F;
const ACCEL_ZOUT_L = 0x40;
const TEMP_OUT_H = 0x41;
const TEMP_OUT_L = 0x42;
const GYRO_XOUT_H = 0x43;
const GYRO_XOUT_L = 0x44;
const GYRO_YOUT_H = 0x45;
const GYRO_YOUT_L = 0x46;
const GYRO_ZOUT_H = 0x47;
const GYRO_ZOUT_L = 0x48;


const RA_PWR_MGMT_1 = 0x6B;
const PWR1_SLEEP_BIT = 6;
const i2c1 = i2c.openSync(1); // c1 사용.
console.log('connect mpu6050');
console.log(i2c1.readByteSync(MCP6050_LOW, RA_PWR_MGMT_1));
i2c1.writeByteSync(MCP6050_LOW, RA_PWR_MGMT_1, 0);
console.log(i2c1.readByteSync(MCP6050_LOW, RA_PWR_MGMT_1));

function getTempOut(){
	const H = i2c1.readByteSync(MCP6050_LOW, TEMP_OUT_H);
	const L = i2c1.readByteSync(MCP6050_LOW, TEMP_OUT_L);

	const buf = Buffer.from([H, L]);
	console.log(buf);
	return buf.readInt16BE()/340 + 36.5;
}

exports.getTempOut = getTempOut;

function receiveTempOut(cb, ms){
	setInterval(()=>{
		return cb(getTempOut());
	}, ms);
}
exports.receiveTempOut = receiveTempOut;

function close(){
	i2c1.closeSync();
}

process.on('exit', ()=>{
	console.log('disconnect mpu6050');
	mpu6050.close();
});
