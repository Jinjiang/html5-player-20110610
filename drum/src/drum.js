var ws;
var type = 'drum';




function init() {
    resize();
    $(window).bind('resize', resize);
    if (window.WebSocket) {
        ws = new WebSocket('ws://192.168.1.57:8080/');
        ws.onopen = function () {
            ws.send('client:drum');
        };
    }
}




function send(value) {
    ws.send(type + ':' + value);
}
function resize() {
    $('table').css('height', $(window).height() + 'px');
}




$(init);




