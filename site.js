"use strict";
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
if (menuButton && nav) {
  menuButton.hidden = false;
  nav.classList.add("enhanced-nav");
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    nav.classList.toggle("is-open", opening);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
}
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
// Progressive enhancement only: ordinary native POST works without JavaScript.
const form = document.querySelector("#project-form");
if (form) {
  const chosenService = new URLSearchParams(window.location.search).get(
    "service",
  );
  const option = Array.from(form.elements.service.options).find(
    (item) => item.dataset.service === chosenService,
  );
  if (option) form.elements.service.value = option.value;
}

// Real, local screenshots. External demos are links, never embedded or executed here.
const projectDialog = document.querySelector("#project-dialog");
if (projectDialog && typeof projectDialog.showModal === "function") {
  const previewImage = document.querySelector("#preview-image");
  const previewHeading = document.querySelector("#preview-heading");
  const modeButtons = projectDialog.querySelectorAll("[data-mode]");
  const validProjects = new Set([
    "booking",
    "island",
    "ember",
    "event",
    "service",
  ]);
  let activeProject = "";
  let activeName = "";
  let opener = null;
  const showMode = (mode) => {
    if (
      !validProjects.has(activeProject) ||
      !["desktop", "mobile"].includes(mode)
    )
      return;
    previewImage.src = `assets/portfolio/${activeProject}-${mode}.webp`;
    previewImage.alt = `${activeName} demo website, ${mode} screenshot`;
    previewImage.width = mode === "mobile" ? 390 : 1440;
    previewImage.height = mode === "mobile" ? 844 : 1000;
    projectDialog.dataset.mode = mode;
    modeButtons.forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode)),
    );
  };
  document.querySelectorAll(".preview-trigger").forEach((button) => {
    if (!validProjects.has(button.dataset.project)) return;
    button.hidden = false;
    button.addEventListener("click", () => {
      opener = button;
      activeProject = button.dataset.project;
      activeName = button.dataset.title;
      previewHeading.textContent = activeName;
      showMode(
        window.matchMedia("(max-width: 600px)").matches ? "mobile" : "desktop",
      );
      projectDialog.showModal();
      document.body.classList.add("preview-open");
    });
  });
  modeButtons.forEach((button) =>
    button.addEventListener("click", () => showMode(button.dataset.mode)),
  );
  projectDialog
    .querySelector(".preview-close")
    .addEventListener("click", () => projectDialog.close());
  projectDialog.addEventListener("click", (event) => {
    if (event.target !== projectDialog) return;
    const bounds = projectDialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      projectDialog.close();
  });
  projectDialog.addEventListener("close", () => {
    document.body.classList.remove("preview-open");
    previewImage.removeAttribute("src");
    opener?.focus();
  });
}

// Inclusive portfolio filters: add a real category only when a real project exists.
// Native buttons use aria-pressed (these filter results; they are not ARIA tabs).
const workControls = document.querySelector(".work-controls");
if (workControls) {
  const items = Array.from(document.querySelectorAll("[data-work-item]"));
  const buttons = Array.from(workControls.querySelectorAll("[data-category]"));
  const search = document.querySelector("#work-search");
  const results = document.querySelector("#work-results");
  const empty = document.querySelector(".work-empty");
  const websites = document.querySelector("#website-projects");
  const validCategories = new Set(
    buttons.map((button) => button.dataset.category),
  );
  let category = "all";
  const applyFilters = (updateUrl = true) => {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const item of items) {
      const matchesCategory =
        category === "all" || item.dataset.workItem === category;
      const matchesSearch =
        !term || item.textContent.toLocaleLowerCase().includes(term);
      item.hidden = !(matchesCategory && matchesSearch);
      if (!item.hidden) visible++;
    }
    websites.hidden = !items.some(
      (item) => item.dataset.workItem === "websites" && !item.hidden,
    );
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      ),
    );
    const categoryLabel = buttons
      .find((button) => button.dataset.category === category)
      .textContent.trim();
    results.textContent = `${visible} ${visible === 1 ? "project" : "projects"} shown${category === "all" ? "" : ` in ${categoryLabel}`}${term ? " matching your search" : ""}.`;
    empty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (category === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", category);
      if (search.value.trim()) url.searchParams.set("q", search.value.trim());
      else url.searchParams.delete("q");
      // Do not preserve an old project fragment that the new filters may hide.
      url.hash = "";
      window.history.replaceState(null, "", url);
    }
  };
  const revealAnchor = () => {
    const target = document.getElementById(window.location.hash.slice(1));
    const item = target?.closest("[data-work-item]");
    if (!item) return;
    category = item.dataset.workItem;
    search.value = "";
    applyFilters(false);
  };
  const readUrl = () => {
    const query = new URLSearchParams(window.location.search);
    category = validCategories.has(query.get("category"))
      ? query.get("category")
      : "all";
    search.value = (query.get("q") || "").slice(0, 100);
    applyFilters(false);
    revealAnchor();
  };
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.category;
      applyFilters();
    }),
  );
  search.addEventListener("input", () => applyFilters());
  document.querySelector("#reset-work").addEventListener("click", () => {
    category = "all";
    search.value = "";
    applyFilters();
    buttons[0].focus();
  });
  window.addEventListener("popstate", readUrl);
  window.addEventListener("hashchange", revealAnchor);
  workControls.hidden = false;
  results.hidden = false;
  readUrl();
}
