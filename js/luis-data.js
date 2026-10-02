/*
 * LUIS_DATA — static prototype data layer
 *
 * window.LUIS_DATA = {
 *   keepers: {
 *     "<CPH>": {
 *       cph,
 *       name,
 *       address,       // array of address lines
 *       country,
 *       telephone,
 *       mobile,
 *       unusedTags,    // array of {species, count}; key OMITTED for keepers with no unused tags
 *       herds: [       // array, in display order
 *         {
 *           herd,        // string herd/flock number
 *           groupType,   // "Herd" or "Flock"
 *           species,     // array of species this herd holds
 *           tag: { species, orderType, nextTag }
 *         }
 *       ]
 *     }
 *   }
 * }
 */

window.LUIS_DATA = {
  keepers: {

    "44/088/0001": {
      cph: "44/088/0001",
      keeperName: "Jane Smith",
      name: "Greenfield Farm",
      address: ["12 Marsh Lane", "Greenfield", "EX4 2PQ"],
      country: "",
      telephone: "01610654321",
      mobile: "0707654321",
      unusedTags: [
        { species: "Cattle",   count: 96  },
        { species: "Sheep",    count: 410 },
        { species: "Goat",     count: 0   },
        { species: "Camelids", count: 0   }
      ],
      unmatchedRequirements: [
        { herd: "654321", species: "Cattle", orderType: "Conventional", row: "secondary", qty: 1 },
        { herd: "654321", species: "Cattle", orderType: "Conventional", row: "primary",   qty: 1 }
      ],
      herds: [
        { herd: "654321", groupType: "Herd",  species: ["Cattle"],   tag: { species: "Cattle",   orderType: "Conventional", nextTag: 142  } },
        { herd: "123123", groupType: "Flock", species: ["Sheep"],    tag: { species: "Sheep",    orderType: "EID",          nextTag: 2050 } },
        { herd: "321321", groupType: "Herd",  species: ["Goat"],     tag: { species: "Goat",     orderType: "Conventional", nextTag: 33   } },
        { herd: "789012", groupType: "Herd",  species: ["Camelids"], tag: { species: "Camelids", orderType: "Conventional", nextTag: 7    } }
      ]
    },

    "44/077/0001": {
      cph: "44/077/0001",
      keeperName: "Tony Wilson",
      name: "Wilson Lodge Farm",
      address: ["4 Wilson Lodge", "Kayleigh Dale", "TA1 0RR"],
      country: "",
      telephone: "01610123456",
      mobile: "0701234567",
      herds: [
        { herd: "123456", groupType: "Herd", species: ["Cattle"], tag: { species: "Cattle", orderType: "Conventional", nextTag: 86 } }
      ]
    },

    // Second holding for the same keeper — herd 123456 is registered at both
    // 44/077/0001 and 44/077/0002, so an orders search by herd spans two CPHs.
    "44/077/0002": {
      cph: "44/077/0002",
      keeperName: "Tony Wilson",
      name: "Wilson Lodge Outfarm",
      address: ["Top Field Barns", "Kayleigh Dale", "TA1 0RS"],
      country: "",
      telephone: "01610123456",
      mobile: "0701234567",
      herds: [
        { herd: "123456", groupType: "Herd", species: ["Cattle"], tag: { species: "Cattle", orderType: "Conventional", nextTag: 86 } }
      ]
    },

    "44/099/0001": {
      cph: "44/099/0001",
      keeperName: "Sam Dean",
      name: "Dover Animal Farm",
      address: ["4 Dover Lane", "Guston", "Devonshire", "CT15 5TE"],
      country: "",
      telephone: "01810123456",
      mobile: "07011223344",
      unusedTags: [
        { species: "Cattle", count: 228 },
        { species: "Sheep",  count: 0   }
      ],
      herds: [
        { herd: "112211", groupType: "Herd", species: ["Cattle", "Sheep"], tag: { species: "Cattle", orderType: "Conventional", nextTag: 3311 } },
        { herd: "112222", groupType: "Herd", species: ["Sheep"],           tag: { species: "Sheep",  orderType: "EID",          nextTag: 1500 } },
        { herd: "112233", groupType: "Herd", species: ["Sheep"],           tag: { species: "Sheep",  orderType: "EID",          nextTag: 9    } }
      ]
    }

  }
};

// ── Keeper lookup helper ──────────────────────────────────────────────────────
window.LUIS_DATA.getKeeperByCph = function (cph) {
  return (window.LUIS_DATA.keepers || {})[cph] || null;
};

window.LUIS_DATA.getKeeperByHerd = function (herd) {
  var keepers = window.LUIS_DATA.keepers || {};
  var h = String(herd).trim();
  for (var cph in keepers) {
    if (keepers[cph].herds && keepers[cph].herds.some(function (e) { return String(e.herd) === h; })) {
      return keepers[cph];
    }
  }
  return null;
};

window.LUIS_DATA.getUnmatchedForCph = function (cph) {
  var k = (window.LUIS_DATA.keepers || {})[cph];
  return (k && Array.isArray(k.unmatchedRequirements)) ? k.unmatchedRequirements : [];
};

