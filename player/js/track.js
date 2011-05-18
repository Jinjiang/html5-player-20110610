function Track(index) {
    this.element = document.createElement('li');
    this.index = (index - 0) || 0;
}

Track.prototype.drop = function () {
    var appleElement = document.createElement('div');
    appleElement.className = 'apple';
    this.element.appendChild(appleElement);
    setTimeout(function () {
        appleElement.style.top = '244px';
    }, 100);
};