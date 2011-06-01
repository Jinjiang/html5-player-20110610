var type = 'piano';

if (window.WebSocket) {
    var host2 = 'localhost';
    var ws2 = new WebSocket('ws://' + host2 + ':8080/');

    function play(type, value) {
        var path = 'other/' + type + value + '.mp3';
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
            if (res.current >= 4) {
                res.current = 0;
            }
        }
        res.list[res.current].play();
        
        if (ws && ws.send) {
            ws.send(type + ':1');
        }
    }

    ws2.onopen = function () {
        ws2.send('player:piano');
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
        }
    };
}