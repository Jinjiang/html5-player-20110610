function init() {
    $('h2').click(function () {
        // $(this).parent().toggleClass('collapsed');
    }).mousedown(function (event) {
        event.preventDefault();
    });
    
    initPiano();
    initKeyboard();
}

function initPiano() {
    var root = $('#piano-map');
    var list = root.find('> li');
    var blackList = root.find('> li.black-key');

    list.each(function (index, li) {
        li = $(li);
        var value = li.data('value');
        var name = li.data('name');
        li.attr('title', name).text(name);
        li.click(function () {
            setCurrentPiano(value, name);
        }).mousedown(function (event) {
            event.preventDefault();
        });
    });

    var BLACK_OFFSET_TOP_MAP = {
        2: 0.5,
        4: 1.5,
        7: 3.5,
        9: 4.5,
        11: 5.5
    };

    blackList.each(function (index, li) {
        li = $(li);
        var value = li.data('value');
        var step = parseInt(value / 12);
        var offset = BLACK_OFFSET_TOP_MAP[value % 12] || 0;
        li.css('top', (step * 7 + offset) * 40 + 'px');
    });
}

function setCurrentPiano(value, name) {
    $('#keyboard-map').
            find('.current').data('piano', value).data('name', name).
            find('.piano-key').val(name);
}




function initKeyboard() {
    $('#btn-add').click(addKey);
    $('#btn-export').click(exportData);
}

function addKey() {
    var root = $('#keyboard-map');
    root.find('.current').removeClass('current');
    var li = $('<li class="current"><button>X</button> <input class="keyboard-key" /> =&gt; ' +
            '<input class="piano-key" disabled="disabled" /></li>').
            appendTo(root);

    li.find('button').click(removeKey);
    li.find('.keyboard-key').keydown(changeKey).focus();
    li.click(function () {
        root.find('.current').removeClass('current');
        li.addClass('current');
    });
}

function removeKey(event) {
    var li = $(this).parent();
    li.remove();
}

function changeKey(event) {
    var input = $(this);
    var li = input.parent();
    var code = event.keyCode;
    
    var KEY_CODE_MAP = {
        65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G',
        72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N',
        79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T',
        85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',
        48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
        53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 186: ';'
    };
    
    var name = KEY_CODE_MAP[code];
    if (name) {
        li.data('keyboard', name);
        li.data('code', code);
        input.val(name);
    }

    event.preventDefault();
}

function exportData() {
    var root = $('#keyboard-map');
    var list = root.find('> li');
    var output = [];

    list.each(function (index, li) {
        li = $(li);

        var piano = li.data('piano');
        var keyboard = li.data('keyboard');
        var code = li.data('code');
        var name = li.data('name');
        
        if (piano && keyboard && code) {
            output.push({piano: piano, name: name, keyboard: keyboard, code: code});
        }
    });
    
    output.sort(function (a, b) {
        return a.code - b.code;
    });
    
    /*$.each(output, function (index, item) {
        console.log(item.keyboard + ' => ' + item.name, item.code + ' => ' + item.piano);
    });*/
    
    location = 'data:plain/text,' + encodeURI('var KEY_CONFIG = ' + JSON.stringify(output) + ';');
}


$(init);