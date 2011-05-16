function Note(type, code, time) {
    this.type = type + '';
    this.code = (code - 0) || 0;
    this.time = (time - 0) || 0;
}