import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const textFiles = [
  "index.html",
  "css/style.css",
  "css/animations.css",
  "css/responsive.css",
  "js/main.js",
  "js/animations.js",
  "js/menu.js",
  "js/form.js"
];

const binaryFiles = [
  "assets/logo/simtrak-logo.png",
  "assets/founder/simran-sharma.jpeg",
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
  "assets/clients/garg-foundation.png",
  "assets/clients/foreword.png",
  "assets/clients/inseeds.png",
  "assets/clients/fortale-living.png",
  "assets/clients/weeho.png",
  "assets/clients/tici.png",
  "assets/clients/gaaba.png",
  "assets/clients/safe-water-education-centre.png"
];

const typeFor = (file) => {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpeg") || file.endsWith(".jpg")) return "image/jpeg";
  if (file.endsWith(".webp")) return "image/webp";
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
    if (!entry) return new Response("Not found", { status: 404 });
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
