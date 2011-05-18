var sys = require("sys");
var ws = require('./lib/ws/server');

var server = ws.createServer({debug: false});

var playerMap = {};

server.addListener('connection', function (connection) {

    console.log('CONNECTED:     ' + connection.id);
    connection.addListener('message', initMessage);

});

server.listen(8080);

function parseMessage(data) {
    var result;

    data = data.match(/(\w+)\:(\w+)/);

    if (data) {
        result = {};
        result.message = data[0];
        result.type = data[1];
        result.content = data[2];
    }
    
    return result;
}

function initMessage(data) {
    data = parseMessage(data);

    if (!data || !data.type) {
        return;
    }

    switch (data.type) {
    case 'client':
        this.addListener('message', clientMessage);
        this.removeListener('message', initMessage);
        this.send('connected:' + this.id);
        console.log('ADDED CLIENT:  ' + data.content, this.id);
        break;
    case 'player':
        playerMap[data.content] = this;
        this.removeListener('message', initMessage);
        this.send('connected:' + this.id);
        console.log('ADDED PLAYER:  ' + data.content, this.id);
        break;
    default:
    console.log('REJECT:        ' + data.type, data.content);
        this.reject('not an acceptable request');
    }
}

function clientMessage(data) {
    data = parseMessage(data);

    if (!data || !data.type) {
        return;
    }

    var player = playerMap[data.type];
    if (player) {
        console.log('PLAY:          ' + data.type, data.content);
        player.send(data.content);
    }
}

