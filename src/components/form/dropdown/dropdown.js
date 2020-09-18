import { handleMenuTrigger } from "../../menu/menu";

export const initiateDropdowns = () => {
  const selects = document.querySelectorAll(".co--dropdown-text");

  selects.forEach((select) => {
    handleMenuTrigger({
      trigger: select,
      targetAttribute: "data-dropdown-target",
      shownClassName: "co--dropdown-list--shown",
      showEvent: "click",
      isSameWidth: true,
      onOpen:(trigger,popover)=>{
        const firstFocusableElement = popover.querySelector('[tabindex]');
        if(!firstFocusableElement) return;

        firstFocusableElement.focus();
      }
    });
  });
};
