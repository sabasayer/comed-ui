import { Renderer } from "../../../renderer/renderer";

const { handleMenuTrigger } = require("../../menu/menu");

const initiateCalenderMonthDropdown = () => {
  const months = document.querySelectorAll(".co--date-picker-calender__month");

  months.forEach((month) => {
    handleMenuTrigger({
      trigger: month,
      targetAttribute: "data-dropdown-target",
      shownClassName: "co--dropdown-list--shown",
      showEvent: "click",
      offset: [0, 4],
    });
  });
};

class Calender extends Renderer {
  constructor(targetElement) {
    super({ date: new Date() }, targetElement);

    if (this.data.date) {
      this.data.shownDate = this.data.date;
    } else {
      this.data.shownDate = new Date();
    }
  }

  get currentMonth() {
    return this.data.shownDate ? this.data.shownDate.getMonth() : 1;
  }

  get currentYear() {
    return this.data.shownDate ? this.data.shownDate.getFullYear() : 1;
  }

  get currentDate() {
    return this.data.date.getDate();
  }

  beforeRender() {
    this.months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    this.weekDays = ["Pts", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"];

    this.totalDayCountToShow = 42;
  }

  registerMonthSelectEvents() {
    const months = this.targetElement.querySelectorAll(".month-option");

    months.forEach((month) => {
      month.addEventListener("click", () => {
        const monthValue = +month.getAttribute("data-value");

        if (monthValue == undefined) return;

        const newDate = new Date(this.currentYear, monthValue, 1);
        this.data.shownDate = newDate;
      });
    });
  }

  registerYearSelectEvents() {
    const year = this.targetElement.querySelector(
      ".co--date-picker-calender__year"
    );
    if (!year) return;

    year.addEventListener("input", () => {
      const yearValue = +year.value.trim("");
      if (yearValue == undefined) return;

      const newDate = new Date(yearValue, this.currentMonth, 1);
      this.data.shownDate = newDate;
    });
  }

  registerDaySelectEvents() {
    const days = this.targetElement.querySelectorAll(
      ".co--date-picker-calender__day"
    );

    days.forEach((day) => {
      day.addEventListener("click", () => {
        const dayValue = +day.textContent.trim();
        if (dayValue != undefined) {
          const isNext = day.classList.contains("next-month-day");
          const isPrev = day.classList.contains("prev-month-day");

          let month = this.currentMonth;
          if (isNext) month++;
          if (isPrev) month--;

          const newDate = new Date(this.currentYear, month, dayValue);
          this.data.date = newDate;
          this.data.shownDate = newDate;
        }
      });
    });
  }

  registerNavigationButtonEvents() {
    const prevMonth = this.targetElement.querySelector(
      ".co--date-picker-calender__prev-month"
    );

    const nextMonthMonth = this.targetElement.querySelector(
      ".co--date-picker-calender__next-month"
    );

    prevMonth.addEventListener("click", () => {
      const newDate = new Date(this.currentYear, this.currentMonth - 1, 1);
      this.data.shownDate = newDate;
    });

    nextMonthMonth.addEventListener("click", () => {
      const newDate = new Date(this.currentYear, this.currentMonth + 1, 1);
      this.data.shownDate = newDate;
    });
  }

  registerEvents() {
    this.registerDaySelectEvents();
    this.registerNavigationButtonEvents();
    this.registerYearSelectEvents();
    this.registerMonthSelectEvents();
    initiateCalenderMonthDropdown();
  }

  createMonths() {
    return this.months
      .map((month, index) => this.monthTemplate(month, index))
      .join("");
  }

  monthTemplate(name, index) {
    return `<li
    data-option
    data-value="${index}"
    class="co--dropdown-item month-option"
    title="${name}"
  >
    <a
      class="co--dropdown-link"
      href="javascript:void(0)"
      tabindex="-1"
      role="menuitemradio"
      aria-checked="true"
      >${name}</a
    >
    </li>`;
  }

  createDateString() {
    return this.data.date.toLocaleDateString();
  }

  createWeekDays() {
    return this.weekDays
      .map((e) => `<span class="co--date-picker-calender__weekday">${e}</span>`)
      .join("");
  }

  createDay({ dayNumber, isPrev, isNext, isToday, isSelected }) {
    return ` <span class="co--date-picker-calender__day 
    ${isPrev ? "prev-month-day" : ""}  
    ${isNext ? "next-month-day" : ""}  
    ${isToday ? "today" : ""}
    ${isSelected ? "selected" : ""}
    ">
        ${dayNumber}
    </span>`.trim();
  }

  createGetLastDay(month, year) {
    const day = new Date(year, month + 1, 0);
    return day.getDate();
  }

  createDays() {
    const now = new Date();

    const month = this.currentMonth;
    const year = this.currentYear;
    const valueDate = this.data.date.getDate();

    const lastDay = this.createGetLastDay(month, year);

    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();

    const lasDayOfPrevMonth = this.createGetLastDay(month - 1, year);

    let days = "";

    for (let i = 0; i < dayOfWeek - 1; i++) {
      days += `${this.createDay({
        dayNumber: lasDayOfPrevMonth - i,
        isPrev: true,
      })}`;
    }

    for (let i = 0; i < lastDay; i++) {
      const date = i + 1;
      const isToday =
        now.getFullYear() == year &&
        now.getMonth() == month &&
        now.getDate() == date;

      const isSelected =
        this.data.date.getFullYear() == year &&
        this.data.date.getMonth() == month &&
        valueDate == date;

      days += `${this.createDay({
        dayNumber: date,
        isToday: isToday,
        isSelected: isSelected,
      })}`;
    }

    const addedDays = lastDay + dayOfWeek - 1;
    const remainingDays = this.totalDayCountToShow - addedDays;

    for (let i = 0; i < remainingDays; i++) {
      days += `${this.createDay({ dayNumber: i + 1, isNext: true })}`;
    }

    return days;
  }

  createNavigation() {
    const id = `month${Math.floor(Math.random() * 100)}`;

    const currentMonth = this.currentMonth;
    const monthName = this.months[currentMonth];

    const currentYear = this.currentYear;

    return `<div class="co--date-picker-calender__navigation">
    <div class="co--date-picker-calender__prev-month">
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style="will-change: transform"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M5 8l5-5 .7.7L6.4 8l4.3 4.3-.7.7z"></path>
      </svg>
    </div>
    <div class="co--date-picker-calender__inputs">
      <button
        aria-expanded="false"
        aria-labelledby="${id}-label"
        class="co--date-picker-calender__month"
        aria-controls="${id}"
        data-dropdown-target="#${id}"
      >
        ${monthName}
      </button>

      <ul
        class="co--dropdown-list"
        id="${id}"
        role="menu"
        tabindex="0"
        aria-hidden="true"
        wh-menu-anchor="left"
        aria-labelledby="${id}-label"
        data-floating-menu-direction="bottom"
      >
        ${this.createMonths()}
      </ul>

      <input
        type="number"
        name="year"
        class="co--date-picker-calender__year"
        value="${currentYear}"
      />
    </div>

    <div class="co--date-picker-calender__next-month">
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style="will-change: transform"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
      </svg>
    </div>
  </div>`;
  }

  createTemplate(data) {
    const isoValue = this.data.date ? this.data.date.toISOString() : "";

    return `<div class="co--date-picker-calender" data-value="${isoValue}">
    <div class="co--date-picker-calender__header">
      <h5>${this.createDateString()}</h5>
    </div>
    <div class="co--date-picker-calender__body">
      ${this.createNavigation()}

      <div class="co--date-picker-calender__content">
        <div class="co--date-picker-calender__weekdays">
          ${this.createWeekDays()}
        </div>
        <div class="co--date-picker-calender__days">
          ${this.createDays()}
        </div>
      </div>
    </div>
  </div>`;
  }
}

export const initiateCalenders = () => {
  const calenders = document.querySelectorAll("co-date-picker-calender");

  calenders.forEach((calender) => {
    new Calender(calender);
  });
};
