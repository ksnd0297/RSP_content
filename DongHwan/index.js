var gyro = require("mpu6050-gyro");
 
var address = 0x68; //MPU6050 address
var bus = 1; //i2c bus used
 
var gyro = new gyro( bus,address );
 
async function update_telemetry() {
    
    var gyro_xyz = gyro.get_gyro_xyz();
    var accel_xyz = gyro.get_accel_xyz();
    
	var x = accel_xyz.x + 3000 - 600;
	var y = accel_xyz.y - 3000 + 800;
	var z=  accel_xyz.z - 13000 - 1200;

    console.log(x, y, z);
    
    setTimeout(update_telemetry, 100);
}
 
if ( gyro ) {
    update_telemetry();
}