import { siteMap } from "./site-map";
import { initiateTooltips } from "./components/tooltip/tooltip";
import { initiatePopovers } from "./components/popover/popover";
import { initiateTabs } from "./components/tabs/tabs";
import { initiateNotification } from "./components/notification/notification";
import { initiateModal } from "./components/modal/modal";
import { initiateDropdowns } from "./components/form/dropdown/dropdown";
import { initiateMultiSelects } from "./components/form/multi-select/multi-select";
import { initiateChips } from "./components/form/chips/chips";
import { initiateOverflowMenus } from "./components/overflow-menu/overflow-menu";
import { initiateDataTables } from "./components/data-table/data-table";
import { initiatePaginations } from "./components/pagination/pagination";
import { initiateAccordions } from "./components/accordion/accordion";

import { initiateCalenders } from "./components/date-picker/calender/date-picker-calender";
import { initiateContentSwitchers } from "./components/form/content-switcher/content-switcher";
import { initiateToggleButtons } from "./components/form/toggle-buttons/toggle-buttons";

const container = document.getElementById("dynamic-content-container");

const createLink = (name, link) => {
  let htmlString = `<div class="co--side-nav__item" >
  <a
    data-href="${link}"
    data-name="${name}"
    class="co--side-nav__link"
    tabindex="1"
    href="#${name}"
  >
    <span class="co--side-nav__link-text">
      ${name}
    </span>
  </a>
</div>`;

  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

const clearLinksCurrentState = () => {
  const links = document.querySelectorAll(".co--side-nav__link");
  links.forEach((link) => link.classList.remove("co--side-nav__link--current"));
};

const handleClick = (items, link) => {
  const href = link.getAttribute("data-href");
  if (!href) return;

  clearLinksCurrentState(items);

  link.classList.add("co--side-nav__link--current");

  let headers = new Headers();
  headers.append("Content-Type", "text/html");

  fetch(href, { method: "GET", headers })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      if (!response) return;

      container.innerHTML = response;

      initiateAccordions();
      initiateTooltips();
      initiatePopovers();
      initiateDropdowns();
      initiateOverflowMenus();
      initiateTabs();
      initiateNotification();
      initiateModal();
      initiateMultiSelects();
      initiateChips();
      initiatePaginations();
      initiateDataTables();
      initiateContentSwitchers();
      initiateToggleButtons();
      initiateCalenders();
    });
};

const findHashLink = () => {
  let hash = window.location.hash;
  if (!hash) return;

  hash = decodeURI(hash.replace("#", ""));

  console.log({ hash });

  return document.querySelectorAll(
    `.co--side-nav__link[data-name="${hash}"]`
  )[0];
};

const navigateToHash = (links) => {
  let hashLink = findHashLink();

  if (hashLink) handleClick(links, hashLink);
  else {
    let firstLink = document.querySelectorAll(".co--side-nav__link")[0];

    if (firstLink) handleClick(links, firstLink);
  }
};

window.onload = () => {
  const items = document.querySelector(".co--side-nav__items");
  Object.entries(siteMap).forEach((entry) => {
    items.append(createLink(entry[0], entry[1]));
  });

  document.getElementById("theme-selector").addEventListener("change", (ev) => {
    const wrapper = document.getElementById("app-wrapper");

    wrapper.className = `theme-${ev.target.value}`;
  });

  navigateToHash(items);

  document.querySelectorAll(".co--side-nav__link").forEach((link) => {
    link.addEventListener("click", (ev) => handleClick(items, link));
  });
};
