import { siteMap } from "./site-map";

const container = document.getElementById("dynamic-content-container");

const createLink = (name, link) => {
  let htmlString = `<div class="co--side-nav__item">
  <div
    data-href="${link}"
    class="co--side-nav__link"
  >
    <span class="co--side-nav__link-text">
      ${name}
    </span>
  </div>
</div>`;

  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

window.onload = () => {
  console.log("test", siteMap);

  const items = document.querySelector(".co--side-nav__items");
  Object.entries(siteMap).forEach((entry) => {
    items.append(createLink(entry[0], entry[1]));
  });

  document.getElementById("theme-selector").addEventListener("change", (ev) => {
    const wrapper = document.getElementById("app-wrapper");

    wrapper.className = `theme-${ev.target.value}`;
  });

  const handleClick = (link) => {
    const href = link.getAttribute("data-href");
    if (!href) return;

    let headers = new Headers();
    headers.append("Content-Type", "text/html");

    fetch(href, { method: "GET", headers })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        if (!response) return;

        container.innerHTML = response;
      });
  };

  document.querySelectorAll(".co--side-nav__link").forEach((link) => {
    link.addEventListener("click", (ev) => handleClick(link));
  });

  const firstLink = document.querySelectorAll(".co--side-nav__link")[0];

  if (firstLink) handleClick(firstLink);
};