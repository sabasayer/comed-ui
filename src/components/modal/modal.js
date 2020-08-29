export const initiateModal = () => {
  const triggers = document.querySelectorAll("[data-modal-target]");

  triggers.forEach((trigger) => {
    const target = trigger.getAttribute("data-modal-target");

    if (!target) return;

    trigger.addEventListener("click", () => {
      const modal = document.querySelector(target);

      if (!modal) return;

      modal.classList.add("is-visible");
    });
  });

  const modals = document.querySelectorAll(".co--modal");

  modals.forEach((modal) => {
    modal.addEventListener("click", (ev) => {
      if (ev.target !== ev.currentTarget) return;

      modal.classList.remove("is-visible");
    });

    const closeButtons = modal.querySelectorAll("[data-modal-close]");

    closeButtons.forEach((closeButton) =>
      closeButton.addEventListener("click", (ev) => {
        modal.classList.remove("is-visible");
      })
    );
  });
};
