var sys = require('sys');
var spawn = require('child_process').spawn;
var mon = spawn("iostat",["-I","3"]);
sys.puts("starting");

mon.stdout.on('data',function(data) {
    sys.puts(data);
});

var http = require("http");
http.createServer(function(req,res){
    res.sendHeader(200,{"Content-Type": "text/plain"});
    mon.stdout.on('data',function(data) {
        res.sendBody(data);
    });
}).listen(8001);
