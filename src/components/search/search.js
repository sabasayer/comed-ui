export const initiateSearch = () => {
  const searches = document.querySelectorAll(".co--search");

  searches.forEach((search) => {
    const input = search.querySelector(".co--search-input");
    const icon = search.querySelector(".co--search-close");

    if (!input || !icon) return;

    input.addEventListener("input", () => {
      const hasValue = !!input.value;
      if (hasValue) {
        icon.classList.remove("co--search-close--hidden");
      } else {
        icon.classList.add("co--search-close--hidden");
      }
    });
  });
};
