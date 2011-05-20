var CONNECT = 0;
var OPEN = 1;
var CLOSED = 2;
var ERROR = 3;


function Instrument() {
    var that = this;

    var root = $('<div class="instrument"><button>Remove</button>' +
            '<div class="main"></div></div>');
    var main = root.find('.main');

    this.root = root;
    this.main = main;

    this.root.find('button').click(function () {
        that.remove();
    });

    this.type;
    this.url;
    this.ws;
    this.state;
    this.lastCode;
    
    this.build(CONNECT);

    $('body').append(this.root);
}

Instrument.prototype.build = function (state) {
    var that = this;

    this.state = state;
    if (!this.main) {
        return;
    }

    switch (state) {
    case CONNECT:
        this.main.html('<input type="url" value="localhost" /><select>' +
                '<option value="piano">Piano</option>' +
                '<option value="guitar">Guitar</option>' +
                '<option value="drum">Drum</option>' +
                '</select><button>Connect</button>').
                attr('class', 'state-connect').
                find('button').click(function () {
                    that.connect();
                });
        break;
    case OPEN:
        this.main.html('<span></span> Works!').
                attr('class', 'state-open').
                find('span').text(this.type.toUpperCase());
        break;
    case CLOSED:
        this.main.html('<span></span> CLOSED!').
                attr('class', 'state-close').
                find('span').text(this.type.toUpperCase());
        break;
    case ERROR:
        this.main.html('<span></span> ERROR!').
                attr('class', 'state-error').
                find('span').text(this.type.toUpperCase());
        break;
    }
};
Instrument.prototype.remove = function () {
    if (this.ws) {
        this.ws.close();
    }

    this.main = null;
    this.root.remove();

    delete this;
};

Instrument.prototype.connect = function () {
    var url = this.main.find('input').val();
    var type = this.main.find('select').val();
    var that = this;

    this.url = url;
    this.type = type;
    this.ws = new WebSocket('ws://' + url + ':8080/');
    this.ws.onopen = function () {
        that.open();
    }
};
Instrument.prototype.play = function (code) {
    this.lastCode = code;
    console.log('PLAYING:', this.type, this.lastCode);
};

Instrument.prototype.open = function () {
    var that = this;
    
    this.ws.send('player:' + this.type);
    this.ws.onmessage = function (evt) {that.message(evt.data);};
    this.ws.onerror = function () {that.error();};
    this.ws.onclose = function () {that.close();};

    this.build(OPEN);
};
Instrument.prototype.message = function (data) {
    data = data.match(/(\w+)\:(\w+)/);

    if (data && (data[1] == this.type)) {
        this.play(data[2]);
    }
};
Instrument.prototype.error = function () {
    this.build(ERROR);
};
Instrument.prototype.close = function () {
    this.build(CLOSED);
};


function init() {
    $('button').click(function () {
        new Instrument;
    });
}


$(init);