(function () {
  function getParams() {
    var p = new URLSearchParams(window.location.search);
    return { cph: p.get('cph') || '44/077/0001', herd: p.get('herd') || '123456' };
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  var q     = getParams();
  var k     = (window.LUIS_DATA && window.LUIS_DATA.keepers || {})[q.cph];
  var root  = document.getElementById('record-root');
  var title = document.querySelector('.navbar-brand');
  var h     = k && k.herds.filter(function (x) { return String(x.herd) === String(q.herd); })[0];

  if (!k || !h) {
    if (title) title.textContent = 'Herd details';
    root.innerHTML = '<div class="record-card">Herd not found.</div>';
    return;
  }

  if (title) title.textContent = 'Herd details: ' + esc(h.groupType) + ' ' + esc(h.herd) +
                                 ' - ' + esc(k.name);

  var addr = k.address.filter(Boolean).join(', ');

  var country = k.country
    ? '<div class="detail-value">' + esc(k.country) + '</div>'
    : '<div class="detail-value detail-value--empty">Not provided</div>';

  var pills = h.species.map(function (s) {
    return '<span class="luis-pill">' + esc(s) + '</span>';
  }).join('');

  var keeperHref = 'keeper-details.html?cph=' + encodeURIComponent(k.cph);

  root.innerHTML =
    '<div class="record-header">' +
      '<div>' +
        '<div class="record-eyebrow">Herd</div>' +
        '<div class="record-name">' + esc(h.herd) + ' ' + pills + '</div>' +
        '<div class="record-subline">' + esc(k.name) + ' &middot; CPH ' + esc(k.cph) + '</div>' +
      '</div>' +
      '<a class="record-change" href="#">&#8644; Change herd</a>' +
    '</div>' +
    '<div class="record-layout">' +
      '<div class="record-main">' +
        '<div class="record-card">' +
          '<div class="record-card-head">Herd details</div>' +
          '<div class="detail-row"><div class="detail-label">Name</div><div class="detail-value">' + esc(k.name) + '</div></div>' +
          '<div class="detail-row"><div class="detail-label">Address</div><div class="detail-value">' + esc(addr) + '</div></div>' +
          '<div class="detail-row"><div class="detail-label">Country</div>' + country + '</div>' +
          '<div class="detail-row"><div class="detail-label">Telephone</div><div class="detail-value">' + esc(k.telephone) + '</div></div>' +
          '<div class="detail-row" style="border-bottom:0;"><div class="detail-label">Mobile</div><div class="detail-value">' + esc(k.mobile) + '</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="record-side">' +
        '<div class="record-card">' +
          '<div class="record-card-head">Keeper holding</div>' +
          '<a class="luis-card" href="' + keeperHref + '">' +
            '<div><div class="luis-card__title">' + esc(k.name) + '</div>' +
            '<div class="luis-card__sub">CPH ' + esc(k.cph) + '</div></div>' +
            '<span class="luis-card__arrow">&#8599;</span>' +
          '</a>' +
        '</div>' +
        '<div class="record-card">' +
          '<div class="record-card-head">Tag stock</div>' +
          '<div class="detail-row"><div class="detail-label">Order type</div><div class="detail-value">' + esc(h.tag.orderType) + '</div></div>' +
          '<div class="detail-row" style="border-bottom:0;"><div class="detail-label">Next tag no.</div><div class="detail-value" style="font-weight:600;">' + esc(h.tag.nextTag) + '</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';
})();