// ── Per-species order-type card sets ─────────────────────────────────────────
// Keyed by title-case species name, matching herds[].species[] values.
// Each entry is an ordered array of groups; each group has a label and ordered
// cards with title + sub. Sub-text is species-specific — do NOT normalise.
// `type` and `variant` added to each card to drive the order form.
window.LUIS_DATA.speciesCards = {
  "Cattle": [
    { label: "Conventional", cards: [
      { title: "New conventional tags", sub: "Standard cattle ear tags",  type: "conventional", variant: "new"         },
      { title: "Replica tags",          sub: "Cattle replacement tags",   type: "replica",      variant: "replacement" }
    ]}
  ],
  "Sheep": [
    { label: "EID", cards: [
      { title: "New EID tags",               sub: "New electronic ID tags",  type: "eid",       variant: "new"         },
      { title: "Replacement EID tags",       sub: "Not on holding of birth", type: "eid",       variant: "replacement" }
    ]},
    { label: "Slaughter", cards: [
      { title: "New slaughter tags",         sub: "New slaughter ID tags",   type: "slaughter", variant: "new"         },
      { title: "Replacement slaughter tags", sub: "Not on holding of birth", type: "slaughter", variant: "replacement" }
    ]},
    { label: "Replicas", cards: [
      { title: "New replica tags",           sub: "Replica sheep tags",      type: "replica",   variant: "replacement" }
    ]}
  ],
  // TODO (provisional — confirm with business): Goat order types mirror Sheep; verify product set
  "Goat": [
    { label: "Conventional", cards: [
      { title: "New conventional tags",         sub: "Standard goat ear tags", type: "conventional", variant: "new"         },
      { title: "Replacement conventional tags", sub: "Standard replacement",   type: "conventional", variant: "replacement" } // TODO — conventional has no replacement variant in orderTypes yet; confirm with business
    ]},
    { label: "EID", cards: [
      { title: "New EID tags",         sub: "New electronic ID tags", type: "eid", variant: "new"         },
      { title: "Replacement EID tags", sub: "Electronic replacement", type: "eid", variant: "replacement" }
    ]},
    { label: "Slaughter", cards: [
      { title: "New slaughter tags",         sub: "New slaughter ID tags",   type: "slaughter", variant: "new"         },
      { title: "Replacement slaughter tags", sub: "Not on holding of birth", type: "slaughter", variant: "replacement" }
    ]},
    { label: "Replicas", cards: [
      { title: "New replica tags", sub: "Replica goat tags", type: "replica", variant: "replacement" }
    ]}
  ],
  // PLACEHOLDER — Camelids order types are assumed (microchip), NOT confirmed
  // against real LUIS requirements. Provisional; pending business sign-off.
  // TODO (provisional — microchip type not defined in orderTypes yet; confirm with business)
  "Camelids": [
    { label: "Microchip", cards: [
      { title: "New microchip registration", sub: "New animal registration", type: "microchip", variant: "new"         },
      { title: "Replacement microchip",      sub: "Lost or damaged chip",    type: "microchip", variant: "replacement" }
    ]}
  ]
};

// ── Order type definitions ────────────────────────────────────────────────────
window.LUIS_DATA.orderTypes = {
  conventional: {
    label:    "Conventional",
    template: "tag-grid",
    radio:    { options: ["Primary", "Secondary", "Both"], default: "Both" },
    rows:     ["primary", "secondary"],
    chips:    ["rules", "recent"],
    variants: ["new"] // new only — Replica is the cattle replacement path
  },
  eid: {
    label:    "EID",
    template: "tag-grid",
    radio:    { options: ["EID Tag", "Non-EID Tag", "Both"], default: "Both" },
    rows:     ["eid", "nonEid"],
    chips:    ["rules", "recent"],
    variants: ["new", "replacement"]
  },
  slaughter: {
    label:    "Slaughter",
    template: "tag-grid",
    radio:    null, // no radio
    rows:     ["primary"],
    chips:    ["recent"], // single row, Recent chip only
    variants: ["new", "replacement"]
  },
  replica: {
    label:         "Replica",
    template:      "replica",
    holdingList:   { cattle: true, sheep: false }, // Cattle shows Filter + "On holding" list; Sheep doesn't
    rows:          { cattle: ["primary", "secondary"], sheep: ["eid", "nonEid"], goat: ["eid", "nonEid"] },
    buttons:       { back: "Exit", submit: "Order replicas" },
    isReplacement: true
  }
};

// ── Tag colours per species × row position ───────────────────────────────────
// Primary/EID is single-value (Yellow); render as static text, not a dropdown.
// Shared arrays — goat eid/nonEid/secondary resolve identically to sheep's
// equivalent rows; same array reference avoids duplication and keeps them in sync.
var _sheepGoatEidColours    = ["Yellow"];
var _sheepGoatNonEidColours = ["Blue", "Green", "Orange", "Pink", "Purple", "White", "Brown"];
window.LUIS_DATA.tagColours = {
  cattle: {
    primary:   ["Yellow"],
    secondary: ["Yellow", "Blue", "Green", "Orange", "Pink", "Purple", "Red", "White"]
  },
  sheep: {
    primary: ["Yellow"],
    eid:     _sheepGoatEidColours,
    nonEid:  _sheepGoatNonEidColours
  },
  goat: {
    primary:   ["Yellow"],
    eid:       _sheepGoatEidColours,
    nonEid:    _sheepGoatNonEidColours,
    secondary: _sheepGoatNonEidColours
  }
};

// ── Order badge colour semantics ─────────────────────────────────────────────
// New orders:         primary/EID badge lime, secondary/non-EID badge grey.
// Replacement orders: ALL badges red.
window.LUIS_DATA.orderBadge = {
  new:         { primaryEid: "#c8d400", secondaryNonEid: "#adb5bd" },
  replacement: "#c0392b"
};

// ── Tag colour resolver ───────────────────────────────────────────────────────
// New orders use tagColours (Yellow fixed for primary/EID; a colour list for
// secondary/non-EID). Replacement orders are always Red for every row.
window.LUIS_DATA.getTagColourOptions = function (species, row, variant) {
  var COLOUR_HEX = {
    Yellow: "#f2d024", Blue:   "#2f6fb0", Green:  "#4a9b4a", Orange: "#e08a2b",
    Pink:   "#d46a9c", Purple: "#7d5aa8", Red:    "#c0392b", White:  "#ffffff",
    Brown:  "#8a5a2b"
  };
  if (variant === "replacement") {
    return { fixed: true, value: "Red", hex: COLOUR_HEX.Red };
  }
  // variant === "new": look up tagColours[species][row]
  var speciesKey = String(species).toLowerCase();
  var colours = ((window.LUIS_DATA.tagColours || {})[speciesKey] || {})[row] || [];
  if (colours.length === 1) {
    return { fixed: true,  value: colours[0], hex: COLOUR_HEX[colours[0]] || "" };
  }
  if (colours.length > 1) {
    return { fixed: false, options: colours };
  }
  return { fixed: false, options: [] }; // TODO — colours pending; confirm with business
};

