import { DomUtil } from "@sabasayer/utils";

const activeClass = "co--accordion__item--active";
const collapsingClass = "co--accordion__item--collapsing";
const expandingClass = "co--accordion__item--expanding";

export const initiateAccordions = () => {
  const headings = document.querySelectorAll(".co--accordion__heading");

  headings.forEach((heading) => {
    heading.addEventListener("click", () => {
      const parent = DomUtil.findParentElement(heading, "co--accordion__item");

      if (!parent) return;

      if (parent.classList.contains(activeClass)) {
        parent.classList.add(collapsingClass);
        parent.classList.remove(activeClass);
        setTimeout(() => {
          parent.classList.remove(collapsingClass);
        }, 100);
      } else {
        parent.classList.add(expandingClass);
        parent.classList.add(activeClass);
        setTimeout(() => {
          parent.classList.remove(expandingClass);
        }, 100);
      }
    });
  });
};
