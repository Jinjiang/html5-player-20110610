function Model(melody) {
    this.melody = melody;
    this.appleList = [];
    this.noteList = [];
}

Model.prototype.convert = function () {
    var appleList = [];

    this.melody.noteList.forEach(function (note) {
        appleList.push(new Apple(note.code, note.time));
    });
    
    this.appleList = appleList;
};