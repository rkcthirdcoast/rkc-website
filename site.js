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
        var shown = 0;
        list.querySelectorAll("[data-team]").forEach(function (r) {
          r.hidden = !(f === "all" || r.dataset.team === f || r.dataset.venue === f);
          if (!r.hidden) shown++;
        });
        var status = document.querySelector('[data-filter-status="' + list.id + '"]');
        if (status) status.textContent = shown + (shown === 1 ? " result" : " results");
      });
    });
  });

  // Contact form: preselect the topic from ?topic=groups etc.
  var topic = new URLSearchParams(location.search).get("topic");
  var select = document.getElementById("c-topic");
  if (topic && select && select.querySelector('option[value="' + topic + '"]')) select.value = topic;

  // Checkbox groups marked data-require-one: at least one box must be ticked before the form sends.
  document.querySelectorAll("fieldset[data-require-one]").forEach(function (group) {
    var boxes = group.querySelectorAll('input[type="checkbox"]');
    if (!boxes.length) return;
    var check = function () {
      var any = Array.prototype.some.call(boxes, function (b) { return b.checked; });
      boxes[0].setCustomValidity(any ? "" : "Tick at least one.");
    };
    boxes.forEach(function (b) { b.addEventListener("change", check); });
    if (group.form) group.form.addEventListener("reset", function () { setTimeout(check, 0); });
    check();
  });

  // Forms that aren't connected yet never submit.
  document.querySelectorAll("form[data-offline]").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); });
  });
})();
