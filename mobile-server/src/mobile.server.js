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
                if (status == 1) {
                    return;
                }
                if (value == 1) {
                    play('drum', 1);
                }
                else if (value = 2) {
                    play('drum', 2);
                }
            }
            else if (type == 'cymbals') {
                if (status == 1) {
                    return;
                }
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




var audioList;
var status = 0;
var rate = 300;

function init() {
    audioList = $('audio');
}

function start() {
    rate = ($('input').val() - 0) || 300;
    status = 1;
    setTimeout(play8, 0 * rate);
    setTimeout(play9, 2 * rate);
    setTimeout(play10, 4 * rate);
    setTimeout(play11, 6 * rate);
    setTimeout(loop, 8 * rate);
}
function end() {
    status = 0;
}
function loop() {
    setTimeout(play4, 0 * rate);
    setTimeout(play5, 1.5 * rate);
    setTimeout(play0, 2 * rate);
    setTimeout(play6, 3 * rate);
    setTimeout(play7, 5 * rate);
    setTimeout(play1, 6 * rate);

    setTimeout(play12, 1 * rate + 50);
    setTimeout(play13, 2 * rate + 50);
    setTimeout(play14, 3 * rate + 50);
    setTimeout(play15, 4 * rate + 50);
    setTimeout(play16, 5 * rate + 50);
    setTimeout(play17, 6 * rate + 50);
    setTimeout(play18, 7 * rate + 50);
    setTimeout(play19, 8 * rate + 50);

    setTimeout(function () {
        if (status == 1) {
            loop();
        }
    }, 8 * rate);
}
function _play(offset) {
    if (ws && ws.readyState == 1) {
        if (offset < 12) {
            ws.send('drum:1');
        }
        else {
            ws.send('cymbals:1');
        }
    }
    if (audioList) {
        audioList[offset].play();
    }
}
function play0() {_play(0);}
function play1() {_play(1);}
function play2() {_play(2);}
function play3() {_play(3);}
function play4() {_play(4);}
function play5() {_play(5);}
function play6() {_play(6);}
function play7() {_play(7);}
function play8() {_play(8);}
function play9() {_play(9);}
function play10() {_play(10);}
function play11() {_play(11);}
function play12() {_play(12);}
function play13() {_play(13);}
function play14() {_play(14);}
function play15() {_play(15);}
function play16() {_play(16);}
function play17() {_play(17);}
function play18() {_play(18);}
function play19() {_play(19);}




$(init);




