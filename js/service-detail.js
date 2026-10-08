(() => {
  "use strict";
  document.querySelectorAll('a[href*="1FAIpQLSc"]').forEach(link => { link.href = "https://docs.google.com/forms/d/1kBnEpLv2b-nOMh9k_-PNIQaXnUQmE8ydAgq4OlA5EJE/viewform"; });
  const nav = document.querySelector('.detail-nav-inner');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const legalPages = ['privacy-policy.html', 'terms-and-conditions.html', 'cookie-policy.html', '404.html'];
  const careerPage = currentPage === 'careers.html' || currentPage.startsWith('career-');
  const blogPage = currentPage === 'blogs.html' || currentPage === 'blog.html';
  const servicePage = !careerPage && !blogPage && !legalPages.includes(currentPage);
  const navItems = [
    ['index.html', 'Home', false],
    ['index.html#about', 'About', false],
    ['index.html#services', 'Our Services', servicePage],
    ['blogs.html', 'Blogs', blogPage],
    ['careers.html', 'Careers', careerPage],
    ['index.html#contact', 'Contact Us', false]
  ];
  const navLinks = navItems.map(([href, label, active]) => `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`).join('');
  if (nav) nav.innerHTML = `<a class="detail-brand" href="index.html"><img src="assets/logo/simtrak-logo.png" alt="Simtrak Solutions"></a><div class="detail-menu">${navLinks}</div><details class="detail-mobile-nav"><summary aria-label="Open navigation"><span></span><span></span><span></span></summary><div>${navLinks}</div></details><a class="detail-cta" href="index.html#contact"><span>Get A Quote</span><b aria-hidden="true">→</b></a>`;
  const footer = document.querySelector('.detail-footer');
  if (footer) footer.innerHTML = `<div class="detail-footer-vector" aria-hidden="true"><span></span><span></span><span></span></div><div class="detail-container detail-footer-grid"><div><img src="assets/logo/simtrak-logo-white.png" alt="Simtrak Solutions"><p>Professional business services supporting operations, people, branding, marketing and growth.</p><div class="detail-footer-address"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg><span>Garg House, 11A/1D, E Topsia Road, Mirania Gardens, East Topsia, Kolkata, West Bengal 700046</span></div></div><div><strong>Explore</strong><div class="detail-footer-links single"><a href="index.html">Home</a><a href="index.html#about">About Simtrak</a><a href="index.html#services">Our Services</a><a href="index.html#blogs">Blogs</a><a href="careers.html">Careers</a><a href="index.html#contact">Contact Us</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms and Conditions</a><a href="cookie-policy.html">Cookie Policy</a><a href="assets/documents/simtrak-solutions-brochure.pdf" download>Company Brochure</a></div></div><div><strong>Services</strong><div class="detail-footer-links"><a href="recruitment-management.html">Recruitment Management</a><a href="graphic-designing.html">Graphic Designing</a><a href="task-management.html">Task Management</a><a href="social-media-management.html">Social Media Management</a><a href="index.html#services">Lead Generation</a><a href="webinar-management.html">Webinar Management</a><a href="index.html#services">Customer Feedback</a><a href="index.html#services">Web Development</a><a href="index.html#services">Market Research</a><a href="social-media-management.html">Digital Marketing</a></div></div></div><div class="detail-container detail-footer-bottom"><span>© 2026 Simtrak Solutions. All rights reserved.</span><div class="detail-footer-meta"><span>Established in 2021</span><div class="detail-socials"><a href="https://www.instagram.com/simtraksolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/></svg></a><a href="https://www.linkedin.com/company/simtraksolutions/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3Zm7 0h4v1.6c1-1.3 2.3-2 4-2 3 0 4 2 4 5.3V21h-4v-5.5c0-1.5-.5-2.5-1.9-2.5-1.5 0-2.1 1.1-2.1 2.8V21h-4Z"/></svg></a><a href="https://api.whatsapp.com/send/?phone=919555299371" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M20.5 3.5A11 11 0 0 0 3.2 16.8L2 22l5.3-1.2A11 11 0 0 0 20.5 3.5Zm-8.5 16a8.5 8.5 0 0 1-4.3-1.2l-.3-.2-3.1.7.7-3-.2-.3A8.5 8.5 0 1 1 12 19.5Zm4.7-6.3c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.2l-.8 1c-.1.2-.3.2-.6.1-1.5-.7-2.5-1.4-3.5-3.1-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9 2.1.9 2.9 1 3.9.8 1.2-.2 1.6-1 1.8-1.9.2-.8.2-1.5.1-1.6-.2-.2-.4-.3-.7-.4Z"/></svg></a></div></div></div>`;
  if (!document.querySelector('script[src="js/cookie-consent.js"]')) {
    const cookieScript = document.createElement('script');
    cookieScript.src = 'js/cookie-consent.js';
    document.body.appendChild(cookieScript);
  }
  const stage = document.querySelector("[data-portfolio-stage]");
  const articleGrid = document.querySelector('.article-grid');
  if (articleGrid) articleGrid.insertAdjacentHTML('beforeend','<a class="article-card article-violet" data-category="Business Productivity" href="https://simtrak.in/strategies-for-improving-business-productivity/" target="_blank" rel="noopener noreferrer"><div class="article-card-visual"><span>Productivity</span><b>↗</b></div><div class="article-card-copy"><span>Business Productivity · 6 min read</span><h2>Strategies for Improving Business Productivity</h2><p>Practical ways to help teams work with greater focus, structure and efficiency.</p><b>Read article →</b></div></a><a class="article-card article-blue" data-category="Business Growth" href="https://simtrak.in/ways-to-expand-your-business/" target="_blank" rel="noopener noreferrer"><div class="article-card-visual"><span>Growth</span><b>＋</b></div><div class="article-card-copy"><span>Business Growth · 6 min read</span><h2>Ways to Expand Your Business</h2><p>Explore practical routes to reach new customers, markets and growth opportunities.</p><b>Read article →</b></div></a>');
  if (stage && !stage.children.length) {
    const designs = Array.from({length:10},(_,i)=>`assets/portfolio/graphic-design/design-${String(i+1).padStart(2,"0")}.png`);
    const storewise = Array.from({length:56},(_,i)=>`assets/portfolio/graphic-design/storewise/storewise-${String(i+1).padStart(2,"0")}.webp`);
    stage.innerHTML = [...designs,...storewise].map((src,index)=>`<figure class="portfolio-card"><img src="${src}" alt="Graphic design portfolio work ${index+1}"${index > 4 ? ' loading="lazy"' : ''}></figure>`).join('');
  }
  if (!stage) return;
  const cards = [...stage.querySelectorAll(".portfolio-card")];
  cards.forEach(card => {
    const poster = card.querySelector("img");
    const fitCard = () => {
      if (poster.naturalWidth && poster.naturalHeight) card.style.setProperty("--poster-ratio", String(poster.naturalWidth / poster.naturalHeight));
    };
    poster.complete ? fitCard() : poster.addEventListener("load", fitCard, { once: true });
  });
  let active = 0;
  const render = () => cards.forEach((card,index) => {
    let position = index - active;
    if (position > cards.length / 2) position -= cards.length;
    if (position < -cards.length / 2) position += cards.length;
    card.dataset.position = Math.abs(position) > 2 ? "hidden" : String(position);
  });
  const move = direction => { active = (active + direction + cards.length) % cards.length; render(); };
  document.querySelector("[data-portfolio-prev]")?.addEventListener("click",()=>move(-1));
  document.querySelector("[data-portfolio-next]")?.addEventListener("click",()=>move(1));
  stage.addEventListener("keydown",event=>{ if(event.key === "ArrowLeft") move(-1); if(event.key === "ArrowRight") move(1); });
  render();
})();
