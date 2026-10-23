// Eleventy turns the editor's content (content/) into pages, using rkc.css.
// Templates live in _includes/, data loaders in _data/, output goes to _site/.
import { teamCode, teamLabel, teamShort, rkcName, chicago, isUpcoming } from "./lib/format.js";

export default function (eleventyConfig) {
  // Repo files that are not pages
  for (const f of ["README.md", "CLAUDE.md", "AGENTS.md", "admin/**", "style-sample.html", "_site/**", "node_modules/**"]) {
    eleventyConfig.ignores.add(f);
  }

  // Copied to the site as-is
  for (const p of ["rkc.css", "site.js", "fonts", "images", "admin", "style-sample.html"]) {
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
