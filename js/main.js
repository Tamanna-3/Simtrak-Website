(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const year = document.querySelector("#current-year");
  const brochureLinks = document.querySelectorAll("[data-brochure-request]");
  const serviceButtons = document.querySelectorAll("[data-service]");
  const serviceInputs = [...document.querySelectorAll('input[name="services"]')];

  const chooseService = (serviceName) => {
    const input = serviceInputs.find((item) => item.value === serviceName);
    if (!input) return null;
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return input;
  };

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 28);
  };

  const updateActiveLink = () => {
    if (!sections.length) return;

    const marker = window.scrollY + 180;
    let currentId = "home";

    sections.forEach((section) => {
      if (section.offsetTop <= marker) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  let scrollQueued = false;
  const handleScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      updateHeader();
      updateActiveLink();
      scrollQueued = false;
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  brochureLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const message = document.querySelector("#message");

      chooseService("Company Brochure");
      if (message && !message.value.trim()) {
        message.value = "Please share the latest Simtrak company brochure with me.";
      }
    });
  });

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const message = document.querySelector("#message");
      const contact = document.querySelector("#contact");
      const selectedService = button.dataset.service;
      const selectedInput = chooseService(selectedService);

      if (message && selectedService && !message.value.trim()) {
        message.value = `I would like to know more about ${selectedService}.`;
      }

      contact?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => selectedInput?.focus(), 650);
    });
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  updateHeader();
  updateActiveLink();
})();
