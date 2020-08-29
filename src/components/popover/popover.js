import { handleMenuTrigger } from "../menu/menu";

export const initiatePopovers = () => {
  const triggers = document.querySelectorAll("[data-popover-trigger]");

  triggers.forEach((trigger) =>
    handleMenuTrigger({
      trigger,
      targetAttribute: "data-popover-target",
      shownClassName: "co--tooltip--shown",
      showEvent: "click",
      hideEvent: "clickOutside",
      offset: [10, 10],
    })
  );
};
