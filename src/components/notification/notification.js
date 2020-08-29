import { DomUtil } from "@sabasayer/utils";

const notificationClose = (closeButtonClass, notificationClass) => {
  const closeButtons = document.querySelectorAll(`.${closeButtonClass}`);

  closeButtons.forEach((button) => {
    button.addEventListener("click", (ev) => {
      const notification = DomUtil.findParentElement(button, notificationClass);

      if (!notification) return;

      notification.remove();
    });
  });
};

export const initiateNotification = () => {
  notificationClose(
    "co--toast-notification__close-button",
    "co--toast-notification"
  );
  notificationClose(
    "co--inline-notification__close-button",
    "co--inline-notification"
  );
};
