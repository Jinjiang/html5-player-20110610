window.onkeydown = function (event) {
    switch (event.keyCode) {
    case 49: controller.play('piano', 0); break;
    case 50: controller.play('piano', 1); break;
    case 51: controller.play('piano', 2); break;
    case 52: controller.play('piano', 3); break;
    case 53: controller.play('piano', 4); break;
    case 54: controller.play('piano', 5); break;
    case 55: controller.play('piano', 6); break;
    case 13: viewer.start(model.appleList); break;
    default: ;
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
