function Instrument(type) {
    var that = this;

    this.type = type;

    if (type == 'drum') {
        this.toneList = [];
        this.length = 7;
        
        for (var i = 0; i < this.length; i++) {
            this.toneList.push(new Tone(type, i));
        }
    }
    if (type == 'guitar') {
        this.toneList = {};

        ['h1l', 'l1l', 'l1m', 'l2l', 'm1l',
                'm1m', 'm2m', 'm3l', 'm3m', 'm4l', 'm4m',
                'm5l', 'm5m', 'm5ms'].forEach(function (key) {
            that.toneList[key] = new Tone(type, key);
        });
        
    }
}

Instrument.prototype.play = function (code) {
    try {
        if (this.type == 'drum') {
            code--;
        }
        this.toneList[code].play();
    }
    catch (e) {
        console.log(this.type, code);
    }
};
