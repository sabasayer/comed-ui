import { DomUtil } from "@sabasayer/utils";

export const initiateToggleButtons = () => {
  const buttons = document.querySelectorAll(".co--toggle-buttons-item");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const container = DomUtil.findParentElement(button, "co--toggle-buttons");
      if (!container) return;

      container
        .querySelectorAll(".co--toggle-buttons-item")
        ?.forEach((child) => {
          child.classList.remove("co--toggle-buttons-item--selected");
        });

      button.classList.add("co--toggle-buttons-item--selected");
    });
  });
};
