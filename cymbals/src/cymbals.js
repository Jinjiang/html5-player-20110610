var ws;
var type = 'cymbals';
var host = '192.168.1.57'; // 'localhost';
var notSendFlag = false;
var z = 0;




function init() {
    resize();
    $(window).bind('resize', resize);
    if (window.WebSocket) {
        ws = new WebSocket('ws://' + host + ':8080/');
        ws.onopen = function () {
            ws.send('client:cymbals');
        };
    }
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            z = Math.abs(Math.floor(event.acceleration.z * 1000));
            
            if ((z > 9000) && !notSendFlag) {
                send(1);
                notSendFlag = true;
            }
            else if ((z < 5000) && notSendFlag) {
                notSendFlag = false;
            }
            
        }, true);
    }
    
}




function send(value) {
    if (ws && ws.readyState == 1) {
        ws.send(type + ':' + value);
    }
}
function resize() {
    $('table').css('height', $(window).height() + 'px');
}




$(init);
