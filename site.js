// Hamburger menu for small screens.
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var btn = nav.querySelector('.nav-toggle');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('ul a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Tabs: arrow keys move between tabs; a #panel-id in the URL opens that tab.
(function () {
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    function show(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        show(t);
        try { history.replaceState(null, '', '#' + t.getAttribute('aria-controls')); } catch (e) {}
      });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (j === null) return;
        e.preventDefault();
        show(tabs[(j + tabs.length) % tabs.length], true);
      });
    });
    var fromHash = tabs.filter(function (t) { return '#' + t.getAttribute('aria-controls') === location.hash; })[0];
    show(fromHash || tabs[0]);
  });
})();

// Start each page at the top, even if the browser remembers an old scroll
// position. Footnote links (#fn…, #ref…) still jump to their target.
(function () {
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  function toTop() {
    var h = location.hash;
    var keep = h && /^#(fn|ref)/.test(h) && document.querySelector(h);
    if (!keep) window.scrollTo(0, 0);
  }
  window.addEventListener('pageshow', function () { toTop(); setTimeout(toTop, 0); });
  window.addEventListener('load', function () { setTimeout(toTop, 0); });
})();
