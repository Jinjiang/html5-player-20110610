var stepMap = {
    1: {name: '低音', keyboard: 'ALT + '},
    2: {name: '正常音', keyboard: ''},
    3: {name: '高音', keyboard: 'SHIFT + '},
    4: {name: '超高音', keyboard: 'CTRL + '}
};
var ws;
var ip;
var name;

function init() {
    if (window.WebSocket) {
        ip = prompt('Please Input Server Address:', 'localhost') || 'localhost';
        ws = new WebSocket('ws://' + ip + ':8080/');
        ws.onopen = function () {
            name = prompt('Please Input Your Name:', 'Jinjiang');
            if (ws && name) {
                ws.send('client:' + name);
            }
        };
        ws.onclose = ws.onerror = function (evt) {
            alert('connection closed');
            console.log(evt);
            ws = null;
        };
        $(window).keydown(keydown);
    }
    else {
        alert('Sorry! Web Socket not supported!');
    }
}

function keydown(evt) {
    var code = evt.keyCode;
    var shift = evt.shiftKey;
    var ctrl = evt.ctrlKey;
    var alt = evt.altKey;
    var key = keyMap[code];
    var step = 2;

    if (key) {
        $('#key-' + key.value).focus();
        if (evt.preventDefault) {
            evt.preventDefault();
        }
        if (shift) {
            step = 3;
        }
        else if (ctrl) {
            step = 4;
        }
        else if (alt) {
            step = 1;
        }
        play(key, step);
    }
}

function play(key, step) {
    var result = key.value + (step - 2) * 12;
    var type = $('#type-select').val();
    var message = type + ':' + result;
    var path = type + '/' + result + '.mp3';

    if (ws && name) {
        console.log(message);
        ws.send(message);
    }
    else {
        var audio = new Audio;
        audio.src = path;
        audio.play();
    }

    showCurrent(key, stepMap[step], message, path);
}

function showCurrent(key, step, message, path) {
    $('#current-key').text(step.keyboard + key.keyboard);
    $('#current-tone').text(step.name + key.name);
    if (ws && name) {
        $('#current-path').text(message);
    }
    else {
        $('#current-path').text(path);
    }
}

$(init);