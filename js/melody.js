function Melody(melodyInput) {
    var noteList = [];
    // var noteMap = {};

    melodyInput.forEach(function (json) {
        var note = new Note(json.type, json.code, json.time);
        noteList.push(note);
        // if (noteMap[note.time]) {
        //     noteMap[note.time] = [];
        // }
        // noteMap[note.time].push(note);
    });

    this.noteList = noteList;
    // this.noteMap = noteMap;
}