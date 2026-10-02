(function () {
  function getCPH() {
    var p = new URLSearchParams(window.location.search);
    return p.get('cph') || '44/077/0001'; // default: Wilson Lodge Farm
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function herdHref(cph, herd) {
    return 'herd-details.html?cph=' + encodeURIComponent(cph) +
           '&amp;herd=' + encodeURIComponent(herd);
  }

  var cph   = getCPH();
  var k     = (window.LUIS_DATA && window.LUIS_DATA.keepers || {})[cph];
  var root  = document.getElementById('record-root');
  var title = document.querySelector('.navbar-brand');

  if (!k) {
    if (title) title.textContent = 'Keeper details';
    root.innerHTML = '<div class="record-card">Keeper not found for CPH ' + esc(cph) + '.</div>';
    return;
  }

  if (title) title.textContent = 'Keeper details: ' + k.cph + ' - ' + k.name;

  var addr = k.address.filter(Boolean).join(', ');

  var country = k.country
    ? '<div class="detail-value">' + esc(k.country) + '</div>'
    : '<div class="detail-value detail-value--empty">Not provided</div>';

  // Unused tags block — omitted entirely when the keeper has no unusedTags
  var unused = '';
  if (Array.isArray(k.unusedTags)) {
    var counts = k.unusedTags.map(function (u) {
      var cls = (u.count === 0) ? 'unused-count unused-count--zero' : 'unused-count';
      return '<span class="unused-item">' + esc(u.species) +
             ' <span class="' + cls + '">' + u.count + '</span></span>';
    }).join('');
    unused =
      '<div class="unused-tags">' +
        '<div class="record-card-head" style="margin-bottom:2px;">Unused tags</div>' +
        '<div class="unused-counts">' + counts + '</div>' +
        '<a class="btn-luis-outline" href="#">Cancel unused tags</a>' +
      '</div>';
  }

  var tiles = k.herds.map(function (h) {
    return '<a class="luis-card" href="' + herdHref(k.cph, h.herd) + '">' +
        '<div><div class="luis-card__title">' + esc(h.groupType) + ' ' + esc(h.herd) + '</div>' +
        '<div class="luis-card__sub">' + esc(h.species.join(', ')) + '</div></div>' +
        '<span class="luis-card__arrow">&#8594;</span>' +
      '</a>';
  }).join('');

  var rows = k.herds.map(function (h) {
    return '<tr data-herd="' + esc(h.herd) + '">' +
        '<td>' + esc(h.herd) + '</td>' +
        '<td>' + esc(h.tag.species) + '</td>' +
        '<td>' + esc(h.tag.orderType) + '</td>' +
        '<td>' + esc(h.tag.nextTag) + '</td>' +
      '</tr>';
  }).join('');

  root.innerHTML =
    '<div class="record-header">' +
      '<div>' +
        '<div class="record-eyebrow">Keeper</div>' +
        '<div class="record-name">' + esc(k.name) +
          ' <span class="luis-pill">CPH ' + esc(k.cph) + '</span></div>' +
        '<div class="record-subline">' + esc(addr) + '</div>' +
      '</div>' +
      '<a class="record-change" href="#">&#8644; Change keeper</a>' +
    '</div>' +
    '<div class="record-layout">' +
      '<div class="record-main">' +
        '<div class="record-card">' +
          '<div class="record-card-head">Keeper details</div>' +
          '<div class="detail-row"><div class="detail-label">CPH</div><div class="detail-value">' + esc(k.cph) + '</div></div>' +
          '<div class="detail-row"><div class="detail-label">Name</div><div class="detail-value">' + esc(k.name) + '</div></div>' +
          '<div class="detail-row"><div class="detail-label">Address</div><div class="detail-value">' + esc(addr) + '</div></div>' +
          '<div class="detail-row"><div class="detail-label">Country</div>' + country + '</div>' +
          '<div class="detail-row"><div class="detail-label">Telephone</div><div class="detail-value">' + esc(k.telephone) + '</div></div>' +
          '<div class="detail-row"' + (unused ? ' style="border-bottom:0;"' : '') +
            '><div class="detail-label">Mobile</div><div class="detail-value">' + esc(k.mobile) + '</div></div>' +
          unused +
        '</div>' +
      '</div>' +
      '<div class="record-side">' +
        '<div class="record-card">' +
          '<div class="record-card-head">Herds (' + k.herds.length + ')</div>' +
          tiles +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="record-card" style="margin-top:12px;">' +
      '<div class="record-card-head">Tags</div>' +
      '<table class="table table-hover luis-table">' +
        '<thead><tr><th>Herd</th><th>Species</th><th>Order type</th><th>Next tag number</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>' +
    '</div>';

  // Tags-table rows navigate to the herd (rows already show a hover/pointer)
  root.querySelectorAll('.luis-table tbody tr[data-herd]').forEach(function (tr) {
    tr.addEventListener('click', function () {
      window.location = 'herd-details.html?cph=' + encodeURIComponent(k.cph) +
                        '&herd=' + encodeURIComponent(tr.getAttribute('data-herd'));
    });
  });
})();
