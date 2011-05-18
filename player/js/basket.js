function Basket(index) {
    this.element = document.createElement('li');
    this.element.innerHTML = index - (-1);
    this.element.setAttribute('tabindex', index - (-1));
    this.index = (index - 0) || 0;
}