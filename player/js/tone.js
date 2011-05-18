function Tone(type, code) {
    this.type = type;
    this.code = code;
    this.audioList = [];
    
    // var src = 'audio/' + this.type + '/' + (this.code - (-1)) + '.ogg';
    var src;
    if (type == 'piano') {
        src = window[type.toUpperCase() + '_OGG'][code - (-1)];
    }
    else if (type == 'guitar') {
        src = 'mp3/' + this.type + '/' + (this.code) + '.mp3';
    }
    else {
        src = 'ogg/' + this.type + '/' + (this.code - (-1)) + '.ogg';
    }

    for (var i = 0; i < this.MAX_OFFSET; i++) {
        var audio = new Audio;
        audio.src = src;
        this.audioList.push(audio);
    }

    this.next();
}

Tone.prototype.MAX_OFFSET= 4;
Tone.prototype.offset = -1;
Tone.prototype.play = function () {
    var current = this.current;

    /*if (current.readyState == 4 &&
            (current.currentTime == 0 ||
            current.currentTime == current.duration)) {
        current.play();
    }*/
    current.play();

    this.next();
}
Tone.prototype.next = function () {
    this.offset++;
    if (this.offset >= this.MAX_OFFSET) {
        this.offset = 0;
    }
    this.current = this.audioList[this.offset];
};
