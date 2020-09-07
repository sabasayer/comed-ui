import { DomUtil } from "@sabasayer/utils";

const initiateSearch = () => {
  const buttons = document.querySelectorAll(
    ".co--search .co--search-magnifier"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = DomUtil.findParentElement(
        button,
        "co--toolbar-search-container-expandable"
      );
      if (!parent) return;

      parent.classList.add("co--toolbar-search-container-active");

      const input = parent.querySelector(".co--search-input");

      if (!input) return;

      input.focus();

      input.addEventListener("blur", () => {
        parent.classList.remove("co--toolbar-search-container-active");
      });
    });
  });
};

export const initiateDataTables = () => {
  initiateSearch();
};
