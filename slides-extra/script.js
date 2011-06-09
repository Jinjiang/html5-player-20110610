/* INIT */
$(function () {
    resize();
    $(window).keydown(keydown);
});




/* EVENTS */
function resize() {
    var height = $(window).height();
    $('#stage').css('marginTop', Math.ceil((height - 768) / 2) + 'px');
}
function keydown(event) {

    if (event.keyCode == 65) {
        show('hardware-list');
    }
    else if (event.keyCode == 83) {
        show('product-list');
    }
    else if (event.keyCode == 68) {
        show('software-list');
    }
    else if (event.keyCode == 70) {
        show('person-list');
    }
    else if (event.keyCode == 90) {
        hide('hardware-list');
    }
    else if (event.keyCode == 88) {
        hide('product-list');
    }
    else if (event.keyCode == 67) {
        hide('software-list');
    }
    else if (event.keyCode == 86) {
        hide('person-list');
    }
    else {
        // console.log(event.keyCode);
    }
}




function showPerson(html) {
    $.blockUI({
        message: html,
        css: {
            cursor: 'default',
            top: '100px',
            width: '60%',
            left: '20%',
            background: 'white'
        }
    });
    setTimeout($.unblockUI, 5000);
}




function show(id) {
    var root = $('#' + id).removeClass('hidden');
    setTimeout(function () {
        root.addClass('shown');
    }, 13);
}




function hide(id) {
    var root = $('#' + id).removeClass('shown');
    setTimeout(function () {
        console.log(root[0]);
    }, 1500);
}



