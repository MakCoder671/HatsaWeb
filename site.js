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
const form = document.querySelector("#project-form");
if (form) {
  const service = form.elements.service;
  const chosenService = new URLSearchParams(window.location.search).get(
    "service",
  );
  if (
    Array.from(service.options).some((option) => option.value === chosenService)
  )
    service.value = chosenService;
  const status = document.querySelector("#form-status");
  const email = window.HATSA_CONFIG?.contactEmail?.trim() || "";
  // Deliberately reject malformed/multiple recipients and line breaks.
  const emailReady = /^[^\s@,;?]+@[^\s@,;?]+\.[^\s@,;?]+$/.test(email);
  const brief = () => {
    const data = new FormData(form);
    return `Hatsa Web project enquiry\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nBusiness: ${data.get("business") || "Not provided"}\nService: ${service.selectedOptions[0].textContent}\nWebsite: ${data.get("website") || "Not provided"}\n\n${data.get("message")}\n`;
  };
  if (emailReady) {
    const notice = document.querySelector("#contact-notice");
    notice.replaceChildren();
    const label = document.createElement("strong");
    label.textContent = "Get in touch";
    const address = document.createElement("a");
    address.href = `mailto:${email}`;
    address.textContent = email;
    notice.append(label, document.createElement("br"), address);
    document.querySelector("#brief-action").textContent = "Open email draft ↗";
    document.querySelector("#form-explanation").textContent =
      "Opens your email app with a draft. Review and send it there. This website does not send it for you.";
    document.querySelector(
      ".contact-layout + section > p:not(.small)",
    ).textContent =
      "We’ll discuss the project, check it’s a good fit, and agree on a scope and quote before any work starts.";
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (emailReady) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Project enquiry: " + service.selectedOptions[0].textContent)}&body=${encodeURIComponent(brief())}`;
      status.textContent =
        "Email draft requested. Send it in your mail app. If nothing opens, copy your brief and email it to the address above.";
      return;
    }
    const url = URL.createObjectURL(
      new Blob([brief()], { type: "text/plain;charset=utf-8" }),
    );
    const download = document.createElement("a");
    download.href = url;
    download.download = "hatsa-project-brief.txt";
    document.body.append(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent =
      "Your brief was downloaded. Nothing was sent to Hatsa Web. Keep it until contact details are published.";
  });
  document.querySelector("#copy-brief").addEventListener("click", async () => {
    if (!form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(brief());
      status.textContent = "Brief copied. Nothing was sent.";
    } catch {
      status.textContent =
        "Clipboard access is unavailable. Use the download button, or select and copy your entries manually.";
    }
  });
}
