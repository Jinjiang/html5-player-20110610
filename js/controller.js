function Controller(typeList) {
    this.instrumentMap = {};
    this.init(typeList);
}

Controller.prototype.init = function (typeList) {
    var that = this;
    typeList.forEach(function (type) {
        that.addInstrument(type);
    });
}
Controller.prototype.addInstrument = function (type) {
    this.instrumentMap[type] = new Instrument(type);
};
Controller.prototype.play = function (type, code) {
    this.instrumentMap[type].play(code);
};
