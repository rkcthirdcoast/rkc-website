import { readFolder } from "../lib/content.js";
// Every partner. Partners with a Display order number come first (1, 2, 3...), then the rest A to Z.
const rank = (p) => (Number.isFinite(Number(p.order)) && p.order !== "" && p.order != null ? Number(p.order) : Infinity);
export default () =>
  readFolder("partners").sort((a, b) => rank(a) - rank(b) || String(a.name).localeCompare(String(b.name)));
