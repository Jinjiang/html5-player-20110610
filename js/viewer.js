function Viewer() {
    this.trackList = [];
    this.basketList = [];
    this.appleList = [];
    this.trackRoot = document.getElementById('track-list');
    this.basketRoot = document.getElementById('basket-list');
    
    this.build();
}

Viewer.prototype.build = function () {
    for (var i = 0; i < 7; i++) {
        var track = new Track(i);
        this.trackList.push(track);
        this.trackRoot.appendChild(track.element);
        
        var basket = new Basket(i);
        this.basketList.push(basket);
        this.basketRoot.appendChild(basket.element);
    }
};
Viewer.prototype.start = function (appleList) {
    var that = this;
    appleList.forEach(function (apple) {
        setTimeout(function () {
            that.trackList[apple.track - 1].drop();
        }, 760 * apple.time);
    });
};