// ── Tag rules reference data ──────────────────────────────────────────────────
// Static reference data. Rules-chip VISIBILITY is gated by orderTypes[type].chips
// (conventional/EID only); this supplies the CONTENT per species.
// Goat/camelids pending.
window.LUIS_DATA.tagRules = {
  cattle: {
    intro:  "At least one distance-readable (primary) tag is required.",
    combos: ["Tag + Tag", "Metal + Tag"]
  },
  sheep: {
    intro:  null,
    combos: [
      "Tag + Bolus", "Pastern + Bolus", "Tag + Tag",  "Metal + Tag",
      "Pastern + Tag", "Tattoo + Tag",  "Metal + Metal",
      "Pastern + Metal", "Tattoo + Metal"
    ]
  }
};

window.LUIS_DATA.getTagRules = function (species) {
  var key   = String(species).toLowerCase();
  var rules = (window.LUIS_DATA.tagRules || {})[key];
  if (!rules) { return { pending: true }; }
  return { pending: false, intro: rules.intro, combos: rules.combos || [] };
};

// ── Tag products catalog ──────────────────────────────────────────────────────
// Structured by species position-group. ruleType drives future combination-rule
// checks ("Tag", "Metal", "Tattoo") — not used for validation in this pass.
//
// Shared sheep+goat lists are named sheepGoatEid / sheepGoatNonEid /
// sheepGoatSlaughter rather than being duplicated.
// goatSlaughterOnly holds the one product that is goat-slaughter exclusive.
//
// ASSUMPTION (flagged): goat conventional primary → sheepGoatEid.
// No explicit source row confirms this; inferred because no separate
// Goat-conventional-primary product list exists in the source sheet.
window.LUIS_DATA.tagProducts = {
  cattle: {
    primary: [
      { name: "Ultra Junior TST",    ruleType: "Tag" },
      { name: "Ultra Junior Visual", ruleType: "Tag" },
      { name: "Ultra Senior TST",    ruleType: "Tag" },
      { name: "Ultra Senior Visual", ruleType: "Tag" }
    ],
    secondary: [
      { name: "QuikSilver (LSR)",      ruleType: "Metal" },
      { name: "SDL Metal",             ruleType: "Metal" },
      { name: "Ultra Button TST",      ruleType: "Tag"   },
      { name: "Ultra Button Visual",   ruleType: "Tag"   },
      { name: "Ultra EID Senior TST",  ruleType: "Tag"   },
      { name: "Ultra FDX Button",      ruleType: "Tag"   },
      { name: "Ultra HDX Button",      ruleType: "Tag"   },
      { name: "Ultra Junior TST",      ruleType: "Tag"   },
      { name: "Ultra Junior Visual",   ruleType: "Tag"   },
      { name: "Ultra Senior EID",      ruleType: "Tag"   },
      { name: "Ultra Senior TST",      ruleType: "Tag"   },
      { name: "Ultra Senior Visual",   ruleType: "Tag"   }
    ]
  },
  // EID (primary) list — sheep eid.eid row, goat eid.eid row,
  // and (assumption) goat conventional.primary row
  sheepGoatEid: [
    { name: "EID B4S/BTM",                     ruleType: "Tag" },
    { name: "EID Bubblegum",                    ruleType: "Tag" },
    { name: "EID FDX Button (B4S/MNSM)",        ruleType: "Tag" },
    { name: "EID FDX Button (B4S/OVN)",         ruleType: "Tag" },
    { name: "EID HDX LWT Button (BHR/BHL)",     ruleType: "Tag" },
    { name: "EID Qwik (2020)",                  ruleType: "Tag" },
    { name: "Qwik EID Twin Shot Tag",           ruleType: "Tag" }
  ],
  // Non-EID (secondary) list — sheep eid.nonEid row, goat conventional.secondary
  // and goat eid.nonEid row
  sheepGoatNonEid: [
    { name: "Bubblegum",          ruleType: "Tag"    },
    { name: "Mini Sheep",         ruleType: "Tag"    },
    { name: "Mini TST TEMP",      ruleType: "Tag"    },
    { name: "Ovina",              ruleType: "Tag"    },
    { name: "Qwik",               ruleType: "Tag"    },
    { name: "Qwik Twin Shot Tag", ruleType: "Tag"    },
    { name: "TST Button",         ruleType: "Tag"    },
    { name: "Ultra Button",       ruleType: "Tag"    },
    { name: "Tattoo",             ruleType: "Tattoo" }
  ],
  // Slaughter primary list — shared Sheep + Goat, slaughter.primary row
  sheepGoatSlaughter: [
    { name: "EID (S) Bubblegum",              ruleType: "Tag" },
    { name: "EID (S) FDX Button (B4S/MNSM)", ruleType: "Tag" },
    { name: "EID (S) Qwik (2020)",            ruleType: "Tag" },
    { name: "EID (S) RapID",                  ruleType: "Tag" },
    { name: "EID B4S/BTM (S)",                ruleType: "Tag" }
  ],
  // Additional product exclusive to Goat slaughter — concat'd onto sheepGoatSlaughter
  goatSlaughterOnly: [
    { name: "Qwik (S)", ruleType: "Tag" }
  ]
};

