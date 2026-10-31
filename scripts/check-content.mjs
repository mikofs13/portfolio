import { readFileSync, existsSync } from "node:fs";
import { resolve, sep } from "node:path";

const site = JSON.parse(readFileSync("content/site.json", "utf8"));
const projects = JSON.parse(readFileSync("content/projects.json", "utf8"));
function text(v, label) { if (typeof v !== "string" || !v.trim()) throw new Error(`${label} needs nonempty text.`); }
function url(v, label) { const parsed = new URL(v); if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error(`${label} needs a public http(s) URL.`); }
function texts(v, label) { if (!Array.isArray(v) || !v.length) throw new Error(`${label} needs a nonempty array.`); v.forEach((s, i) => text(s, `${label}[${i}]`)); }
function image(v, label) {
  text(v?.alt, `${label}.alt`);
  if (typeof v?.src !== "string" || !/^\/images\/[a-zA-Z0-9/_.-]+\.(png|jpe?g|webp|avif)$/.test(v.src)) throw new Error(`${label}.src needs a local image under /images/.`);
  const root = resolve("public"); const path = resolve(root, `.${v.src}`);
  if (!path.startsWith(root + sep) || !existsSync(path)) throw new Error(`${label}: missing or invalid image ${v.src}`);
}
for (const key of ["name", "brand", "discipline", "email", "footerNote"]) text(site[key], `site.${key}`);
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) throw new Error("Invalid site.email.");
url(site.github, "site.github");
for (const key of ["title", "description"]) text(site.metadata?.[key], `metadata.${key}`);
for (const key of ["eyebrow", "intro", "artCaption", "location", "education"]) text(site.hero?.[key], `hero.${key}`);
texts(site.hero.headline, "hero.headline"); texts(site.hero.accentHeadline, "hero.accentHeadline");
for (const key of ["work", "about", "contact"]) texts(site[key]?.heading, `${key}.heading`);
text(site.work.description, "work.description"); text(site.about.lead, "about.lead"); text(site.contact.description, "contact.description"); texts(site.about.paragraphs, "about.paragraphs");
if (!Array.isArray(site.skills) || !Array.isArray(site.experience)) throw new Error("skills and experience must be arrays.");
site.skills.forEach((v, i) => { text(v.title, `skills[${i}].title`); texts(v.items, `skills[${i}].items`); });
site.experience.forEach((v, i) => { for (const key of ["type", "role", "organization", "description", "date"]) text(v[key], `experience[${i}].${key}`); });
if (!Array.isArray(projects)) throw new Error("projects.json must be an array.");
const slugs = new Set();
projects.forEach((p, i) => {
  const label = `projects[${i}]`;
  for (const key of ["slug", "title", "status", "summary"]) text(p[key], `${label}.${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || slugs.has(p.slug)) throw new Error(`${label}.slug must be unique lowercase words separated by hyphens.`);
  slugs.add(p.slug); texts(p.stack, `${label}.stack`); texts(p.description, `${label}.description`);
  if (p.presentation && !["mobile", "web"].includes(p.presentation)) throw new Error(`${label}.presentation must be mobile or web.`);
  image(p.preview, `${label}.preview`);
  if (p.screenshots !== undefined && !Array.isArray(p.screenshots)) throw new Error(`${label}.screenshots must be an array.`);
  (p.screenshots ?? []).forEach((v, j) => image(v, `${label}.screenshots[${j}]`));
  if (!p.links || typeof p.links !== "object" || Array.isArray(p.links)) throw new Error(`${label}.links must be an object.`);
  for (const [key, value] of Object.entries(p.links)) { if (!["live", "repo"].includes(key)) throw new Error(`${label}.links: use live or repo.`); url(value, `${label}.links.${key}`); }
});
console.log(`Content valid: ${projects.length} projects, ${site.skills.length} skill groups, ${site.experience.length} experience rows.`);
