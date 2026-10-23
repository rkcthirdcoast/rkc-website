import { readFolder } from "../lib/content.js";
// Every player, by shirt number.
export default () => readFolder("players").sort((a, b) => (a.number ?? 999) - (b.number ?? 999));
