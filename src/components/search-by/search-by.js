import { handleMenuTrigger } from "../menu/menu";

export const initiateSearchBy = () => {
  const triggers = document.querySelectorAll("[data-search-by-menu-target]");

  console.log({ triggers });

  triggers.forEach((trigger) =>
    handleMenuTrigger({
      trigger,
      targetAttribute: "data-search-by-menu-target",
      shownClassName: "co--overflow-menu-options--open",
      showEvent: "click",
      hideEvent: "clickOutside",
      offset: [0, 0],
    })
  );
};
