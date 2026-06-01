/**
 * YoSin Tools — Google AdSense Controller
 * singhyogendra.com.np
 *
 * HOW TO USE:
 * 1. Replace YOUR_ADSENSE_CLIENT_ID with your actual AdSense publisher ID
 *    e.g. ca-pub-1234567890123456
 * 2. Replace each AD_SLOT_ID with your actual ad slot IDs from AdSense
 * 3. AdSense script tag is loaded automatically when client ID is set
 *
 * Ad positions loaded on every page:
 *   #ad-below-header   — leaderboard below the page header
 *   #ad-inline         — in-content after tool intro
 *   #ad-before-faq     — above the FAQ section
 *   #ad-sidebar        — sidebar rectangle (desktop only)
 *   #ad-bottom         — bottom of page leaderboard
 */

(function () {
  'use strict';

  // ── EDIT THESE VALUES ────────────────────────────────────────────────────
  var CLIENT_ID = 'ca-pub-XXXXXXXXXXXXXXXX';   // ← your AdSense publisher ID

  var SLOTS = {
    'ad-below-header':  '0000000001',           // ← slot IDs from AdSense dashboard
    'ad-inline':        '0000000002',
    'ad-before-faq':    '0000000003',
    'ad-sidebar':       '0000000004',
    'ad-bottom':        '0000000005'
  };
  // ────────────────────────────────────────────────────────────────────────

  // Do not inject ads on localhost during dev
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    renderPlaceholders();
    return;
  }

  // Load AdSense script once
  if (CLIENT_ID.indexOf('XXXX') === -1) {
    var script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT_ID;
    document.head.appendChild(script);

    script.onload = function () { injectAds(); };
  } else {
    // Client ID not configured — show dev placeholders
    renderPlaceholders();
  }

  function injectAds() {
    Object.keys(SLOTS).forEach(function (id) {
      var container = document.getElementById(id);
      if (!container) return;

      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.cssText = 'display:block;width:100%;';
      ins.setAttribute('data-ad-client', CLIENT_ID);
      ins.setAttribute('data-ad-slot', SLOTS[id]);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      container.appendChild(ins);

      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch (e) { /* silence */ }
    });
  }

  function renderPlaceholders() {
    Object.keys(SLOTS).forEach(function (id) {
      var container = document.getElementById(id);
      if (!container) return;
      container.style.cssText =
        'background:repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6 10px,#e5e7eb 10px,#e5e7eb 20px);' +
        'border:1px dashed #d1d5db;border-radius:8px;min-height:90px;display:flex;' +
        'align-items:center;justify-content:center;font-size:12px;color:#9ca3af;';
      container.textContent = 'Ad · ' + id + ' (configure in googleads.js)';
    });
  }
})();