// getTagProducts(species, orderType, row) → product array for the given combination.
// Returns [] (never undefined) for any unrecognised combination.
//
// Cattle:  row-keyed directly (primary/secondary) regardless of orderType.
// Sheep:   eid/nonEid rows map to EID/non-EID lists; primary → slaughter list.
// Goat:    eid/nonEid rows same as sheep; primary disambiguation by orderType
//          (slaughter → slaughter+goatOnly, otherwise → sheepGoatEid [assumption]).
// Replica: cattle rows (primary/secondary) hit the cattle branch;
//          sheep/goat replica rows (eid/nonEid) hit the row-key check above —
//          so 'replica' requires no explicit case here.
window.LUIS_DATA.getTagProducts = function (species, orderType, row) {
  var tp = window.LUIS_DATA.tagProducts;
  var sp = String(species   == null ? '' : species).toLowerCase();
  var ot = String(orderType == null ? '' : orderType).toLowerCase();

  if (sp === 'cattle') {
    return (tp.cattle[row] || []);
  }

  if (sp === 'sheep') {
    if (row === 'eid')    return tp.sheepGoatEid;
    if (row === 'nonEid') return tp.sheepGoatNonEid;
    if (row === 'primary') return tp.sheepGoatSlaughter;
    return [];
  }

  if (sp === 'goat') {
    if (row === 'eid')    return tp.sheepGoatEid;
    if (row === 'nonEid') return tp.sheepGoatNonEid;
    if (row === 'primary') {
      if (ot === 'slaughter') return tp.sheepGoatSlaughter.concat(tp.goatSlaughterOnly);
      // ASSUMPTION: goat conventional primary → sheepGoatEid (see note on tagProducts above)
      return tp.sheepGoatEid;
    }
    if (row === 'secondary') return tp.sheepGoatNonEid;
    return [];
  }

  return [];
};

// ── Orders ────────────────────────────────────────────────────────────────────
// id doubles as the Defra Ref — no separate field.
// manufacturerRef: ETM-supplied free-text reference, or null.
// lines[].tagPrefix + tagStart/tagEnd encode the UK ear-tag range.
window.LUIS_DATA.orders = [

  // 5001100 — Greenfield Cattle, conventional new, COMPLETED
  {
    id:              "5001100",
    cph:             "44/088/0001",
    herd:            "654321",
    species:         "Cattle",
    type:            "conventional",
    variant:         "new",
    date:            "2025-10-01T10:08:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "GF-100",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual",  colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK654321", tagStart: 132, tagEnd: 141, qty: 10, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual",  colour: "Blue",   colourHex: "#2f6fb0",
        tagPrefix: "UK654321", tagStart: 132, tagEnd: 141, qty: 10, class: "Flag" }
    ]
  },

  // 5001101 — Greenfield Sheep, EID new, CANCELLED + FULLY REINSTATED
  {
    id:              "5001101",
    cph:             "44/088/0001",
    herd:            "123123",
    species:         "Sheep",
    type:            "eid",
    variant:         "new",
    date:            "2026-01-14T09:30:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "eid",    product: "EID FDX Button (B4S/OVN)",   colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK123123", tagStart: 2030, tagEnd: 2049, qty: 20, class: "Flag" },
      { row: "nonEid", product: "Ultra Button",  colour: "Blue",   colourHex: "#2f6fb0",
        tagPrefix: "UK123123", tagStart: 2030, tagEnd: 2049, qty: 20, class: "Flag" }
    ]
  },

  // 5001102 — Wilson Lodge Cattle, conventional new, CANCELLED + PARTIALLY REINSTATED
  {
    id:              "5001102",
    cph:             "44/077/0001",
    herd:            "123456",
    species:         "Cattle",
    type:            "conventional",
    variant:         "new",
    date:            "2026-03-06T11:15:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "WL-032",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK123456", tagStart: 76, tagEnd: 85, qty: 10, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Green",  colourHex: "#4a9b4a",
        tagPrefix: "UK123456", tagStart: 76, tagEnd: 85, qty: 10, class: "Flag" }
    ]
  },

  // 5001103 — Dover Sheep, EID new, CANCELLED, no reinstatement
  {
    id:              "5001103",
    cph:             "44/099/0001",
    herd:            "112222",
    species:         "Sheep",
    type:            "eid",
    variant:         "new",
    date:            "2026-04-10T14:00:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "eid", product: "EID FDX Button (B4S/OVN)", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK112222", tagStart: 1495, tagEnd: 1499, qty: 5, class: "Flag" }
    ]
  },

  // 5001104 — Dover Cattle, conventional new, COMPLETED
  {
    id:              "5001104",
    cph:             "44/099/0001",
    herd:            "112211",
    species:         "Cattle",
    type:            "conventional",
    variant:         "new",
    date:            "2026-05-28T08:45:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "DAF-054",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK112211", tagStart: 3301, tagEnd: 3310, qty: 10, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Orange", colourHex: "#e08a2b",
        tagPrefix: "UK112211", tagStart: 3301, tagEnd: 3310, qty: 10, class: "Flag" }
    ]
  },

  // 5001105 — Dover Sheep, EID new, PART CANCELLED (200 of 500 cancelled, none reinstated)
  {
    id:              "5001105",
    cph:             "44/099/0001",
    herd:            "112233",
    species:         "Sheep",
    type:            "eid",
    variant:         "new",
    date:            "2026-06-15T09:00:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "DAF-061",
    lines: [
      { row: "eid", product: "EID Qwik (2020)", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK112233", tagStart: 500217, tagEnd: 500716, qty: 500, class: "Flag" }
    ]
  },

  // 5001106 — Greenfield Sheep, slaughter new, COMPLETED
  {
    id:              "5001106",
    cph:             "44/088/0001",
    herd:            "123123",
    species:         "Sheep",
    type:            "slaughter",
    variant:         "new",
    date:            "2025-11-18T11:30:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "primary", product: "EID (S) RapID", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK123123", tagStart: 2050, tagEnd: 2059, qty: 10, class: "Flag" }
    ]
  },

  // 5001107 — Dover Cattle, replica replacement, COMPLETED
  // Replicas are individual tags, not a range: one line per tag per position
  // (tagStart === tagEnd, qty 1). Tag numbers can be anywhere in the herd's history.
  {
    id:              "5001107",
    cph:             "44/099/0001",
    herd:            "112211",
    species:         "Cattle",
    type:            "replica",
    variant:         "replacement",
    date:            "2026-01-07T09:00:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 3298, tagEnd: 3298, qty: 1, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 3298, tagEnd: 3298, qty: 1, class: "Flag" },
      { row: "primary",   product: "Ultra Junior Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 3187, tagEnd: 3187, qty: 1, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 3052, tagEnd: 3052, qty: 1, class: "Flag" },
      { row: "primary",   product: "Ultra Junior Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 2964, tagEnd: 2964, qty: 1, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK112211", tagStart: 2964, tagEnd: 2964, qty: 1, class: "Flag" }
    ]
  },

  // 5001108 — Greenfield Sheep, EID replacement, COMPLETED
  {
    id:              "5001108",
    cph:             "44/088/0001",
    herd:            "123123",
    species:         "Sheep",
    type:            "eid",
    variant:         "replacement",
    date:            "2026-04-02T10:45:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "eid",    product: "EID FDX Button (B4S/OVN)",  colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK123123", tagStart: 2060, tagEnd: 2064, qty: 5, class: "Flag" },
      { row: "nonEid", product: "Ultra Button", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK123123", tagStart: 2060, tagEnd: 2064, qty: 5, class: "Flag" }
    ]
  },

  // 5001109 — Wilson Lodge Cattle, conventional new, COMPLETED (second Wilson Lodge order)
  {
    id:              "5001109",
    cph:             "44/077/0001",
    herd:            "123456",
    species:         "Cattle",
    type:            "conventional",
    variant:         "new",
    date:            "2025-08-12T14:00:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "WL-019",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK123456", tagStart: 61, tagEnd: 75, qty: 15, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Blue",   colourHex: "#2f6fb0",
        tagPrefix: "UK123456", tagStart: 61, tagEnd: 75, qty: 15, class: "Flag" }
    ]
  },

  // 5001110 — Wilson Lodge Outfarm Cattle (same herd 123456, different CPH), conventional new, COMPLETED
  {
    id:              "5001110",
    cph:             "44/077/0002",
    herd:            "123456",
    species:         "Cattle",
    type:            "conventional",
    variant:         "new",
    date:            "2025-05-20T09:30:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: "WL-011",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", colour: "Yellow", colourHex: "#f2d024",
        tagPrefix: "UK123456", tagStart: 41, tagEnd: 60, qty: 20, class: "Flag" },
      { row: "secondary", product: "Ultra Button Visual", colour: "Blue",   colourHex: "#2f6fb0",
        tagPrefix: "UK123456", tagStart: 41, tagEnd: 60, qty: 20, class: "Flag" }
    ]
  },

  // 5001111 — Wilson Lodge Cattle, replica replacement (single tag, primary only), COMPLETED
  {
    id:              "5001111",
    cph:             "44/077/0001",
    herd:            "123456",
    species:         "Cattle",
    type:            "replica",
    variant:         "replacement",
    date:            "2026-04-20T15:20:00",
    orderedBy:       "AllflexServiceAccount",
    manufacturerRef: null,
    lines: [
      { row: "primary", product: "Ultra Junior Visual", colour: "Red", colourHex: "#c0392b",
        tagPrefix: "UK123456", tagStart: 64, tagEnd: 64, qty: 1, class: "Flag" }
    ]
  }

];

