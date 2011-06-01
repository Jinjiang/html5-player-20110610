﻿var KEY_CODE_MAP = {
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G',
    72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N',
    79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T',
    85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 186: ';'
};

var TONE_MAP = {
    1: {value: 'a', name: 'C '},
    a: {value: 'b', name: 'C#'},
    2: {value: 'c', name: 'D '},
    b: {value: 'd', name: 'D#'},
    3: {value: 'e', name: 'E '},
    4: {value: 'f', name: 'F '},
    c: {value: 'g', name: 'F#'},
    5: {value: 'h', name: 'G '},
    d: {value: 'i', name: 'G#'},
    6: {value: 'j', name: 'A '},
    e: {value: 'k', name: 'A#'},
    7: {value: 'l', name: 'B '}
};


if (!window.KEY_MAP) {
    KEY_MAP = {
        'A': {step: 4, value: 1},
        'S': {step: 4, value: 2},
        'D': {step: 4, value: 3},
        'F': {step: 4, value: 4},
        'J': {step: 4, value: 5},
        'K': {step: 4, value: 6},
        'L': {step: 4, value: 7}
    };
}


var audioMap = {};




function init() {
    showKeyList();
    $(window).keydown(keydown);
}




function keydown(event) {
    var code = event.keyCode;
    var key = KEY_CODE_MAP[code];
    var item = KEY_MAP[key];
    
    /*function play(value, step) {
        var tone = TONE_MAP[value];
        var path = 'mp3/' + encodeURIComponent(step + tone.value + ' (' + tone.name + ')') + '.mp3';
        var audio = new Audio;
        audio.src = path;
        audio.play();
    }*/

    function play(value, step) {
        var tone = TONE_MAP[value];
        var path = 'mp3/' + encodeURIComponent(step + tone.value + ' (' + tone.name + ')') + '.mp3';
        
        var res = audioMap[step + '_' + value];
        if (!res) {
            res = {list: [], current: 0};
            audioMap[step + '_' + value] = res;
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
    }

    function show(key) {
        location = '#key-' + encodeURIComponent(key);
    }
    
    if (item) {
        event.preventDefault();
        play(item.value, item.step);
        show(key);
    }
}


function showKeyList() {
    var root = $('#key-list');
    
    $.each(KEY_CODE_MAP, function (code, name) {
        var li = $('<li></li>').
                html(name + '<sub></sub>').
                attr('id', 'key-' + name).
                attr('tabindex', 1).
                data('key', name).
                appendTo(root);
    });
    
    $.each(KEY_MAP, function (name, item) {
        var tone = TONE_MAP[item.value];
        if (name == ';') {
            name = '\\;';
        }
        $('#key-' + name).addClass('enabled').
            data('step', item.step).
            data('tone', tone.name).
            data('value', item.value).
            find('sub').text(item.step + tone.name);
    });
}




$(init);



