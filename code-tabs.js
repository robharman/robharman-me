(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.code-tabs').forEach(function (widget) {
      widget.querySelectorAll('.code-tab-strip .tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          widget.querySelectorAll('.code-tab-strip .tab').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-tab') === target);
          });
          widget.querySelectorAll('.code-panel').forEach(function (panel) {
            panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
          });
        });
      });
    });
  });
}());
