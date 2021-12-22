class Calendar {

    constructor({element, date}) {
        this._element = element;
        this._date = date;
        this._currentDate = new Date();
        this._selectedFirst = false;
    }


    render() {
        this._element.innerHTML = `
        
        <div class="calendar">
    <div class="calendar__title">${this._formatDate()}</div>
    <div class="calendar__wrapper">
        <div class="calendar__inner">
            <div class="calendar__item calendar__week_day">Mon</div>
            <div class="calendar__item calendar__week_day">Thu</div>
            <div class="calendar__item calendar__week_day">Wed</div>
            <div class="calendar__item calendar__week_day">Thu</div>
            <div class="calendar__item calendar__week_day">Fri</div>
            <div class="calendar__item calendar__week_day">Sat</div>
            <div class="calendar__item calendar__week_day">Sun</div>
        ${Array(this._getStartWeekDay()).fill(0).map((_) => {
            return `<div class="calendar__item calendar__day"></div>`;
        }).join('')}
        ${Array(this._getDaysInMonth()).fill(0).map((_, i) => {
            return `<div class="calendar__item calendar__day ${this._isCurrentDay(i + 1) ? 'calendar__day_current' : ''}" data-day="${i + 1}">${i + 1}</div>`;
        }).join('')}
        </div>
    </div>
</div>
        
        `;

        this._addListeners();
    }

    _getStartWeekDay() {
        return new Date(this._date.getFullYear(), this._date.getMonth(), 1).getDay() - 1;
    }

    _getDaysInMonth() {
        return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
    }

    _formatDate() {
        return this._date.toLocaleDateString("en-US", {month: 'long', year: 'numeric'});
    }

    _isCurrentDay(day) {
        return this._date.getDate() === day
            && this._currentDate.getFullYear() === this._date.getFullYear()
            && this._currentDate.getMonth() === this._date.getMonth();
    }

    _addListeners() {
        this._element.addEventListener('click', e => {
            let closest = e.target.closest(".calendar__day[data-day]");
            if (!closest) {
                return;
            }
            if (!this._selectedFirst) {
                this._element
                    .querySelectorAll('.calendar__day')
                    .forEach(it => {
                        it.classList.remove('calendar__day_selected-inclusive');
                        it.classList.remove('calendar__day_selected');
                    });

                this._selectedFirst = closest.classList.toggle('calendar__day_selected-inclusive');
            } else {
                closest.classList.toggle('calendar__day_selected-inclusive');
                this._selectedFirst = false;
            }
        });

        this._element.addEventListener('mouseover', e => {
            let closest = this._selectedFirst && e.target.closest(".calendar__day[data-day]");
            if (!closest) {
                return;
            }
            let selected = this._element.querySelector('.calendar__day_selected-inclusive');
            if (!selected) {
                throw new Error("Expected start range")
            }

            const order = parseInt(closest.dataset.day) < selected.dataset.day;
            let startElement = order ? closest : selected;
            const endElement = order ? selected : closest;

            if (startElement === endElement) {
                return;
            }

            this._element
                .querySelectorAll('.calendar__day_selected')
                .forEach(it => {
                    it.classList.remove('calendar__day_selected');
                });

            startElement = startElement.nextElementSibling;
            while (startElement !== null && startElement !== endElement) {
                startElement.classList.add('calendar__day_selected');
                startElement = startElement.nextElementSibling;
            }
        });
    }
}