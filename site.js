// Small enhancements only. Every page works without this file.
(function () {
  var btn = document.getElementById("menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    });
  }

  // Filter chips: <div class="filters"> buttons with data-filter, rows with data-team / data-venue
  document.querySelectorAll(".filters").forEach(function (group) {
    var chips = group.querySelectorAll(".chip");
    var list = document.getElementById(group.getAttribute("aria-controls"));
    if (!list) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        var f = chip.dataset.filter;
        list.querySelectorAll("[data-team]").forEach(function (r) {
          r.hidden = !(f === "all" || r.dataset.team === f || r.dataset.venue === f);
        });
      });
    });
  });
})();