// ── Cancellations ─────────────────────────────────────────────────────────────
// Own ID sequence (4xxxx). An order may accrue multiple cancellations over time;
// this is a flat array filtered by orderId — not nested inside orders[].
// lines[].tagRanges is always an array to support non-contiguous subsets.
window.LUIS_DATA.cancellations = [

  // 40010 — cancels order 5001101 (Greenfield Sheep, fully cancelled)
  {
    id:          "40010",
    orderId:     "5001101",
    cancelledOn: "2026-02-03T09:15:00",
    cancelledBy: "TerryField",
    reason:      "Ordered in error",
    lines: [
      { row: "eid",    product: "EID FDX Button (B4S/OVN)",  qty: 20,
        tagRanges: [{ tagPrefix: "UK123123", start: 2030, end: 2049 }] },
      { row: "nonEid", product: "Ultra Button", qty: 20,
        tagRanges: [{ tagPrefix: "UK123123", start: 2030, end: 2049 }] }
    ]
  },

  // 40011 — cancels order 5001102 (Wilson Lodge Cattle, partially reinstated later)
  {
    id:          "40011",
    orderId:     "5001102",
    cancelledOn: "2026-04-22T14:30:00",
    cancelledBy: "TerryField",
    reason:      "Lost in transit",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", qty: 10,
        tagRanges: [{ tagPrefix: "UK123456", start: 76, end: 85 }] },
      { row: "secondary", product: "Ultra Button Visual", qty: 10,
        tagRanges: [{ tagPrefix: "UK123456", start: 76, end: 85 }] }
    ]
  },

  // 40012 — cancels order 5001103 (Dover Sheep, no reinstatement)
  {
    id:          "40012",
    orderId:     "5001103",
    cancelledOn: "2026-05-10T11:00:00",
    cancelledBy: "TerryField",
    reason:      "Duplicate order",
    lines: [
      { row: "eid", product: "EID FDX Button (B4S/OVN)", qty: 5,
        tagRanges: [{ tagPrefix: "UK112222", start: 1495, end: 1499 }] }
    ]
  },

  // 40013 — cancels 200 of 500 tags from order 5001105 (Dover Sheep, no reinstatement → Part cancelled)
  {
    id:          "40013",
    orderId:     "5001105",
    cancelledOn: "2026-06-20T13:33:00",
    cancelledBy: "TerryField",
    reason:      "Not required",
    lines: [
      { row: "eid", product: "EID Qwik (2020)", qty: 200,
        tagRanges: [{ tagPrefix: "UK112233", start: 500217, end: 500416 }] }
    ]
  }

];

