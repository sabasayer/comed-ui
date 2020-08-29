import { DomUtil } from "@sabasayer/utils";

const clearTabNavItemsSelection = (tab) => {
  const tabNavItems = tab.querySelectorAll(".co--tabs__nav-item");

  tabNavItems.forEach((tabNavItem) =>
    tabNavItem.classList.remove("co--tabs__nav-item--selected")
  );
};

const hideAllTabPanels = (content) => {
  const panels = content.querySelectorAll(".co--tab-panel");

  panels.forEach((panel) => panel.setAttribute("hidden", ""));
};

export const initiateTabs = () => {
  const tabs = document.querySelectorAll(".co--tabs__nav");

  tabs.forEach((tab) => {
    const tabNavItems = tab.querySelectorAll(".co--tabs__nav-item");

    tabNavItems.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", (ev) => {
        const isDisabled = tabNavItem.classList.contains(
          "co--tabs__nav-item--disabled"
        );
        if (isDisabled) return;

        const target = tabNavItem.getAttribute("data-target");

        if (!target) return;

        const panel = document.querySelector(target);

        if (!panel) return;

        const tabContent = DomUtil.findParentElement(panel, "co--tab-content");

        if (!tabContent) return;

        hideAllTabPanels(tabContent);

        panel.removeAttribute("hidden");

        clearTabNavItemsSelection(tab);
        tabNavItem.classList.add("co--tabs__nav-item--selected");
      });
    });
  });
};
