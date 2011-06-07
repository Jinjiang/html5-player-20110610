var ws;
var ws2;
var host = '192.168.1.56'; // 'localhost';
var host2 = 'localhost';
var audioMap = {};

if (window.WebSocket) {

    ws = new WebSocket('ws://' + host + ':8080/');
    ws.onopen = function () {
        ws.send('client:mobile');
    };

    ws2 = new WebSocket('ws://' + host2 + ':8080/');

    function play(type, value) {
        var path = 'mp3/' + type + value + '.mp3';
        var res = audioMap[type + '_' + value];

        if (!res) {
            res = {list: [], current: 0};
            audioMap[type + '_' + value] = res;
        }
        if (res.list.length < 8) {
            res.current = res.list.length;
            var audio = new Audio;
            audio.src = path;
            res.list.push(audio);
        }
        else {
            res.current++;
            if (res.current >= 8) {
                res.current = 0;
            }
        }
        res.list[res.current].play();
        
        if (ws && ws.readyState == 1) {
            ws.send(type + ':1');
        }
    }

    ws2.onopen = function () {
        ws2.send('player:mobile');
    };
    ws2.onmessage = function (evt) {
        var data = evt.data.match(/(\w+)\:(\w+)/);

        if (data) {
            var type = data[1];
            var value = data[2];
            if (type == 'drum') {
                if (value == 1) {
                    play('drum', 1);
                }
                else if (value = 2) {
                    play('drum', 2);
                }
            }
            else if (type == 'cymbals') {
                play('cymbals', 1);
            }
            else if (type == 'loop') {
                if (value == 1) {
                    start();
                }
                else if (value == 0) {
                    end();
                }
            }
        }
    };
}