// ── Reinstatements ────────────────────────────────────────────────────────────
// Own ID sequence (4xx). At most one reinstatement per cancellation.
// orderId is denormalised for convenient lookup.
window.LUIS_DATA.reinstatements = [

  // 400 — reinstates cancellation 40010 (Greenfield Sheep) — FULL reinstatement
  // qty and tagRanges match the cancellation exactly
  {
    id:             "400",
    cancellationId: "40010",
    orderId:        "5001101",
    reinstatedOn:   "2026-02-03T09:16:00",
    reinstatedBy:   "TerryField",
    lines: [
      { row: "eid",    product: "EID FDX Button (B4S/OVN)",  qty: 20,
        tagRanges: [{ tagPrefix: "UK123123", start: 2030, end: 2049 }] },
      { row: "nonEid", product: "Ultra Button", qty: 20,
        tagRanges: [{ tagPrefix: "UK123123", start: 2030, end: 2049 }] }
    ]
  },

  // 401 — reinstates cancellation 40011 (Wilson Lodge Cattle) — PARTIAL reinstatement
  // 10 cancelled, 6 reinstated per row; two non-contiguous ranges (tags 79-82 not returned)
  {
    id:             "401",
    cancellationId: "40011",
    orderId:        "5001102",
    reinstatedOn:   "2026-04-22T16:00:00",
    reinstatedBy:   "TerryField",
    lines: [
      { row: "primary",   product: "Ultra Junior Visual", qty: 6,
        tagRanges: [
          { tagPrefix: "UK123456", start: 76, end: 78 },
          { tagPrefix: "UK123456", start: 83, end: 85 }
        ]
      },
      { row: "secondary", product: "Ultra Button Visual", qty: 6,
        tagRanges: [
          { tagPrefix: "UK123456", start: 76, end: 78 },
          { tagPrefix: "UK123456", start: 83, end: 85 }
        ]
      }
    ]
  }

];

// ── Order lookup helpers ──────────────────────────────────────────────────────

window.LUIS_DATA.getOrdersForCph = function (cph) {
  return (window.LUIS_DATA.orders || [])
    .filter(function (o) { return o.cph === cph; })
    .sort(function (a, b) { return a.date > b.date ? -1 : a.date < b.date ? 1 : 0; });
};

window.LUIS_DATA.getOrderById = function (id) {
  return (window.LUIS_DATA.orders || [])
    .filter(function (o) { return o.id === id; })[0];
};

window.LUIS_DATA.getCancellationsForOrder = function (orderId) {
  return (window.LUIS_DATA.cancellations || [])
    .filter(function (c) { return c.orderId === orderId; })
    .sort(function (a, b) { return a.cancelledOn < b.cancelledOn ? -1 : a.cancelledOn > b.cancelledOn ? 1 : 0; });
};

window.LUIS_DATA.getReinstatementForCancellation = function (cancellationId) {
  return (window.LUIS_DATA.reinstatements || [])
    .filter(function (r) { return r.cancellationId === cancellationId; })[0];
};

// getOrderHistory — merges all cancellation + reinstatement events for one order,
// sorted ascending by date. Feeds an Order View "Order History" section.
window.LUIS_DATA.getOrderHistory = function (orderId) {
  var events = [];
  window.LUIS_DATA.getCancellationsForOrder(orderId).forEach(function (c) {
    events.push({ type: "Cancellation", date: c.cancelledOn, id: c.id });
    var r = window.LUIS_DATA.getReinstatementForCancellation(c.id);
    if (r) { events.push({ type: "Reinstatement", date: r.reinstatedOn, id: r.id }); }
  });
  return events.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
};

// getOrderStatus — qty-aware derivation.
// "Reinstated" wins if ANY cancellation has been partially or fully reinstated.
// Else compare netCancelledQty against totalOrderQty to distinguish
// Cancelled / Part cancelled / Completed.
window.LUIS_DATA.getOrderStatus = function (orderId) {
  var cancellations = window.LUIS_DATA.getCancellationsForOrder(orderId);
  if (cancellations.length === 0) { return "Completed"; }

  var order = window.LUIS_DATA.getOrderById(orderId);
  var totalOrderQty = order
    ? order.lines.reduce(function (s, l) { return s + l.qty; }, 0)
    : 0;

  var hasReinstatement = false;
  var netCancelledQty  = 0;
  cancellations.forEach(function (c) {
    var cQty = c.lines.reduce(function (s, l) { return s + l.qty; }, 0);
    var r    = window.LUIS_DATA.getReinstatementForCancellation(c.id);
    var rQty = r ? r.lines.reduce(function (s, l) { return s + l.qty; }, 0) : 0;
    if (r) { hasReinstatement = true; }
    netCancelledQty += cQty - rQty;
  });

  if (hasReinstatement)                 { return "Reinstated";     }
  if (netCancelledQty <= 0)             { return "Completed";      }
  if (netCancelledQty >= totalOrderQty) { return "Cancelled";      }
  return "Part cancelled";
};

window.LUIS_DATA.getOrderStatusPill = function (status) {
  if (status === "Completed")      { return { label: "Completed",      bg: "#eaf3de", color: "#3b6d11", outline: null }; }
  if (status === "Reinstated")     { return { label: "Reinstated",     bg: "#fff8e1", color: "#7a5800", outline: null }; }
  if (status === "Cancelled")      { return { label: "Cancelled",      bg: "#fcebeb", color: "#a32d2d", outline: null }; }
  if (status === "Part cancelled") { return { label: "Part cancelled", bg: "#ffffff", color: "#a32d2d", outline: "1px solid #a32d2d" }; }
  return { label: status, bg: "#f0f0f0", color: "#666666", outline: null };
};

