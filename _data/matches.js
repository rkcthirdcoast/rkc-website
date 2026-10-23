import { readFolder } from "../lib/content.js";
// Every match, oldest first.
export default () =>
  readFolder("matches").sort((a, b) => new Date(a.date) - new Date(b.date));
