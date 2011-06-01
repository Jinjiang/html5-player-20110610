var KEY_CODE_MAP = {
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




function init() {
    initDialog();
    $('#btn-export').click(exportConfig);
    showKeyList();
}




function initDialog() {
    var dialog = $('#key-config');
    var btnSave = $('#btn-save');
    var btnCancel = $('#btn-cancel');
    
    function save() {
        var key = $('#key-config').data('key');
        var li = $('#key-' + key);
    
        var step = $('#step-select').val();
        var value = $('#tone-select').val();
    
        if (value == 0) {
            li.removeClass('enabled').find('sub').text('');
            delete KEY_MAP[key];
        }
        else {
            li.addClass('enabled').
                    data('step', step).
                    data('value', value).
                    find('sub').text(step + TONE_MAP[value].name);
            KEY_MAP[key] = {step: step, value: value};
        }
    }

    btnSave.click($.unblockUI);
    btnSave.click(save);
    btnCancel.click($.unblockUI);
}




function showKeyList() {
    var root = $('#key-list');
    
    function config(event) {
        var VALUE_INDEX_MAP = {
            a: 8,
            b: 9,
            c: 10,
            d: 11,
            e: 12
        }
        
        var li = $(this);
        var key = li.data('key');
        var step = li.data('step');
        var value = li.data('value');
    
        var dialog = $('#key-config');
        var selectStep = $('#step-select');
        var selectValue = $('#tone-select');
        
        dialog.data('key', key);
        
        if (step && value) {
            if (VALUE_INDEX_MAP[value]) {
                value = VALUE_INDEX_MAP[value];
            }
            selectStep[0].selectedIndex = step - 1;
            selectValue[0].selectedIndex = value - 0;
        }
        else {
            selectStep[0].selectedIndex = 3;
            selectValue[0].selectedIndex = 0;
        }
    
        $.blockUI({
            message: dialog,
            css: {
                cursor: 'default',
                top: '150px'
            }
        });
    }

    $.each(KEY_CODE_MAP, function (code, name) {
        var li = $('<li></li>').
                html(name + '<sub></sub>').
                attr('id', 'key-' + name).
                attr('tabindex', 1).
                data('key', name).
                click(config).
                appendTo(root);
    });
    
    $.each(KEY_MAP, function (name, item) {
        var tone = TONE_MAP[item.value];
        $('#key-' + name).addClass('enabled').
            data('step', item.step).
            data('tone', tone.name).
            data('value', item.value).
            find('sub').text(item.step + tone.name);
    });
}




function exportConfig() {
    location = 'data:plain/text,' + encodeURI('var KEY_MAP = ' + JSON.stringify(KEY_MAP) + ';');
}




$(init);




