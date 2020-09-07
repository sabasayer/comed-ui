import { createPopper } from "@popperjs/core";
import { DomUtil } from "@sabasayer/utils";

const sameWidth = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
};

export const handleMenuTrigger = (options) => {
  const {
    trigger,
    targetAttribute,
    shownClassName,
    showEvent = "focus",
    hideEvent = "clickOutside",
    offset,
    isSameWidth,
    onOpen,
    onClose,
  } = options;

  let instance = null;

  const target = trigger.getAttribute(targetAttribute);

  if (!target) return;

  const popover = document.querySelector(target);

  if (!popover) return;

  const placement =
    popover.getAttribute("data-floating-menu-direction") ?? "auto";

  const popoverId = popover.getAttribute("id");

  const close = () => {
    popover.classList.remove(shownClassName);

    if (instance) {
      instance.destroy();
      instance = null;
    }

    onClose(trigger, popover);
  };

  const checkForClickOutside = (ev) => {
    const isTargetInPopover = DomUtil.findParentElement(
      ev.target,
      undefined,
      popoverId
    );

    const isTargetPopover = ev.target.getAttribute("id") == popoverId;

    if (isTargetInPopover || isTargetPopover) return;

    close();

    if (hideEvent == "clickOutside")
      document.removeEventListener("mousedown", checkForClickOutside);
  };

  const open = () => {
    popover.classList.add(shownClassName);

    instance = createPopper(trigger, popover, {
      placement: placement,
      modifiers: [
        offset
          ? {
              name: "offset",
              options: {
                offset,
              },
            }
          : {},
        isSameWidth ? sameWidth : {},
        {
          name: "flip",
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "document",
          },
        },
      ],
    });

    if (hideEvent == "clickOutside")
      document.addEventListener("mousedown", checkForClickOutside);

    onOpen(trigger, popover);
  };

  trigger.addEventListener(showEvent, open);

  if (hideEvent == "mouseleave") trigger.addEventListener(hideEvent, close);
};
