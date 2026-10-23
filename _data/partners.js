import { readFolder } from "../lib/content.js";
// Every partner, A to Z.
export default () => readFolder("partners").sort((a, b) => String(a.name).localeCompare(String(b.name)));
