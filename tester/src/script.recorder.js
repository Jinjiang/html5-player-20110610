var KEY_MAP = {
    49: {value: 23, name: 'la#', level: 1, keyboard: '1'},
    51: {value: 26, name: 'do#', level: 2, keyboard: '3'},
    52: {value: 28, name: 're#', level: 2, keyboard: '4'},
    54: {value: 31, name: 'fa#', level: 2, keyboard: '6'},
    55: {value: 33, name: 'so#', level: 2, keyboard: '7'},
    56: {value: 35, name: 'la#', level: 2, keyboard: '8'},
    48: {value: 38, name: 'do#', level: 3, keyboard: '0'},
    
    81: {value: 24, name: 'si', level: 1, keyboard: 'Q'},
    87: {value: 25, name: 'do', level: 2, keyboard: 'W'},
    69: {value: 27, name: 're', level: 2, keyboard: 'E'},
    82: {value: 29, name: 'mi', level: 2, keyboard: 'R'},
    84: {value: 30, name: 'fa', level: 2, keyboard: 'T'},
    89: {value: 32, name: 'so', level: 2, keyboard: 'Y'},
    85: {value: 34, name: 'la', level: 2, keyboard: 'U'},
    73: {value: 36, name: 'si', level: 2, keyboard: 'I'},
    79: {value: 37, name: 'do', level: 3, keyboard: 'O'},
    80: {value: 39, name: 're', level: 3, keyboard: 'P'},
    
    65: {value: 11, name: 'la#', level: 0, keyboard: 'A'},
    68: {value: 14, name: 'do#', level: 1, keyboard: 'D'},
    70: {value: 16, name: 're#', level: 1, keyboard: 'F'},
    72: {value: 19, name: 'fa#', level: 1, keyboard: 'H'},
    74: {value: 21, name: 'so#', level: 1, keyboard: 'J'},
    75: {value: 23, name: 'la#', level: 1, keyboard: 'K'},
    186: {value: 26, name: 'do#', level: 2, keyboard: ';'},
    
    90: {value: 12, name: 'si', level: 0, keyboard: 'Z'},
    88: {value: 13, name: 'do', level: 1, keyboard: 'X'},
    67: {value: 15, name: 're', level: 1, keyboard: 'C'},
    86: {value: 17, name: 'mi', level: 1, keyboard: 'V'},
    66: {value: 18, name: 'fa', level: 1, keyboard: 'B'},
    78: {value: 20, name: 'so', level: 1, keyboard: 'N'},
    77: {value: 22, name: 'la', level: 1, keyboard: 'M'},
    188: {value: 24, name: 'si', level: 1, keyboard: ','},
    190: {value: 25, name: 'do', level: 2, keyboard: '.'},
    191: {value: 27, name: 're', level: 2, keyboard: '/'}
};

var BASE_MAP = {
    189: {step: 1, name: '+8', keyboard: '-'},
    219: {step: 0, name: 'reset', keyboard: '['},
    222: {step: -1, name: '-8', keyboard: '\''}
};

var MIN_VALUE = -48;
var MAX_VALUE = 96;

var baseLevel = 0;
var baseTimestamp;


function init() {
    $('h2').click(function () {
        $(this).parent().toggleClass('collapsed');
    }).mousedown(function (event) {
        event.preventDefault();
    });
    $(window).keydown(keydown);
    $('#link-download').
            mouseover(updateDownloadLink).
            click(function (event) {
                event.stopPropagation();
            });
}

function keydown(evt) {
    var code = evt.keyCode;
    var shift = evt.shiftKey;
    var ctrl = evt.ctrlKey;
    var alt = evt.altKey;

    var key = KEY_MAP[code];
    var base = BASE_MAP[code];


    if (key) {
        evt.preventDefault();

        $('#key-' + key.keyboard).focus();
        
        var currentLevel = 0;
        if (shift) {
            currentLevel--;
        }
        else if (ctrl) {
            currentLevel++;
        }

        var extraLevel = baseLevel + currentLevel;
        var level = key.level + extraLevel;
        var result = key.value + extraLevel * 12;
        
        if (result > MAX_VALUE) {
            result = MAX_VALUE;
        }
        else if (result < MIN_VALUE) {
            result = MIN_VALUE;
        }
        
        var type = $('#type-select').val();
        var path = type + '/' + result + '.mp3';
        
        play(path);
        record(type, result);
        show({name: key.name,
                value: key.value,
                keyboard: key.keyboard,
                result: result,
                path: path,
                type: type,
                level: level,
                base: baseLevel,
                current: currentLevel});
    }
    
    if (base) {
        evt.preventDefault();

        if (base.step == 0) {
            baseLevel = 0;
        }
        else if (base.step == 1) {
            baseLevel++;
        }
        else if (base.step == -1) {
            baseLevel--;
        }
        show({base: baseLevel});
    }
}

function play(path) {
    var audio = new Audio;
    audio.src = path;
    audio.play();
}

function show(config) {
    if (!config.name) {
        $('#base-step').text(config.base);
        return;
    }

    var finalFunc = '';
    var finalKey = config.name + '(' + config.keyboard + ')';
    if (config.current == 1) {
        finalFunc = ' + 8(CTRL)'; // "`" -> 192
    }
    else if (config.current == -1) {
        finalFunc = ' - 8(SHIFT)';
    }

    $('#base-step').text(config.base);
    $('#current-key').text(finalKey + finalFunc);
    $('#current-step').text(config.level);
    $('#current-tone').text(config.type + ' -> ' + config.name + '*' + config.level);
    $('#current-path').text(config.path);
}

function record(type, result) {
    var text = '';
    var time = 0;

    if (!baseTimestamp) {
        baseTimestamp = (new Date).valueOf();
        text = '{type: "' + type + '", result: ' + result + ', time: 0},';
    }
    else {
        time = (new Date).valueOf() - baseTimestamp;
        text = '{type: "' + type + '", result: ' + result + ', time: ' + time + '},';
    }

    $('<li></li>').appendTo('#record-box').
        text(text).focus();
    $('#link-download').css('display', 'inline');
}

function updateDownloadLink() {
    var output = $.trim($('#record-box').text());
    var length = output.length;
    
    output = 'var records=[' + output.substr(0, length - 1) + '];';
    $('#link-download').attr('href', 'data:plain/text,' + encodeURI(output));
}

$(init);