function Note(type, code, time) {
    this.type = type + '';
    // this.code = (code - 0) || 0;
    this.code = code;
    this.time = (time - 0) || 0;
}