window.LUIS_DATA.getCancellationById = function (id) {
  return (window.LUIS_DATA.cancellations || [])
    .filter(function (c) { return c.id === id; })[0];
};

window.LUIS_DATA.getReinstatementById = function (id) {
  return (window.LUIS_DATA.reinstatements || [])
    .filter(function (r) { return r.id === id; })[0];
};

// ── Service account → manufacturer display name ───────────────────────────────
// Maps the orderedBy account key (as stored on orders) to the human-readable
// manufacturer name shown in the UI. Currently only one active manufacturer.
window.LUIS_DATA.serviceAccounts = {
  "AllflexServiceAccount": "Allflex UK Group Ltd"
};

window.LUIS_DATA.getManufacturerDisplayName = function (orderedBy) {
  return (window.LUIS_DATA.serviceAccounts || {})[orderedBy] || String(orderedBy == null ? '' : orderedBy);
};

// ── Animals ───────────────────────────────────────────────────────────────────
// id:  "an-<herd>-<animalNumber>" — unique across the stub set.
// tagSlots.primary / .secondary hold sequential tag reps (rep 1 = original,
// rep 2 = first replacement, etc.). An empty array means no tag in that slot.
// tagRep.reinstatementId is non-null when the tag was applied as part of a
// reinstatement event rather than a direct order.
window.LUIS_DATA.animals = [

  // an-654321-00132 — Greenfield Cattle, alive, primary tag only (no secondary)
  {
    id:              "an-654321-00132",
    animalNumber:    "00132",
    species:         "Cattle",
    cph:             "44/088/0001",
    herd:            "654321",
    dateOfBirth:     "2025-09-15",
    dateOfApplication: "2025-10-02",
    dateOfDeath:     null,
    tagSlots: {
      primary: [
        {
          rep:             1,
          tagNumber:       "UK654321000132",
          product:         "Ultra Junior Visual",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/088/0001",
          startedOn:       "2025-10-02",
          endedOn:         null,
          orderId:         "5001100",
          reinstatementId: null
        }
      ],
      secondary: []
    }
  },

  // an-123456-00061 — Wilson Lodge Cattle, alive, both slots replaced once
  // Primary rep 1 (orig from order 5001109) ended when tag lost; rep 2 applied
  // from reinstated order 5001102 (reinstatement 401 covers this tag range).
  {
    id:              "an-123456-00061",
    animalNumber:    "00061",
    species:         "Cattle",
    cph:             "44/077/0001",
    herd:            "123456",
    dateOfBirth:     "2025-07-20",
    dateOfApplication: "2025-08-13",
    dateOfDeath:     null,
    tagSlots: {
      primary: [
        {
          rep:             1,
          tagNumber:       "UK123456000061",
          product:         "Ultra Junior Visual",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/077/0001",
          startedOn:       "2025-08-13",
          endedOn:         "2026-04-20",
          orderId:         "5001109",
          reinstatementId: null
        },
        {
          rep:             2,
          tagNumber:       "UK123456000076",
          product:         "Ultra Junior Visual",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/077/0001",
          startedOn:       "2026-04-23",
          endedOn:         null,
          orderId:         "5001102",
          reinstatementId: null
        }
      ],
      secondary: [
        {
          rep:             1,
          tagNumber:       "UK123456000061",
          product:         "Standard Cattle Tag",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/077/0001",
          startedOn:       "2025-08-13",
          endedOn:         "2026-04-20",
          orderId:         "5001109",
          reinstatementId: null
        },
        {
          rep:             2,
          tagNumber:       "UK123456000076",
          product:         "Standard Cattle Tag",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/077/0001",
          startedOn:       "2026-04-23",
          endedOn:         null,
          orderId:         "5001102",
          reinstatementId: "401"
        }
      ]
    }
  },

  // an-112211-03301 — Dover Cattle, deceased 2026-06-10
  {
    id:              "an-112211-03301",
    animalNumber:    "03301",
    species:         "Cattle",
    cph:             "44/099/0001",
    herd:            "112211",
    dateOfBirth:     "2025-12-01",
    dateOfApplication: "2026-05-29",
    dateOfDeath:     "2026-06-10",
    tagSlots: {
      primary: [
        {
          rep:             1,
          tagNumber:       "UK112211003301",
          product:         "Ultra Junior Visual",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/099/0001",
          startedOn:       "2026-05-29",
          endedOn:         "2026-06-10",
          orderId:         "5001104",
          reinstatementId: null
        }
      ],
      secondary: [
        {
          rep:             1,
          tagNumber:       "UK112211003301",
          product:         "Standard Cattle Tag",
          manufacturer:    "Allflex UK Group Ltd",
          class:           "Flag",
          cph:             "44/099/0001",
          startedOn:       "2026-05-29",
          endedOn:         "2026-06-10",
          orderId:         "5001104",
          reinstatementId: null
        }
      ]
    }
  }

];

// ── Animal lookup helpers ─────────────────────────────────────────────────────

// getAnimalByTagNumber — scans every tagSlot rep across all animals.
// Returns { animal, slot, rep } where slot is "primary" or "secondary"
// and rep is the matching tagRep object. Returns null if not found.
window.LUIS_DATA.getAnimalByTagNumber = function (tagNumber) {
  var tag     = String(tagNumber == null ? '' : tagNumber).trim().toUpperCase();
  var animals = window.LUIS_DATA.animals || [];
  var slots   = ['primary', 'secondary'];
  for (var i = 0; i < animals.length; i++) {
    var a = animals[i];
    for (var j = 0; j < slots.length; j++) {
      var slot = slots[j];
      var reps = (a.tagSlots && a.tagSlots[slot]) ? a.tagSlots[slot] : [];
      for (var k = 0; k < reps.length; k++) {
        if (String(reps[k].tagNumber).toUpperCase() === tag) {
          return { animal: a, slot: slot, rep: reps[k] };
        }
      }
    }
  }
  return null;
};

