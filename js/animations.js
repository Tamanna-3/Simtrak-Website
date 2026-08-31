(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = [...document.querySelectorAll(".reveal-item")];
  const revealHeadings = [...document.querySelectorAll(".reveal-text")];

  revealHeadings.forEach((heading) => {
    const words = heading.textContent.trim().split(/\s+/);
    heading.textContent = "";

    words.forEach((word, index) => {
      const clip = document.createElement("span");
      const inner = document.createElement("span");
      clip.className = "word";
      inner.textContent = word;
      inner.style.setProperty("--word-index", index);
      clip.appendChild(inner);
      heading.appendChild(clip);
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    revealHeadings.forEach((heading) => heading.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

    [...revealItems, ...revealHeadings].forEach((item) => observer.observe(item));
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const heroVisual = document.querySelector(".hero-visual");
    const parallaxLayers = heroVisual ? [...heroVisual.querySelectorAll(".parallax-layer")] : [];

    if (heroVisual && parallaxLayers.length) {
      heroVisual.addEventListener("pointermove", (event) => {
        const rect = heroVisual.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

        parallaxLayers.forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0.5);
          layer.style.setProperty("--parallax-x", `${offsetX * 24 * depth}px`);
          layer.style.setProperty("--parallax-y", `${offsetY * 20 * depth}px`);
        });
      });

      heroVisual.addEventListener("pointerleave", () => {
        parallaxLayers.forEach((layer) => {
          layer.style.setProperty("--parallax-x", "0px");
          layer.style.setProperty("--parallax-y", "0px");
        });
      });
    }

    document.querySelectorAll(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.13}px)`;
      });

      button.addEventListener("pointerleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });

    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 4}deg) translateY(-5px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });

    document.querySelectorAll(".hero, .why-section").forEach((section) => {
      const light = section.querySelector(".cursor-light");
      if (!light) return;

      section.addEventListener("pointermove", (event) => {
        const rect = section.getBoundingClientRect();
        light.style.left = `${event.clientX - rect.left}px`;
        light.style.top = `${event.clientY - rect.top}px`;
      });
    });
  }

  const timeline = document.querySelector("#process-timeline");
  if (timeline) {
    let timelineQueued = false;

    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportMarker = window.innerHeight * 0.68;
      const travelled = viewportMarker - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / Math.max(rect.height, 1)));
      timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);
      timelineQueued = false;
    };

    const queueTimeline = () => {
      if (timelineQueued) return;
      timelineQueued = true;
      window.requestAnimationFrame(updateTimeline);
    };

    window.addEventListener("scroll", queueTimeline, { passive: true });
    window.addEventListener("resize", queueTimeline);
    updateTimeline();
  }
})();
