(() => {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  const links = menu ? [...menu.querySelectorAll("a")] : [];

  if (!toggle || !menu) return;

  const setMenuState = (open) => {
    toggle.classList.toggle("active", open);
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.setAttribute("aria-hidden", String(!open));

    if (open && links[0]) {
      window.setTimeout(() => links[0].focus(), 180);
    }
  };

  toggle.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("open"));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      setMenuState(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && menu.classList.contains("open")) {
      setMenuState(false);
    }
  });
})();
