var db = require('./db.js');
var LCD = require('raspberrypi-liquid-crystal');
var lcd = new LCD(1, 0x3f, 16, 2);
var sensor = require('node-dht-sensor');
var qs = require('querystring');
const moment = require('moment');
var template = require('./template.js');

lcd.beginSync();

exports.process1 = function (request, response) {
    var body = '';
    request.on('data', function (data) { body += data; });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`SELECT * FROM date WHERE whe='${post.date}'`, function (error, date) {
	    if(date.length == 0) {
		var script = `<script>alert("error");</script>`
		response.writeHead(200);
            	response.end(template.alert);		
	    }
	    else {
            lcd.clearSync();
            lcd.printLineSync(0, date[0].whe);
            lcd.printLineSync(1, date[0].Temper + "'C " + date[0].humi + '%');
            response.writeHead(302, { Location: `/` });
            response.end();
	    }
        });
    });
}

exports.process2 = function (request, response) {
    sensor.read(11, 21, function (err, temperature, humidity) {
        if (err) throw error;
        const _DATE_ = moment().utc(9).format('YYYY-MM-DD');
        var now = new Date();
        var year = now.getFullYear(); var month = now.getMonth() + 1; var date = now.getDate();
        lcd.clearSync();
        lcd.printLineSync(0, `${year}Y ${month}M ${date}D`);
        lcd.printLineSync(1, `${temperature}'C ${humidity}%`);
        console.log(_DATE_);
        db.query(`INSERT INTO date(whe,Temper,humi) VALUES('${_DATE_}','${temperature}','${humidity}') 
            ON DUPLICATE KEY UPDATE Temper=VALUES(Temper), humi=VALUES(humi)`, function (error, date) {
            if (error) throw error;
        });

    });
    response.writeHead(302, { Location: `/` });
    response.end();
}