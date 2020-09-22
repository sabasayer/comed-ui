import { initiateSortBy } from "../sort-by/sort-by";

export const initiateTreeList = () => {
  const openNodeClassName = "co--tree-list-node--open";

  const nodes = document.querySelectorAll(".co--tree-list-node");

  nodes.forEach((node) => {
    const icon = node.querySelector(".co--tree-list-icon");

    if(!icon) return;

    icon.addEventListener("click", () => {
      if (node.classList.contains(openNodeClassName))
        node.classList.remove(openNodeClassName);
      else node.classList.add(openNodeClassName);
    });
  });
};
