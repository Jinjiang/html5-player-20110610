var sys = require("sys");
var ws = require('../lib/ws/server');

var server = ws.createServer({debug: true});

var playerMap = {};

server.addListener('connection', function (connection) {

    connection.addListener('message', initMessage);

});

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
        break;
    case 'player':
        playerMap[data.content] = this;
        this.removeListener('message', initMessage);
        this.send('connected:' + this.id);
        break;
    default:
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
        player.send(data.content);
    }
}

