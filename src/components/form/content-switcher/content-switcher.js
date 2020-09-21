import { DomUtil } from "@sabasayer/utils";

export const initiateContentSwitchers = () => {
  const buttons = document.querySelectorAll(".co--content-switcher-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const container = DomUtil.findParentElement(
        button,
        "co--content-switcher"
      );
      if (!container) return;

      container
        .querySelectorAll(".co--content-switcher-btn")
        ?.forEach((child) => {
          child.classList.remove("co--content-switcher--selected");
        });

      button.classList.add("co--content-switcher--selected");
    });
  });
};
