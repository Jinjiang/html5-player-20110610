function Instrument(type) {
    this.type = type;
    this.length = 7;
    this.toneList = [];
    
    for (var i = 0; i < this.length; i++) {
        this.toneList.push(new Tone(type, i));
    }
}

Instrument.prototype.play = function (code) {
    this.toneList[code].play();
};
