var codeMap = {};
var appleCache = [];
var nextAppleIndex = 0;
var appleLength = MELODY_CONFIG.length;


function init() {
    if (!window.keyLoaded) {
        initKey();
    
        $.each(KEY_CONFIG, function (index, item) {
            addKey(index, item);
            codeMap[item.code] = item;
        });
    }
    else {
        $.each(KEY_CONFIG, function (index, item) {
            codeMap[item.code] = item;
        });
    }
    
    initMelody();
    initStage();

    $(window).keydown(keydown);
}

function initKey() {
    /*var KEY_ORDER = [
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M',
            '1', '2', '3', '4', '', '6', '7', '', '9', '0'];*/
    var KEY_ORDER = [
            '1', 'Q', 'A', 'Z',
            '2', 'W', 'S', 'X',
            '3', 'E', 'D', 'C',
            '4', 'R', 'F', 'V',
            '5', 'T', 'G', 'B',
            '6', 'Y', 'H', 'N',
            '7', 'U', 'J', 'M',
            '8', 'I', 'K',
            '9', 'O', 'L',
            '0', 'P', ';'];
    
    KEY_CONFIG.sort(function (a, b) {
        return KEY_ORDER.indexOf(a.keyboard) - KEY_ORDER.indexOf(b.keyboard);
    });
}

function initMelody() {
    for (var i = 0; i < 5; i++) {
        next();
    }
}

function initStage() {
    var stage = $('#stage');
    var width = stage.css('float', 'left').width();
    stage.css({'float': 'none', 'width': width + 'px'});
}

function addKey(index, item) {
    var trackRoot = $('#track-list');
    var keyRoot = $('#key-list');
    
    $('<li></li>').appendTo(trackRoot).
            attr('id', 'track-' + item.piano).
            data('value', item.value);
    $('<li></li>').appendTo(keyRoot).
            attr('id', 'key-' + item.code).
            attr('tabindex', index + 1).
            html(item.keyboard + '<sub>' + item.name + '</sub>');
}
    
function keydown(event) {
    var code = event.keyCode;
    var item = codeMap[code];
    
    console.log(1);
    if (window.keyLoaded || item) {
        $('#key-' + item.code).focus();
        play(item.piano);
        next();
    }
}

function play(value) {
    var path = 'piano/' + (value - (-0)) + '.mp3';
    // console.log('PLAY: ' + path);
    var audio = new Audio;
    audio.src = path;
    audio.play();
}

function next() {
    var item = MELODY_CONFIG[nextAppleIndex];
    
    nextAppleIndex++;
    
    if (nextAppleIndex >= appleLength) {
        nextAppleIndex = 0;
    }
    
    if (item) {
        addApple(item);
    }
    
    $('#track-list .apple').each(function (index, apple) {
        apple = $(apple);
        var step = apple.data('step');
        step++;
        if (step > 5) {
            apple.remove();
        }
        else {
            apple.data('step', step).css('top', step * 80 - 90 + 'px');
        }
    });
}

function addApple(item) {
    var track = $('#track-' + item.piano);
    var apple = $('<div class="apple"></div>').data('step', '0');
    track.append(apple);
}


$(init);