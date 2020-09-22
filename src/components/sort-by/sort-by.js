import { handleMenuTrigger } from "../menu/menu";

export const initiateSortBy = () => {
  const triggers = document.querySelectorAll("[data-sort-by-menu-target]");

  triggers.forEach((trigger) =>
    handleMenuTrigger({
      trigger,
      targetAttribute: "data-sort-by-menu-target",
      shownClassName: "co--overflow-menu-options--open",
      showEvent: "click",
      hideEvent: "clickOutside",
      offset: [0, 0],
    })
  );

  const icons = document.querySelectorAll(".co--sort-by-icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
        
      if (icon.classList.contains("rotated")) icon.classList.remove("rotated");
      else icon.classList.add("rotated");
    });
  });
};
