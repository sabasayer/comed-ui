import { handleMenuTrigger } from "../menu/menu";
import { DomUtil } from "@sabasayer/utils";

export const initiateOverflowMenus = () => {
  const triggers = document.querySelectorAll("[data-overflow-menu-trigger]");

  triggers.forEach((trigger) =>
    handleMenuTrigger({
      trigger,
      targetAttribute: "data-overflow-menu-target",
      shownClassName: "co--overflow-menu-options--open",
      showEvent: "click",
      hideEvent: "clickOutside",
      offset: [0, 0],
      onOpen: (trigger) => {
        if (trigger.classList.contains("co--overflow-menu")) {
          trigger.classList.add("co--overflow-menu--open");
          return;
        }

        const parent = DomUtil.findParentElement(trigger, "co--overflow-menu");
        if (!parent) return;
        parent.classList.add("co--overflow-menu--open");
      },
      onClose: (trigger) => {
        if (trigger.classList.contains("co--overflow-menu")) {
          trigger.classList.remove("co--overflow-menu--open");
          return;
        }

        const parent = DomUtil.findParentElement(trigger, "co--overflow-menu");
        if (!parent) return;
        parent.classList.remove("co--overflow-menu--open");
      },
    })
  );
};
