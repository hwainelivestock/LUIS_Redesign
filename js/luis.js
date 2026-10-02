document.addEventListener('DOMContentLoaded', function () {
  var currentGroup = null;

  window.toggleRail = function(group) {
    var flyout = document.getElementById('luis-flyout');
    var btn = document.getElementById('rail-btn-' + group);
    if (currentGroup === group) { closeFlyout(); return; }
    document.querySelectorAll('.rail-item').forEach(function(el) { el.classList.remove('active'); });
    document.querySelectorAll('.flyout-panel').forEach(function(el) { el.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    var panel = document.getElementById('flyout-' + group);
    if (panel) panel.classList.add('active');
    flyout.classList.add('open');
    currentGroup = group;
  };

  window.closeFlyout = function() {
    var flyout = document.getElementById('luis-flyout');
    flyout.classList.remove('open');
    document.querySelectorAll('.rail-item').forEach(function(el) { el.classList.remove('active'); });
    document.querySelectorAll('.flyout-panel').forEach(function(el) { el.classList.remove('active'); });
    currentGroup = null;
  };

  document.addEventListener('click', function(e) {
    var flyout = document.getElementById('luis-flyout');
    var rail = document.getElementById('luis-rail');
    if (!flyout || !flyout.innerHTML.trim()) return;
    if (rail &&
        !flyout.contains(e.target) &&
        !rail.contains(e.target)) {
      closeFlyout();
    }
  });

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.flyout-item').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) { link.classList.add('active'); }
  });

  var filterInput = document.getElementById('orders-filter');
  if (filterInput) {
    filterInput.addEventListener('input', function() {
      var term = this.value.toLowerCase();
      document.querySelectorAll('#orders-table tbody tr').forEach(function(row) {
        row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  window.openKeeperModal = function (cph) {
    var k = window.LUIS_DATA && window.LUIS_DATA.getKeeperByCph(cph);
    if (!k) { return; }
    var enc = encodeURIComponent(cph);
    document.getElementById('km-hero').textContent = k.name;
    document.getElementById('km-cph').textContent  = k.cph;
    document.getElementById('km-sub').textContent  =
      k.keeperName + ' · ' + k.address[0] + ', ' + k.address[k.address.length - 1];
    document.getElementById('km-neworder').setAttribute('href', 'select-species.html?cph=' + enc);
    document.getElementById('km-record').setAttribute('href', 'keeper-details.html?cph=' + enc);
    $('#keeperModal').modal('show');
  };

  document.querySelectorAll('input[data-cph-mask]').forEach(applyCphMask);
});

function toggleOrdersLabel(el) {
  var expanded = el.getAttribute('aria-expanded') === 'true';
  el.textContent = expanded ? '+ More search options' : '− Fewer search options';
}

function applyCphMask(el){
  function fmt(v){
    var d = (v || '').replace(/\D/g, '').slice(0, 9);   // digits only, max 9
    if (d.length > 5)      return d.slice(0,2) + '/' + d.slice(2,5) + '/' + d.slice(5);
    else if (d.length > 2) return d.slice(0,2) + '/' + d.slice(2);
    else                   return d;
  }
  el.addEventListener('input', function(){
    var pos = el.selectionStart;
    var digitsBefore = el.value.slice(0, pos).replace(/\D/g, '').length;
    el.value = fmt(el.value);
    var seen = 0, i = 0;
    while (i < el.value.length && seen < digitsBefore){ if (/\d/.test(el.value[i])) seen++; i++; }
    el.setSelectionRange(i, i);
  });
  el.addEventListener('paste', function(e){
    e.preventDefault();
    var text = ((e.clipboardData || window.clipboardData).getData('text')) || '';
    el.value = fmt(el.value + text);
    el.dispatchEvent(new Event('input'));
  });
}
