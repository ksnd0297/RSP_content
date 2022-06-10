const Gpio = require('onoff').Gpio;

const vibration  = new Gpio(19, 'out');

let flag = true;
function toggle(){
	console.log('flag',flag);
	vibration.writeSync(flag*1);
	flag = !flag;
}
function on(){
	vibration.writeSync(1);
}

function off(){
	vibration.writeSync(0);
}

const p = (s, e)=>{
	sec.push(s);
	sec.push(e);
}
let sec = [];
secIdx = 0;

// === sing ===
p(1000, 500);
p(1000, 500);
p(1000, 100);
p(1000, 100);
p(1000, 500);
// ============

const Run = () => {
	if(secIdx == sec.length) return;
	console.log(sec[secIdx])
	if(secIdx & 1){
		console.log('off');
		off();
	}else{
		console.log('on');
		on();
	}
	setTimeout(()=> Run() , sec[secIdx++]);
}
setTimeout(()=>{
	Run();
},0);
	
