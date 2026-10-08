(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const year = document.querySelector("#current-year");
  const brochureLinks = document.querySelectorAll("[data-brochure-request]");
  const serviceButtons = document.querySelectorAll("[data-service]");
  const serviceInputs = [...document.querySelectorAll('input[name="services"]')];
  const serviceDropdown = document.querySelector(".service-multiselect");
  const reviewCarousel = document.querySelector("[data-review-carousel]");
  const reviewTrack = reviewCarousel?.querySelector(".review-track");
  const reviewPrevious = document.querySelector("[data-review-prev]");
  const reviewNext = document.querySelector("[data-review-next]");

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

  const moveReviews = (direction) => {
    if (!reviewCarousel || !reviewTrack) return;
    const firstSlide = reviewTrack.querySelector(".review-slide");
    const gap = Number.parseFloat(getComputedStyle(reviewTrack).columnGap) || 18;
    const distance = (firstSlide?.getBoundingClientRect().width || reviewCarousel.clientWidth) + gap;
    const maxScroll = reviewCarousel.scrollWidth - reviewCarousel.clientWidth;
    const atEnd = reviewCarousel.scrollLeft >= maxScroll - 8;
    const atStart = reviewCarousel.scrollLeft <= 8;

    if (direction > 0 && atEnd) reviewCarousel.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction < 0 && atStart) reviewCarousel.scrollTo({ left: maxScroll, behavior: "smooth" });
    else reviewCarousel.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  reviewPrevious?.addEventListener("click", () => moveReviews(-1));
  reviewNext?.addEventListener("click", () => moveReviews(1));
  reviewCarousel?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveReviews(-1);
    if (event.key === "ArrowRight") moveReviews(1);
  });

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
      target.scrollIntoView({ behavior: "auto", block: "start" });
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
      if (serviceDropdown) serviceDropdown.open = true;

      if (message && selectedService && !message.value.trim()) {
        message.value = `I would like to know more about ${selectedService}.`;
      }

      contact?.scrollIntoView({ behavior: "auto", block: "start" });
      window.setTimeout(() => selectedInput?.focus(), 650);
    });
  });

  const problemTabs = [...document.querySelectorAll(".problem-tab")];
  const problemScreenBody = document.querySelector(".problem-detail-panel");
  const problemTitle = document.querySelector("[data-problem-title]");
  const problemCopy = document.querySelector("[data-problem-copy]");

  const selectProblem = (tab) => {
    if (!tab || !problemScreenBody || !problemTitle || !problemCopy) return;
    problemTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    problemScreenBody.classList.add("is-changing");
    window.setTimeout(() => {
      problemTitle.textContent = tab.dataset.title || "";
      problemCopy.textContent = tab.dataset.copy || "";
      problemScreenBody.classList.remove("is-changing");
    }, 180);
  };

  problemTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectProblem(tab));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = problemTabs[(index + direction + problemTabs.length) % problemTabs.length];
      selectProblem(next);
      next.focus();
    });
  });

  const audienceCards = [...document.querySelectorAll(".audience-card")];
  audienceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      audienceCards.forEach((item) => item.classList.remove("is-flipped"));
      card.classList.add("is-flipped");
    });
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      const willFlip = !card.classList.contains("is-flipped");
      audienceCards.forEach((item) => item.classList.remove("is-flipped"));
      card.classList.toggle("is-flipped", willFlip);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); card.click(); }
    });
    card.addEventListener("mouseleave", () => card.classList.remove("is-flipped"));
  });

  const faqItems = [...document.querySelectorAll('.faq-list details')];
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  updateHeader();
  updateActiveLink();
})();
