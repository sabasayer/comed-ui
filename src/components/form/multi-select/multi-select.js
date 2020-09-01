import { handleMenuTrigger } from "../../menu/menu";

export const initiateMultiSelects = () => {
  const selects = document.querySelectorAll(".co--list-box__field");

  selects.forEach((select) => {
    handleMenuTrigger({
      trigger: select,
      targetAttribute: "data-dropdown-target",
      shownClassName: "co--list-box__menu--shown",
      showEvent: "click",
      isSameWidth: true,
    });
  });
};
