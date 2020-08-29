import { createPopper } from "@popperjs/core";
import { handleMenuTrigger } from "../menu/menu";

export const initiateTooltips = () => {
  const triggers = document.querySelectorAll("[data-tooltip-trigger]");

  triggers.forEach((trigger) =>
    handleMenuTrigger({
      trigger,
      targetAttribute: "data-tooltip-target",
      shownClassName: "co--tooltip--shown",
      showEvent: "mouseenter",
      hideEvent: "mouseleave",
      offset: [10, 10],
    })
  );

  //   triggers.forEach((trigger) => {
  //     let instance = null;
  //     const target = trigger.getAttribute("data-tooltip-target");
  //     if (!target) return;

  //     const tooltip = document.querySelector(target);
  //     const placement =
  //       tooltip.getAttribute("data-floating-menu-direction") ?? "auto";

  //     if (!tooltip) return;

  //     trigger.addEventListener("mouseenter", () => {
  //       tooltip.classList.add("co--tooltip--shown");
  //       instance = createPopper(trigger, tooltip, { placement });
  //     });

  //     trigger.addEventListener("mouseleave", () => {
  //       tooltip.classList.remove("co--tooltip--shown");
  //       if (instance) {
  //         instance.destroy();
  //         instance = null;
  //       }
  //     });
  //   });
};
