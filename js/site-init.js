/**
 * YoSin Tools — Site Init
 * Loaded as a plain (non-deferred) script at the bottom of every page body,
 * so the DOM is already parsed and selects are available when this runs.
 *
 * Responsibilities:
 *   1. Provide a gtag() stub so main.js never throws "gtag is not defined"
 *   2. Populate every INPUT-encoding <select> with the full encoding list
 *      (output-encoding selects are skipped — they carry data-type="hex")
 */

/* ── 1. gtag stub ─────────────────────────────────────────────────────────── */
window.dataLayer = window.dataLayer || [];
if (typeof window.gtag !== 'function') {
  window.gtag = function () { window.dataLayer.push(arguments); };
}

/* ── 2. Full encoding population ──────────────────────────────────────────── */
(function () {
  var BINARY = [
    { v: 'hex',    t: 'Hex' },
    { v: 'base64', t: 'Base64', a: { 'data-load-encoding': 'base64' } }
  ];

  var TEXT = [
    { v: 'utf-8',          t: 'UTF-8',          sel: true },
    { v: 'utf-16le',       t: 'UTF-16LE',        a: { 'data-load-encoding': '1' } },
    { v: 'utf-16be',       t: 'UTF-16BE',        a: { 'data-load-encoding': '1' } },
    { v: 'ibm866',         t: 'IBM866',          a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-2',     t: 'ISO-8859-2',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-3',     t: 'ISO-8859-3',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-4',     t: 'ISO-8859-4',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-5',     t: 'ISO-8859-5',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-6',     t: 'ISO-8859-6',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-7',     t: 'ISO-8859-7',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-8',     t: 'ISO-8859-8',      a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-8-i',   t: 'ISO-8859-8-I',    a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-10',    t: 'ISO-8859-10',     a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-13',    t: 'ISO-8859-13',     a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-14',    t: 'ISO-8859-14',     a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-15',    t: 'ISO-8859-15',     a: { 'data-load-encoding': '2' } },
    { v: 'iso-8859-16',    t: 'ISO-8859-16',     a: { 'data-load-encoding': '2' } },
    { v: 'koi8-r',         t: 'KOI8-R',          a: { 'data-load-encoding': '2' } },
    { v: 'koi8-u',         t: 'KOI8-U',          a: { 'data-load-encoding': '2' } },
    { v: 'macintosh',      t: 'macintosh',       a: { 'data-load-encoding': '2' } },
    { v: 'windows-874',    t: 'Windows-874',     a: { 'data-load-encoding': '2' } },
    { v: 'windows-1250',   t: 'Windows-1250',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1251',   t: 'Windows-1251',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1252',   t: 'Windows-1252',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1253',   t: 'Windows-1253',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1254',   t: 'Windows-1254',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1255',   t: 'Windows-1255',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1256',   t: 'Windows-1256',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1257',   t: 'Windows-1257',    a: { 'data-load-encoding': '2' } },
    { v: 'windows-1258',   t: 'Windows-1258',    a: { 'data-load-encoding': '2' } },
    { v: 'x-mac-cyrillic', t: 'x-mac-cyrillic',  a: { 'data-load-encoding': '2' } },
    { v: 'gbk',            t: 'GBK',             a: { 'data-load-encoding': '2' } },
    { v: 'gb18030',        t: 'gb18030',         a: { 'data-load-encoding': '2' } },
    { v: 'big5',           t: 'Big5',            a: { 'data-load-encoding': '2' } },
    { v: 'euc-jp',         t: 'EUC-JP',          a: { 'data-load-encoding': '2' } },
    { v: 'iso-2022-jp',    t: 'ISO-2022-JP',     a: { 'data-load-encoding': '2' } },
    { v: 'shift_jis',      t: 'Shift_JIS',       a: { 'data-load-encoding': '2' } },
    { v: 'euc-kr',         t: 'EUC-KR',          a: { 'data-load-encoding': '2' } },
    { v: 'x-user-defined', t: 'x-user-defined',  a: { 'data-load-encoding': '2' } }
  ];

  function makeOpt(cfg) {
    var o = document.createElement('option');
    o.value = cfg.v;
    o.textContent = cfg.t;
    if (cfg.sel) { o.selected = true; o.defaultSelected = true; }
    if (cfg.a) {
      Object.keys(cfg.a).forEach(function (k) { o.setAttribute(k, cfg.a[k]); });
    }
    return o;
  }

  function makeGroup(label, items) {
    var g = document.createElement('optgroup');
    g.label = label;
    items.forEach(function (c) { g.appendChild(makeOpt(c)); });
    return g;
  }

  /* Target only INPUT-encoding selects.
     Output selects carry data-type="hex" and must not be touched. */
  document.querySelectorAll('select[data-toggle="encoding"]:not([data-type])').forEach(function (sel) {
    /* Preserve any value already set (e.g. restored from localStorage by main.js later) */
    var prev = sel.value;
    sel.innerHTML = '';
    sel.appendChild(makeGroup('Binary', BINARY));
    sel.appendChild(makeGroup('Text',   TEXT));
    /* Restore previous selection if it still exists */
    if (prev) { sel.value = prev; }
  });
}());
