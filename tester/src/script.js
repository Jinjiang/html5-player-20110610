var keyMap = {
    65: {value: 1, name: 'Do', keyboard: 'A'},
    87: {value: 2, name: 'Du', keyboard: 'W'},
    83: {value: 3, name: 'Re', keyboard: 'S'},
    69: {value: 4, name: 'Me', keyboard: 'E'},
    68: {value: 5, name: 'Mi', keyboard: 'D'},
    70: {value: 6, name: 'Fa', keyboard: 'F'},
    84: {value: 7, name: 'Fi', keyboard: 'T'},
    71: {value: 8, name: 'So', keyboard: 'G'},
    89: {value: 9, name: 'Su', keyboard: 'Y'},
    72: {value: 10, name: 'La', keyboard: 'H'},
    85: {value: 11, name: 'Ti', keyboard: 'U'},
    74: {value: 12, name: 'Si', keyboard: 'J'}
};
var stepMap = {
    1: {name: '低音', keyboard: 'ALT + '},
    2: {name: '正常音', keyboard: ''},
    3: {name: '高音', keyboard: 'SHIFT + '},
    4: {name: '超高音', keyboard: 'CTRL + '}
};

function init() {
    $(window).keydown(keydown);
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
        evt.preventDefault();
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
    var result = key.value + (step - 1) * 12;
    var type = $('#type-select').val();
    var path = type + '/' + result + '.mp3';

    var audio = new Audio;
    audio.src = path;
    audio.play();

    showCurrent(key, stepMap[step], path);
}

function showCurrent(key, step, path) {
    $('#current-key').text(step.keyboard + key.keyboard);
    $('#current-tone').text(step.name + key.name);
    $('#current-path').text(path);
}

$(init);