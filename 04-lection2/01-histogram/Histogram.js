class Histogram {

    constructor({element, data, total}) {
        this._element = element;
        this._data = data;
        this._total = total === undefined ? data.reduce((v1, v2) => v1 + v2, 0) : total;
    }

    render() {
        this._element.innerHTML =
            `
<div class="histogram">
    <div class="histogram__header-total-info">
        <div>Total orders</div>
        <div class="histogram__header-total-info-count">${this._total}</div>
    </div>
    <a class="histogram__header-view-link" href="#">View all</a>
    <div class="histogram__data">
        ${Array.from(this._data).map(it => {
                return `<div class="histogram__data-column" style="height: ${it}%"></div>`
            }).join('')}
    </div>
</div>
`;
    }
}