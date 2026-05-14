(function () {
  'use strict';

  function getPrefs() {
    try { return JSON.parse(localStorage.getItem('rh_prefs') || '{}'); } catch (e) { return {}; }
  }

  function savePrefs(prefs) {
    localStorage.setItem('rh_prefs', JSON.stringify(prefs));
  }

  function applyTheme(dark) {
    document.body.classList.toggle('light', !dark);
    var btn = document.getElementById('dark-btn');
    if (btn) btn.textContent = dark ? '☀' : '☾';
  }

  function applyVariant(variant) {
    var body = document.body;
    ['terminal', 'cards', 'newspaper'].forEach(function (v) {
      body.classList.toggle('view-' + v, v === variant);
    });
    document.querySelectorAll('.tab-btn[data-variant]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-variant') === variant);
    });
  }

  // Apply saved prefs immediately to avoid flash
  var prefs = getPrefs();
  var variant = prefs.variant || 'newspaper';
  var dark    = prefs.dark !== false;
  applyTheme(dark);
  applyVariant(variant);

  document.addEventListener('DOMContentLoaded', function () {
    // Variant picker — saves preference and applies on index; highlights button everywhere
    document.querySelectorAll('.tab-btn[data-variant]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v   = btn.getAttribute('data-variant');
        var p   = getPrefs();
        p.variant = v;
        savePrefs(p);
        applyVariant(v);
      });
    });

    // Copy link to clipboard
    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          shareBtn.textContent = 'copied!';
          setTimeout(function () { shareBtn.textContent = 'copy link'; }, 1500);
        });
      });
    }

    // Dark / light toggle
    var darkBtn = document.getElementById('dark-btn');
    if (darkBtn) {
      darkBtn.addEventListener('click', function () {
        var p    = getPrefs();
        var nowDark = p.dark === false ? true : false;
        p.dark   = nowDark;
        savePrefs(p);
        applyTheme(nowDark);
      });
    }
  });
}());
