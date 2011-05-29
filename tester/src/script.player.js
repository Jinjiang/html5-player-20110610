if (!window.records) {
    window.records = [];
}
var nextIndex = 0;


function init() {
    $('h2').click(function () {
        $(this).parent().toggleClass('collapsed');
    }).mousedown(function (event) {
        event.preventDefault();
    });
    $(window).keydown(keydown);
    $.each(records, function (i, item) {
        $('<li></li>').appendTo('#record-box').
            text(JSON.stringify(item));
    });
}

function keydown(evt) {
    var code = evt.keyCode;

    if (code == 13) {
        evt.preventDefault();
        playAll();
    }
    else if (code >= 48 && code <= 57 ||
            code >= 65 && code <= 90 ||
            code == 32) {
        evt.preventDefault();
        playNext();
    }
}

function playNext() {
    var current = records[nextIndex];

    if (!current) {
        return;
    }

    var type = current.type;
    var result = current.result;
    var path = type + '/' + result + '.mp3';
    
    play(path);
    show({result: result,
            path: path,
            type: type});

    nextIndex++;
}

function playAll() {
    $.each(records, function (i, item) {
        setTimeout(function () {
            play(item.type + '/' + item.result + '.mp3');
        }, item.time);
    });
}

function play(path) {
    var audio = new Audio;
    audio.src = path;
    audio.play();
}

function show(config) {
    $('#current-type').text(config.type);
    $('#current-result').text(config.result);
    $('#current-path').text(config.path);
}

$(init);