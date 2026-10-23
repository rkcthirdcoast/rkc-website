// Site-wide constants that are not weekly content.
// Weekly or seasonal facts (prices, links, emails, dates) belong in Club settings, not here.
export default {
  name: "RKC Third Coast FC",
  url: "https://rkcthirdcoast.com",
  // Tim, 2026-10-23. Switch to shop.rkcthirdcoast.com if that subdomain is connected later.
  shop: "https://rkcthirdcoast.myshopify.com/",
  instagram: "https://www.instagram.com/rkcthirdcoast/",
  // RKC organizes its own lake cleanups; dates and sign-up live on Get Involved
  cleanup: "/get-involved/#cleanups",
  stadium: {
    name: "Pritchard Park Stadium",
    complex: "SC Johnson Community Sports Complex",
    street: "2800 Ohio St",
    city: "Racine",
    region: "WI",
    zip: "53406",
    maps: "https://www.google.com/maps/search/?api=1&query=Pritchard+Park+Stadium%2C+2800+Ohio+St%2C+Racine%2C+WI+53406",
  },
  // Where the site's forms send. Empty = forms show as "not connected yet" and can't be submitted.
  // Set once Tim picks a form service (see the all-pages PR).
  forms: { endpoint: "" },
  // Until launch, ask search engines not to index the preview addresses.
  prelaunch: true,
  nav: [
    { label: "Matches", url: "/matches/" },
    { label: "Teams", url: "/teams/" },
    { label: "Club", url: "/club/" },
    { label: "Visit", url: "/visit/" },
    { label: "News", url: "/news/" },
    { label: "Partners", url: "/partners/" },
    { label: "Get Involved", url: "/get-involved/" },
    { label: "Shop", url: "https://rkcthirdcoast.myshopify.com/" },
  ],
};
