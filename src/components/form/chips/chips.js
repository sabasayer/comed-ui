import { handleMenuTrigger } from "../../menu/menu";

export const initiateChips = () => {
  const chipInputs = document.querySelectorAll(".co--chips .co--text-input");

  chipInputs.forEach((input) => {
    handleMenuTrigger({
      trigger: input,
      targetAttribute: "data-dropdown-target",
      shownClassName: "co--list-box__menu--shown",
      showEvent: "click",
      isSameWidth: true,
    });
  });
};
