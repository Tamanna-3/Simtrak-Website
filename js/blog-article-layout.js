(() => {
  "use strict";
  const root = document.querySelector("#article-root");
  if (!root || !window.SIMTRAK_POSTS) return;
  const slug = new URLSearchParams(location.search).get("post");
  const post = window.SIMTRAK_POSTS.find(item => item[0] === slug) || window.SIMTRAK_POSTS[0];
  const headings = ["The Core Idea", "What Businesses Should Notice", "How to Put It Into Practice", "The Takeaway", "What to Prepare"];
  root.innerHTML = `<article class="blog-article">
    <header><div class="detail-container"><a href="blogs.html">← Back to insights</a><span>${post[2]}</span><h1>${post[1]}</h1><p>${post[3]}</p><div class="article-meta"><small>Simtrak Insights</small><small>${Math.max(5, post[4].length + 3)} min read</small><small>Business guidance</small></div></div></header>
    <div class="detail-container article-body"><div class="article-opening"><p>${post[3]}</p></div>${post[4].map((text,index)=>`<section><h2>${headings[index] || `Key Insight ${index + 1}`}</h2><p>${text}</p></section>`).join("")}<aside><span>Need practical support?</span><h2>Turn the insight into action.</h2><p>Tell us what your business needs and we will help identify the right area of support.</p><a href="index.html#contact">Start a conversation →</a></aside></div>
  </article>`;
})();
