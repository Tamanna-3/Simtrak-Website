(() => {
  "use strict";
  const key = "simtrak_cookie_preference";
  if (localStorage.getItem(key)) return;

  const banner = document.createElement("section");
  banner.className = "cookie-consent";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Cookie preferences");
  banner.innerHTML = `
    <div class="cookie-copy">
      <span>YOUR PRIVACY MATTERS</span>
      <h2>We use cookies to improve your experience</h2>
      <p>Necessary cookies keep the website working. With your permission, optional cookies help us understand how the website is used.</p>
      <a href="cookie-policy.html">Read our Cookie Policy</a>
    </div>
    <div class="cookie-actions">
      <button type="button" class="cookie-secondary" data-cookie="necessary">Necessary only</button>
      <button type="button" class="cookie-settings" data-cookie="settings">Manage preferences</button>
      <button type="button" class="cookie-primary" data-cookie="all">Accept all</button>
    </div>
    <div class="cookie-preferences" hidden>
      <label><span><strong>Necessary cookies</strong><small>Required for core website functions.</small></span><input type="checkbox" checked disabled></label>
      <label><span><strong>Analytics cookies</strong><small>Help us understand website usage.</small></span><input id="cookie-analytics" type="checkbox"></label>
      <button type="button" class="cookie-primary" data-cookie="save">Save preferences</button>
    </div>`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add("is-visible"));

  const save = (value) => {
    localStorage.setItem(key, value);
    banner.classList.remove("is-visible");
    setTimeout(() => banner.remove(), 260);
  };
  banner.addEventListener("click", (event) => {
    const action = event.target.closest("[data-cookie]")?.dataset.cookie;
    if (!action) return;
    if (action === "all") save("all");
    if (action === "necessary") save("necessary");
    if (action === "settings") banner.querySelector(".cookie-preferences").hidden = false;
    if (action === "save") save(banner.querySelector("#cookie-analytics").checked ? "analytics" : "necessary");
  });
})();
