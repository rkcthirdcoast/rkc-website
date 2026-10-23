import { readFolder } from "../lib/content.js";
// Front office first, then each team; within a group by display order, then name.
const GROUP = { front_office: 0, usl2: 1, uslw: 2, mwpl: 3 };
export default () =>
  readFolder("staff").sort(
    (a, b) =>
      (GROUP[a.team] ?? 9) - (GROUP[b.team] ?? 9) ||
      (a.order ?? 999) - (b.order ?? 999) ||
      String(a.name).localeCompare(String(b.name))
  );
