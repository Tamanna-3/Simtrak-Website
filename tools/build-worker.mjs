import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const textFiles = [
  "index.html",
  "recruitment-management.html",
  "graphic-designing.html",
  "task-management.html",
  "social-media-management.html",
  "webinar-management.html",
  "careers.html",
  "career-business-development.html",
  "career-digital-marketing.html",
  "career-graphic-design.html",
  "career-general-management.html",
  "career-human-resources.html",
  "blogs.html",
  "blog.html",
  "privacy-policy.html",
  "terms-and-conditions.html",
  "cookie-policy.html",
  "404.html",
  "css/style.css",
  "css/service-detail.css",
  "css/animations.css",
  "css/responsive.css",
  "js/main.js",
  "js/animations.js",
  "js/menu.js",
  "js/form.js",
  "js/service-detail.js",
  "js/careers.js",
  "js/blogs.js",
  "js/cookie-consent.js",
  "js/blog-article-layout.js"
];

const binaryFiles = [
  "assets/logo/simtrak-logo.png",
  "assets/logo/simtrak-logo-white.png",
  "assets/logo/favicon.png",
  "assets/founder/simran-sharma-headshot.jpg",
  "assets/hero/business-team-illustration.png",
  "assets/hero/business-support-loop.mp4",
  "assets/hero/team-cuate.svg",
  "assets/hero/business.jpg",
  "assets/hero/startups.webp",
  "assets/hero/ngo.jpg",
  "assets/portfolio/graphic-design/design-01.png",
  "assets/portfolio/graphic-design/design-02.png",
  "assets/portfolio/graphic-design/design-03.png",
  "assets/portfolio/graphic-design/design-04.png",
  "assets/portfolio/graphic-design/design-05.png",
  "assets/portfolio/graphic-design/design-06.png",
  "assets/portfolio/graphic-design/design-07.png",
  "assets/portfolio/graphic-design/design-08.png",
  "assets/portfolio/graphic-design/design-09.png",
  "assets/portfolio/graphic-design/design-10.png",
  "assets/clients/encodiq.webp",
  "assets/clients/shubank.webp",
  "assets/clients/garg.webp",
  "assets/clients/ascend.png",
  "assets/clients/jit.png",
  "assets/clients/monash-university.png",
  "assets/clients/partner-brand.png",
  "assets/clients/impact.png",
  "assets/clients/esi-laundry.png",
  "assets/clients/storewise.png",
  "assets/clients/superprocure.png",
  "assets/clients/garg.png",
  "assets/clients/foreword.png",
  "assets/clients/inseeds.png",
  "assets/clients/fortale-living.png",
  "assets/clients/weeho.png",
  "assets/clients/tici.png",
  "assets/clients/gaaba.png",
  "assets/clients/safe-water-education-centre.png",
  "assets/clients/adore.png",
  "assets/clients/vision-for-improvement.png",
  "assets/clients/kumar-the-marketer.png",
  "assets/clients/dip-dips.png",
  "assets/clients/vidyakiran.png",
  "assets/clients/young-leader.png",
  "assets/documents/simtrak-solutions-brochure.pdf"
];

for (const name of fs.readdirSync(path.join(root, "assets/portfolio/graphic-design/storewise"))) {
  if (name.endsWith(".webp")) binaryFiles.push(`assets/portfolio/graphic-design/storewise/${name}`);
}

const typeFor = (file) => {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpeg") || file.endsWith(".jpg")) return "image/jpeg";
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".pdf")) return "application/pdf";
  if (file.endsWith(".mp4")) return "video/mp4";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
};

const files = {};

for (const file of textFiles) {
  files[`/${file}`] = {
    body: fs.readFileSync(path.join(root, file), "utf8"),
    type: typeFor(file),
    binary: false
  };
}

for (const file of binaryFiles) {
  files[`/${file}`] = {
    body: fs.readFileSync(path.join(root, file)).toString("base64"),
    type: typeFor(file),
    binary: true
  };
}

files["/"] = files["/index.html"];

const output = `const files = ${JSON.stringify(files)};

const decodeBase64 = (value) => {
  const raw = atob(value);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);
  return bytes;
};

export default {
  async fetch(request, env, ctx) {
    void env;
    void ctx;
    const url = new URL(request.url);
    const entry = files[url.pathname];
    if (!entry) {
      const missing = files["/404.html"];
      return new Response(missing.body, {
        status: 404,
        headers: { "content-type": missing.type, "cache-control": "public, max-age=300" }
      });
    }
    const body = entry.binary ? decodeBase64(entry.body) : entry.body;
    return new Response(body, {
      headers: {
        "content-type": entry.type,
        "cache-control": entry.binary ? "public, max-age=604800" : "public, max-age=300"
      }
    });
  }
};
`;

fs.writeFileSync(path.join(root, "worker/index.js"), output);
console.log("Worker bundle created from the static website files.");
