import { Pagination } from "carbon-components";

const cleareButtons = (buttons) => {
  buttons.forEach((button) => {
    button.classList.remove("co--pagination-nav__page--active");
    button.classList.remove("co--pagination-nav__page--disabled");
  });
};

export const initiatePaginations = () => {
  const paginations = document.querySelectorAll(".co--pagination-nav__list");

  paginations.forEach((pagination) => {
    const buttons = pagination.querySelectorAll("[data-page-button]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        cleareButtons(buttons);
        button.classList.add("co--pagination-nav__page--active");
        button.classList.add("co--pagination-nav__page--disabled");
      });
    });
  });
};
