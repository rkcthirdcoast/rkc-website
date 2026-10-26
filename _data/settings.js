import { readFile } from "../lib/content.js";
// Club settings from the editor. Safe defaults if nothing has been saved yet.
export default () =>
  readFile("settings.yml", {
    season_mode: "offseason",
    season_label: "",
    banner_text: "",
    banner_link: "",
    tickets: {},
    press: {},
  });
