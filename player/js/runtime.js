window.onkeydown = function (event) {
    switch (event.keyCode) {
    case 49: controller.play('drum', 0); break;
    case 50: controller.play('drum', 1); break;
    case 51: controller.play('drum', 2); break;
    case 52: controller.play('drum', 3); break;
    case 53: controller.play('drum', 4); break;
    case 54: controller.play('drum', 5); break;
    case 55: controller.play('drum', 6); break;
    case 65: controller.play('guitar', 0); break;
    case 83: controller.play('guitar', 1); break;
    case 68: controller.play('guitar', 2); break;
    case 70: controller.play('guitar', 3); break;
    case 71: controller.play('guitar', 4); break;
    case 72: controller.play('guitar', 5); break;
    case 74: controller.play('guitar', 6); break;
    case 75: controller.play('guitar', 8); break;
    case 13: viewer.start(model.appleList); break;
    default: console.log(event.keyCode);
    }
    if (event.keyCode >= 49 &&
            event.keyCode <= 55) {
        var track = viewer.basketList[event.keyCode - 49].element;
        track.focus();
        setTimeout(function () {
            track.blur();
        }, 200);
    }
};
