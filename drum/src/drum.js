var ws;
var type = 'drum';
var host = '192.168.1.57'; // 'localhost';
var status = 0;




function init() {
    resize();
    $(window).bind('resize', resize);
    if (window.WebSocket) {
        ws = new WebSocket('ws://' + host + ':8080/');
        ws.onopen = function () {
            ws.send('client:drum');
        };
    }
}




function send(value) {
    if (status == 1) {
        return;
    }
    if (ws && ws.readyState == 1) {
        ws.send(type + ':' + value);
    }
}
function start() {
    status = 1;
    if (ws && ws.readyState == 1) {
        ws.send('loop:1');
    }
}
function end() {
    status = 0;
    if (ws && ws.readyState == 1) {
        ws.send('loop:0');
    }
}
function resize() {
    $('table').css('height', $(window).height() + 'px');
}




$(init);




