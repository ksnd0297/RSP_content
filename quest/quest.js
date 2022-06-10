var template = require('./lib/template.js');
var lcd = require('./lib/lcd.js');
var url = require('url');
var http = require('http');

var app = http.createServer(function (request, response) {
    console.log("작동 준비 완료");
    var _url = request.url;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        response.writeHead(200);
        response.end(template.html);
    }
    else if (pathname === '/process1') lcd.process1(request,response);
    else if (pathname === '/process2') lcd.process2(request,response);
});
app.listen(3000);
