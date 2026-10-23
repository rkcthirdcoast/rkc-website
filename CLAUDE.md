# RKC Third Coast FC website — rules for AI tools

This repo is rkcthirdcoast.com, the static website for RKC Third Coast FC (Racine and Kenosha, Wisconsin). Read this file before changing anything. It is the standard work for the site: every AI tool and every person follows it.

## Source documents

- **Website brief** (what goes on the site, page copy, design rules): https://claude.ai/artifact/PqeCDj2pP5UasEDtc13NkM
- **Rebuild scope** (hosting, editor, approvals, costs, timeline): https://claude.ai/artifact/Uv7eWy8C7GdxvmZNnU6pNk

Where the two disagree, the scope doc wins. Where this file and the brief disagree, ask Tim.

## Who does what

- **Tim Gallion** approves every change before it goes live. **Wayne Howard** approves when Tim can't.
- **Interns** edit content only (matches, news, players, partners, staff, club settings) through the content editor. They never touch code or layout.
- **Claude** is the only AI that edits this repo: pages, templates, `rkc.css`, fixes.
- **Any other AI** is read-only. It may review a change or report on the live site. It never commits.

## How changes happen

1. One change per branch. Never commit straight to `main` after the initial setup.
2. Open a pull request. The host builds a preview link.
3. Tim (or Wayne) checks the preview on a phone and approves.
4. Merge. The site deploys.

## Design rules

- `rkc.css` is the only stylesheet. **No inline styles. No new colors.** If a page needs something `rkc.css` doesn't have, add it to `rkc.css` as its own change, get it approved, then use it.
- Colors: black, white and greys. Red `#A21E23` is the only accent (Tickets buttons, next-match markers, active nav, links). No gold, no blue.
- Type: **Poppins only** (400, 600, 700), self-hosted. Labels, dates and scores use the `.label` style (Poppins SemiBold, uppercase, wide letter-spacing). No Termina, no Adobe Fonts.
- The club name is the **Bell MT lockup as an SVG image**. Never load Bell MT as a web font.
- Logos: approved set only (full-color crest, mono crest, RC emblem, stripes, Sun over Lake Michigan). The seagull is a background crop, never a logo.
- Phone first. Test at 360, 375, 390 and 430px. Tap targets 44px minimum; main buttons 48px tall.
- No carousels for anything a visitor needs. No autoplay video on phones.
- Buttons say what happens: Get Tickets, View Matches, Become a Partner. Never "Learn more" or "Click here".
- No text inside images. If a graphic shows a score, the score is also on the page as text.
- One H1 per page. Alt text on every meaningful image.

## Content rules

- **Never type changing facts into page code**: dates, kickoff times, opponents, scores, ticket prices and links, sponsor names and logos, roster names, season year. These live in the content types (Match, News post, Player, Partner, Staff, Club settings). If asked to hard-code one, put it in the content type instead.
- Anything marked **VERIFY** in the brief stays off the live site until Tim confirms it.
- Do not write "501(c)(3)" anywhere until the IRS letter arrives. Use "becoming a nonprofit".
- No mention of youth programs or a youth academy at launch.
- Don't call the MWPL team a reserve or second team.
- Player interest forms live at `/play`: one form for men (USL League Two and MWPL), one for women (USL W League).
- Copy follows the club voice: plain, direct, local, specific. No hype words, no "not X, it's Y" constructions.

## File layout

```
rkc.css            the only stylesheet
site.js            the only script: mobile menu and filter chips. Pages must work without it
fonts/             self-hosted Poppins 400/600/700 (OFL license included)
style-sample.html  approved component sample (rkc.css v0.1); reference only
CLAUDE.md          this file
AGENTS.md          points other AI tools here
wrangler.jsonc     Cloudflare settings: runs the build, publishes _site/ only
package.json       Eleventy build (npm run build). Pin exact versions, none under two weeks old
eleventy.config.js what gets built, copied or ignored; template filters
_includes/         layouts/ (base, news-post) and partials/ (header, footer, match card + fixture row)
_data/             loaders that read content/ (matches, players, partners, staff, settings) plus site.js constants
lib/               shared helpers: YAML reader, team labels, Central-time date formats
components.njk     /components/: shared components with placeholder data, for approval; noindex
admin/             site editor (Sveltia CMS): index.html + config.yml. Content types and fields live in config.yml
content/           what interns edit: matches/, news/, players/, partners/, staff/, settings.yml. Never hand-edit facts into pages
images/brand/      approved club logos as SVG (rkc-crest.svg = full-color crest, from RKC Badge 1.ai). Never edit; replace from the source file
images/uploads/    images uploaded through the editor (converted to WebP, 5 MB limit)
_site/             build output; never committed
```

## How the build works

- Cloudflare runs `npm run build` (Eleventy) before every deploy and preview, then publishes `_site/`.
- Pages read content through `_data/` (e.g. `matches`, `settings`). News posts in `content/news/` become `/news/<file-name>/`.
- Dates are stored with their Central-time offset; always format them with the `chicago` filter, never the server clock.
- News post text is never run through Nunjucks, so `{{` in a post is safe.
- Pages are built when something merges, not live. "Next match" is decided at build time.
- `site.prelaunch` in `_data/site.js` adds `noindex` to every page. Set it to `false` at cutover.

Pages and `_redirects` are added as the build proceeds; update this section when they are.
