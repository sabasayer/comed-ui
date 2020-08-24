window.onload = () => {
  console.log("test");

  document.getElementById("theme-selector").addEventListener("change", (ev) => {
    console.log("ev", ev);

    const wrapper = document.getElementById("app-wrapper");

    wrapper.className = `theme-${ev.target.value}`;
  });
};
