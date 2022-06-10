var mpu6050 = require('mpu6050');
 
// Instantiate and initialize.
var mpu = new mpu6050();
mpu.initialize();
 
// // Test the connection before using.
// mpu.testConnection(function(err, testPassed) {
//   if (testPassed) {
//     mpu.getMotion6(function(err, data){
//       console.log(data);
//     });
//     // Put the MPU6050 back to sleep.
//     mpu.setSleepEnabled(1);
//   }
// });

const getData = function(err, data){
	console.log("Data: ", err ? err : data);
};


mpu.testConnection((err,testPassed)=>{
	if(testPassed){
		mpu.getRotation(getData);
		mpu.setSleepEnabled(1);
	}else{
		console.log("WTF");
	}
});

mpu.setSleepEnabled(0);
setInterval(()=>{
	// mpu.getMotion6(function(err, data){
	// 	console.log(data);
	// });
	// mpu.getAcceleration(function(err, data){
    //     console.log("accellaration : ", data);
    // })

    mpu.getRotation(getData);
	mpu.setSleepEnabled(1);

/*
	mpu.getAcceleration(function(err, data){
		const b= Buffer.from(data);
		console.log(B);sssssssssssssss
	});
*/
}, 100);