var sys = require("sys");
var ws = require('../lib/ws/server');
 
var server = ws.createServer({debug: true});
 
// Handle WebSocket Requests
server.addListener("connection", function (conn) {
    conn.send("Connection: " + conn.id);
    
    conn.addListener("message", function (message) {
        conn.broadcast("<" + conn.id + "> " + message);
        console.log('haha');
        
        if (message == "error") {
            conn.emit("error", "test");
        }
    });
});
 
server.addListener("error", function () {
    console.log(Array.prototype.join.call(arguments, ", "));
});
 
server.addListener("disconnected", function (conn) {
    server.broadcast("<" + conn.id + "> disconnected");
});
 
server.listen(8000);