// Reads the YAML files the site editor (Sveltia CMS) writes into content/.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = path.resolve(import.meta.dirname, "..", "content");

export function readFolder(name) {
  const dir = path.join(ROOT, name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.ya?ml$/.test(f))
    .map((f) => ({ slug: f.replace(/\.ya?ml$/, ""), ...yaml.load(fs.readFileSync(path.join(dir, f), "utf8")) }));
}

export function readFile(name, fallback = {}) {
  const file = path.join(ROOT, name);
  if (!fs.existsSync(file)) return fallback;
  return { ...fallback, ...yaml.load(fs.readFileSync(file, "utf8")) };
}
