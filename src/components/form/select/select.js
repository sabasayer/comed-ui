import { handleMenuTrigger } from "../../menu/menu";

export const initiateSelects = () => {
  const selects = document.querySelectorAll(".co--dropdown-text");

  selects.forEach((select) => {
    handleMenuTrigger({
      trigger: select,
      targetAttribute: "data-select-target",
      shownClassName: "co--dropdown-list--shown",
      showEvent: "click",
      isSameWidth: true,
    });
  });
};