// getTagHistoryRows — flat tag history for one animal.
// slotFilter: "primary" | "secondary" | "all"
//
// For each tagRep (sorted most-recent rep first per slot) two kinds of row
// are emitted:
//
//   Creation rows (eventType: "tag") — one per rep, same shape as before
//   plus manufacturerName (resolved via getManufacturerDisplayName) and
//   orderType (the order's type key, e.g. "conventional").
//
//   Event rows — zero or more per rep, one per cancellation on that rep's
//   order. If the cancellation has a reinstatement: eventType "recovery",
//   status "Recovered", endedOn = reinstatedOn, linkId = reinstatement id.
//   If no reinstatement yet: eventType "cancellation", status "Lost",
//   endedOn = cancelledOn, linkId = cancellation id.
//   Event rows carry the same tagNumber/product/manufacturer/slot as their
//   parent rep, rep = null.
window.LUIS_DATA.getTagHistoryRows = function (animal, slotFilter) {
  if (!animal || !animal.tagSlots) { return []; }
  var LD    = window.LUIS_DATA;
  var sf    = String(slotFilter == null ? 'all' : slotFilter).toLowerCase();
  var slots = sf === 'primary'   ? ['primary']
            : sf === 'secondary' ? ['secondary']
            : ['primary', 'secondary'];
  var rows  = [];

  slots.forEach(function (slot) {
    var reps = (animal.tagSlots[slot] || []).slice().sort(function (a, b) { return b.rep - a.rep; });
    reps.forEach(function (r) {
      var order        = r.orderId ? LD.getOrderById(r.orderId) : null;
      var mfrName      = order ? LD.getManufacturerDisplayName(order.orderedBy) : r.manufacturer;
      var otype        = order ? order.type : null;

      // ── Creation row ──────────────────────────────────────────────────────
      rows.push({
        slot:            slot,
        rep:             r.rep,
        tagNumber:       r.tagNumber,
        product:         r.product,
        manufacturer:    r.manufacturer,
        class:           r.class,
        cph:             r.cph,
        startedOn:       r.startedOn,
        endedOn:         r.endedOn,
        orderId:         r.orderId,
        reinstatementId: r.reinstatementId,
        status:          r.endedOn ? 'Ended' : '',
        eventType:       'tag',
        manufacturerName: mfrName,
        orderType:       otype
      });

      // ── Event rows (cancellations ± reinstatements) ───────────────────────
      if (r.orderId) {
        LD.getCancellationsForOrder(r.orderId).forEach(function (c) {
          var reinstatement = LD.getReinstatementForCancellation(c.id);
          if (reinstatement) {
            rows.push({
              slot:            slot,
              rep:             null,
              tagNumber:       r.tagNumber,
              product:         r.product,
              manufacturer:    r.manufacturer,
              class:           r.class,
              cph:             r.cph,
              startedOn:       null,
              endedOn:         reinstatement.reinstatedOn,
              orderId:         r.orderId,
              reinstatementId: reinstatement.id,
              status:          'Recovered',
              eventType:       'recovery',
              linkId:          reinstatement.id,
              reason:          c.reason,
              manufacturerName: mfrName,
              orderType:       otype
            });
          } else {
            rows.push({
              slot:            slot,
              rep:             null,
              tagNumber:       r.tagNumber,
              product:         r.product,
              manufacturer:    r.manufacturer,
              class:           r.class,
              cph:             r.cph,
              startedOn:       null,
              endedOn:         c.cancelledOn,
              orderId:         r.orderId,
              reinstatementId: null,
              status:          'Lost',
              eventType:       'cancellation',
              linkId:          c.id,
              reason:          c.reason,
              manufacturerName: mfrName,
              orderType:       otype
            });
          }
        });
      }
    });
  });

  return rows;
};

// ── ID / range generation helpers ────────────────────────────────────────────

window.LUIS_DATA.getNextOrderId = function () {
  var orders = window.LUIS_DATA.orders || [];
  var max = orders.reduce(function (m, o) {
    var n = parseInt(o.id, 10);
    return isNaN(n) ? m : Math.max(m, n);
  }, 0);
  return String(max + 1);
};

window.LUIS_DATA.getNextTagRange = function (cph, herd, qty) {
  var keeper = window.LUIS_DATA.getKeeperByCph(cph);
  if (!keeper) { return null; }
  var herdStr = String(herd);
  var herdEntry = null;
  for (var i = 0; i < (keeper.herds || []).length; i++) {
    if (String(keeper.herds[i].herd) === herdStr) { herdEntry = keeper.herds[i]; break; }
  }
  if (!herdEntry || !herdEntry.tag || herdEntry.tag.nextTag == null) { return null; }
  var start = herdEntry.tag.nextTag;
  return { tagPrefix: 'UK' + herdStr, start: start, end: start + qty - 1 };
};

// ── Demo cancellation stub ────────────────────────────────────────────────────
// Describes the specific wired path through order-cancellation.html
// (Q1:Yes → Q2:No → Q3:Lost → Q4:No → TAGS 3301–3303).
// NOT pushed into LUIS_DATA.cancellations at load time. The wizard writes it to
// sessionStorage; order-view.html reads and commits it on the next page load.
window.LUIS_DATA.demoCancellationStub = {
  id:          "40014",
  orderId:     "5001104",
  cancelledOn: null,
  cancelledBy: "AllflexServiceAccount",
  reason:      "Lost in transit",
  lines: [{
    row:       "primary",
    product:   "Ultra Junior Visual",
    qty:       3,
    tagRanges: [{ tagPrefix: "UK112211", start: 3301, end: 3303 }]
  }]
};
