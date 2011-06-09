/* LAYER LIST */
var layers = {
    logo: $('#logo-layer'),
    slogen: $('#slogen-layer'),
    title: $('#title-layer'),
    instrument: $('#instrument-layer'),
    device: $('#device-layer'),
    connection: $('#connection-layer'),
    cloud: $('#cloud-layer'),
    content: $('#content-layer')
};




/* ACTION LIST */
var actionList = [
    {handler: showItem, params: ['logo', 'logo'], timeout: 0},
    {handler: hideItem, params: ['logo', 'logo'], timeout: 1000},
    {handler: showItem, params: ['slogen-cover', 'slogen'], timeout: 1000},
    {handler: hideItem, params: ['slogen-cover', 'slogen'], timeout: 2000},
    {handler: showItem, params: ['title-audio', 'title'], timeout: 2000},
    {handler: setTop, params: ['title-audio'], timeout: 3000},
    {handler: showDevice, params: ['device-1', 'single'], timeout: 3000},
    {handler: showItem, params: ['slogen-piano', 'slogen'], timeout: 3000},
    {handler: hideItem, params: ['slogen-piano', 'slogen'], timeout: 3500},
    {handler: setDevice, params: ['device-1', 'double-1'], timeout: 4000},
    {handler: showDevice, params: ['device-2', 'double-2'], timeout: 4000},
    {handler: showItem, params: ['slogen-piano-2', 'slogen'], timeout: 4000},
    {handler: hideItem, params: ['slogen-piano-2', 'slogen'], timeout: 4500},
    {handler: hideItem, params: ['title-audio', 'title'], timeout: 4500},
    {handler: showItem, params: ['title-canon', 'title'], timeout: 4500},
    {handler: setTop, params: ['title-canon'], timeout: 5000},
    {handler: setDevice, params: ['device-1', 'list list-2'], timeout: 6000},
    {handler: setDevice, params: ['device-2', 'list list-3'], timeout: 6000},
    {handler: hideItem, params: ['title-canon', 'title'], timeout: 6500},
    {handler: showItem, params: ['title-killer', 'title'], timeout: 7000},
    {handler: setTop, params: ['title-killer', 'title'], timeout: 8000},
    {handler: setDevice, params: ['device-1', 'list list-1'], timeout: 8000},
    {handler: setDevice, params: ['device-2', 'list list-4'], timeout: 8000},
    {handler: showDevice, params: ['device-3', 'double-1'], timeout: 8000},
    {handler: showDevice, params: ['device-4', 'double-2'], timeout: 8000},
    {handler: showItem, params: ['slogen-drum-cymbals', 'slogen'], timeout: 8000},
    {handler: hideItem, params: ['slogen-drum-cymbals', 'slogen'], timeout: 9000},
    {handler: setDevice, params: ['device-3', 'list list-2'], timeout: 9000},
    {handler: setDevice, params: ['device-4', 'list list-3'], timeout: 9000},
    {handler: showItem, params: ['content-list', 'list'], timeout: 10000},
    {handler: showItem, params: ['content-1', 'list-item'], timeout: 11000},
    {handler: showItem, params: ['content-2', 'list-item'], timeout: 12000},
    {handler: showItem, params: ['content-3', 'list-item'], timeout: 13000},
    {handler: showItem, params: ['content-4', 'list-item'], timeout: 14000},
    {handler: showItem, params: ['content-5', 'list-item'], timeout: 15000},
    {handler: showItem, params: ['content-6', 'list-item'], timeout: 15500},
    {handler: hideItem, params: ['content-list', 'list'], timeout: 16000},
    {handler: hideItem, params: ['device-layer', 'layer'], timeout: 17000},
    {handler: hideItem, params: ['title-killer', 'title'], timeout: 17000},
    {handler: showItem, params: ['title-html5', 'title'], timeout: 17000},
    {handler: showCloud, params: [], timeout: 18000},
    {handler: hideItem, params: ['title-html5', 'title'], timeout: 19000},
    {handler: hideCloud, params: [], timeout: 20000},
    {handler: showItem, params: ['logo', 'logo'], timeout: 21000},
    {handler: hideItem, params: ['logo', 'logo'], timeout: 22000},
    {handler: showItem, params: ['slogen-enjoy-it', 'title'], timeout: 22000}
];




/* GENERAL ANIMATION */
function go() {
    var action = actionList.shift();
    var timeout = action.timeout;

    if (action) {
        action.handler.apply(this, action.params);
    }
    
    var nextAction = actionList[0];
    while (nextAction && nextAction.timeout == timeout) {
        action = actionList.shift();
        action.handler.apply(this, action.params);
        nextAction = actionList[0];
    }
}


function show(id) {
    var host = $('#' + id).css('display', 'block');
    setTimeout(function () {
        host.css('opacity', '1');
    }, 13);
}
function hide(id) {
    var host = $('#' + id).css('opacity', '0');
    setTimeout(function () {
        host.css('display', 'none');
    }, 3000);
}
function setClass(id, classname) {
    var host = $('#' + id).attr('class', classname);
}
function hitDevice(id) {
    var host = $('#' + id + ' > .instrument').addClass('hit');
    setTimeout(function () {
        host.removeClass('hit');
    }, 100);
}





/* SPECIFIC ANIMATION */
function showItem(id, type) {
    if (type == 'logo') {
        $('#' + id).css('display', 'inline-block');
        setTimeout(function () {
            $('#' + id).css('opacity', '1');
        }, 13);
    }
    else {
        show(id);
    }
}
function hideItem(id, type) {
    hide(id);
}
function setTop(id) {
    setClass(id, 'on-top');
}
function showDevice(id, type) {
    setClass(id, type);
    show(id);
}
function setDevice(id, type) {
    setClass(id, type);
}
function hideDevices() {
    hide('device-layer');
}
function showCloud() {
    show('cloud-list');
    setTimeout(function () {
        $('#cloud-list').addClass('flying');
    }, 300);
}
function hideCloud() {
    $('#cloud-list').removeClass('flying').addClass('final');
    setTimeout(function () {
        hide('#cloud-list');
    }, 1000);
}




/* INIT */
$(function () {
    resize();
    socket();
    $(window).keydown(keydown);
    $(window).bind('resize', resize);
});




/* EVENTS */
function socket() {
    var DEVICE_MAP = {
        'piano': 1,
        'piano2': 2,
        'drum': 3,
        'cymbals': 4
    };
    var ws;
    var host = 'localhost';
    
    if (window.WebSocket) {
        ws = new WebSocket('ws://' + host + ':8080/');
        ws.onopen = function () {
            ws.send('player:slides');
        };
        ws.onmessage = function (evt) {
            var data = evt.data.match(/(\w+)\:(\w+)/);
    
            if (data) {
                var type = data[1];
                var value = data[2];
                
                var index = DEVICE_MAP[type];
                hitDevice('device-' + index);
            }
        };
    }
}

function resize() {
    var height = $(window).height();
    $('#stage').css('marginTop', Math.ceil((height - 768) / 2) + 'px');
}

function keydown(event) {

    if (event.keyCode == 13) {
        go();
    }
    else if (event.keyCode == 65) {
        hitDevice('device-1');
    }
    else if (event.keyCode == 83) {
        hitDevice('device-2');
    }
    else if (event.keyCode == 68) {
        hitDevice('device-3');
    }
    else if (event.keyCode == 70) {
        hitDevice('device-4');
    }
    else if (event.keyCode == 90) {
        if (confirm('see wa band introduction?')) {
            location = '../slides-extra/index.html';
        }
    }

}




