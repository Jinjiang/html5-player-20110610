var audioMap = {};

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




