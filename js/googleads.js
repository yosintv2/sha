/**
 * YoSin Tools — Google AdSense (ca-pub-5525538810839147)
 * Ad positions: #ad-below-header · #ad-inline · #ad-before-faq · #ad-sidebar · #ad-bottom
 */

(function () {
  'use strict';

  var CLIENT_ID = 'ca-pub-5525538810839147';
  var SLOT_ID   = '4345862479';

  var SLOTS = {
    'ad-below-header': SLOT_ID,
    'ad-inline':       SLOT_ID,
    'ad-before-faq':   SLOT_ID,
    'ad-sidebar':      SLOT_ID,
    'ad-bottom':       SLOT_ID
  };

  // Load AdSense script once (skip on localhost)
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    var script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT_ID;
    document.head.appendChild(script);
    script.onload = function () { injectAds(); };
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


})();
