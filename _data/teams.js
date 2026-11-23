// The three teams. Page copy from the Website Brief; rosters, coaches and fixtures come from the editor.
export default [
  {
    code: "usl2",
    league: "USL League Two",
    // Team page H1 and browser title. Cards elsewhere keep the short name.
    pageTitle: "RKC Third Coast Men",
    photo: {
      src: "/images/teams/usl2-1400.webp",
      srcSmall: "/images/teams/usl2-800.webp",
      alt: "RKC Third Coast men's players hugging and celebrating together during a match against River Light FC",
    },
    logo: { src: "/images/leagues/usl2.webp", width: 93, height: 56 },
    playForm: "/play/#men",
    intro:
      "Our men's team plays in USL League Two, the national summer league for college and pre-professional players. Players keep their college eligibility and spend June and July in matches that get noticed.",
  },
  {
    code: "uslw",
    league: "USL W League",
    pageTitle: "RKC Third Coast Women",
    logo: { src: "/images/leagues/uslw.webp", width: 96, height: 56 },
    playForm: "/play/#women",
    intro:
      "Our women's team plays in the USL W League, the pre-professional summer league for women's soccer. The roster mixes local players with college talent from across the country, and the standard is the same as the men's side.",
  },
  {
    code: "mwpl",
    league: "Midwest Premier League",
    pageTitle: "RKC Third Coast MWPL",
    // Round badge shown larger so it carries the same weight as the USL logos.
    logo: { src: "/images/leagues/mwpl.webp", width: 80, height: 80, large: true },
    playForm: "/play/#men",
    // Division confirmed by Tim, 2026-10-23.
    intro:
      "Our MWPL side plays in the Heartland Conference – Division 1 of the Midwest Premier League. It gives more players real minutes under the same club standards and coaching as our USL teams.",
  },
];
