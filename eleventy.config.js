// Eleventy turns the editor's content (content/) into pages, using rkc.css.
// Templates live in _includes/, data loaders in _data/, output goes to _site/.
import { teamCode, teamLabel, teamShort, rkcName, chicago, isUpcoming } from "./lib/format.js";

export default function (eleventyConfig) {
  // Repo files that are not pages
  for (const f of ["README.md", "CLAUDE.md", "AGENTS.md", "admin/**", "style-sample.html", "_site/**", "node_modules/**"]) {
    eleventyConfig.ignores.add(f);
  }

  // Copied to the site as-is
  for (const p of ["rkc.css", "site.js", "fonts", "images", "admin", "style-sample.html", "_redirects"]) {
    eleventyConfig.addPassthroughCopy(p);
  }

  // Formatting: every date shows in Central time, whatever the build server's clock
  eleventyConfig.addFilter("chicago", chicago);
  eleventyConfig.addFilter("teamLabel", teamLabel);
  eleventyConfig.addFilter("teamShort", teamShort);
  eleventyConfig.addFilter("teamCode", teamCode);
  eleventyConfig.addFilter("rkcName", rkcName);
  eleventyConfig.addFilter("upcoming", (matches) => (matches || []).filter(isUpcoming));
  eleventyConfig.addFilter("results", (matches) =>
    (matches || []).filter((m) => m.status === "final").slice().reverse());
  eleventyConfig.addFilter("forTeam", (list, team) => (list || []).filter((x) => x.team === team));
  eleventyConfig.addFilter("isUpcoming", isUpcoming);
  // Up to n other posts with the same team tag, newest first
  eleventyConfig.addFilter("relatedPosts", (posts, url, tag, n = 3) =>
    (posts || []).filter((p) => p.url !== url && p.data.team_tag === tag).slice().reverse().slice(0, n));
  // Headings never end with a period (house style). Used on intern-written headlines.
  eleventyConfig.addFilter("noEndPeriod", (t) => String(t ?? "").replace(/\s*\.+\s*$/, ""));
  eleventyConfig.addFilter("activeOnly", (list) => (list || []).filter((x) => x.active !== false));
  eleventyConfig.addFilter("byTag", (posts, tag) => (posts || []).filter((p) => p.data.team_tag === tag));
  eleventyConfig.addFilter("homeOnly", (list) => (list || []).filter((m) => m.home_away === "home"));
  eleventyConfig.addFilter("byCategory", (list, cat) => (list || []).filter((p) => (p.category || "club") === cat));
  // Latest season's finished matches for one team, oldest first, with a W-D-L record.
  eleventyConfig.addFilter("seasonResults", (matches, team) => {
    const year = (m) => Number(new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "America/Chicago" }).format(new Date(m.date)));
    const finals = (matches || []).filter((m) => m.team === team && m.status === "final");
    if (!finals.length) return null;
    const latest = Math.max(...finals.map(year));
    const list = finals.filter((m) => year(m) === latest).sort((a, b) => new Date(a.date) - new Date(b.date));
    const w = list.filter((m) => m.rkc_score > m.opponent_score).length;
    const l = list.filter((m) => m.rkc_score < m.opponent_score).length;
    return { year: latest, list, w, d: list.length - w - l, l };
  });
  eleventyConfig.addFilter("head", (list, n) => (list || []).slice(0, n));
  eleventyConfig.addFilter("activeWithLogo", (list) => (list || []).filter((p) => p.active !== false && p.logo));
  eleventyConfig.addFilter("alumniList", (list) => (list || []).filter((p) => p.alumni));
  // "Sample City SC" -> "SCS": stand-in badge when an opponent has no logo
  eleventyConfig.addFilter("initials", (name) =>
    String(name || "").split(/\s+/).filter(Boolean).slice(0, 3).map((w) => w[0]).join("").toUpperCase());

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    // News posts are written by interns: never run their text through a template engine
    markdownTemplateEngine: false,
  };
}
