/**
 * nav.js — single source of truth for sidebar navigation.
 * To add a new tool: add an entry to NAV below. All pages update automatically.
 *
 * Item format: [label, href]
 * href is relative to the /hash/ directory. For pages outside /hash/ (e.g. root),
 * set window.NAV_BASE = 'hash/' before loading this script.
 */
(function () {
  var NAV = [
    {
      section: 'Hash',
      groups: [
        {
          name: 'CRC',
          items: [['CRC', 'crc.html']]
        },
        {
          name: 'MD',
          items: [
            ['MD2', 'md2.html'], ['MD2 File', 'md2-file.html'],
            ['MD4', 'md4.html'], ['MD4 File', 'md4-file.html'],
            ['MD5', 'md5.html'], ['MD5 File', 'md5-file.html']
          ]
        },
        {
          name: 'SHA1',
          items: [
            ['SHA1', 'sha1.html'], ['SHA1 File', 'sha1-file.html']
          ]
        },
        {
          name: 'SHA2',
          items: [
            ['SHA224', 'sha224.html'], ['SHA224 File', 'sha224-file.html'],
            ['SHA256', 'sha256.html'], ['SHA256 File', 'sha256-file.html'],
            ['Double SHA256', 'double-sha256.html']
          ]
        },
        {
          name: 'SHA2-512',
          items: [
            ['SHA384', 'sha384.html'], ['SHA384 File', 'sha384-file.html'],
            ['SHA512', 'sha512.html'], ['SHA512 File', 'sha512-file.html'],
            ['SHA512/224', 'sha512-224.html'], ['SHA512/224 File', 'sha512-224-file.html'],
            ['SHA512/256', 'sha512-256.html'], ['SHA512/256 File', 'sha512-256-file.html']
          ]
        },
        {
          name: 'SHA3',
          items: [
            ['SHA3-224', 'sha3-224.html'], ['SHA3-224 File', 'sha3-224-file.html'],
            ['SHA3-256', 'sha3-256.html'], ['SHA3-256 File', 'sha3-256-file.html'],
            ['SHA3-384', 'sha3-384.html'], ['SHA3-384 File', 'sha3-384-file.html'],
            ['SHA3-512', 'sha3-512.html'], ['SHA3-512 File', 'sha3-512-file.html']
          ]
        },
        {
          name: 'Keccak',
          items: [
            ['Keccak-224', 'keccak-224.html'], ['Keccak-224 File', 'keccak-224-file.html'],
            ['Keccak-256', 'keccak-256.html'], ['Keccak-256 File', 'keccak-256-file.html'],
            ['Keccak-384', 'keccak-384.html'], ['Keccak-384 File', 'keccak-384-file.html'],
            ['Keccak-512', 'keccak-512.html'], ['Keccak-512 File', 'keccak-512-file.html']
          ]
        },
        {
          name: 'SHAKE',
          items: [
            ['SHAKE128', 'shake128.html'], ['SHAKE128 File', 'shake128-file.html'],
            ['SHAKE256', 'shake256.html'], ['SHAKE256 File', 'shake256-file.html']
          ]
        },
        {
          name: 'cSHAKE',
          items: [
            ['cSHAKE128', 'cshake128.html'], ['cSHAKE128 File', 'cshake128-file.html'],
            ['cSHAKE256', 'cshake256.html'], ['cSHAKE256 File', 'cshake256-file.html']
          ]
        },
        {
          name: 'KMAC',
          items: [
            ['KMAC128', 'kmac128.html'], ['KMAC128 File', 'kmac128-file.html'],
            ['KMAC256', 'kmac256.html'], ['KMAC256 File', 'kmac256-file.html']
          ]
        },
        {
          name: 'RIPEMD',
          items: [
            ['RIPEMD-128', 'ripemd-128.html'], ['RIPEMD-128 File', 'ripemd-128-file.html'],
            ['RIPEMD-160', 'ripemd-160.html'], ['RIPEMD-160 File', 'ripemd-160-file.html'],
            ['RIPEMD-256', 'ripemd-256.html'], ['RIPEMD-256 File', 'ripemd-256-file.html'],
            ['RIPEMD-320', 'ripemd-320.html'], ['RIPEMD-320 File', 'ripemd-320-file.html']
          ]
        },
        {
          name: 'BLAKE',
          items: [
            ['BLAKE2b', 'blake2b.html'], ['BLAKE2b File', 'blake2b-file.html'],
            ['BLAKE2s', 'blake2s.html'], ['BLAKE2s File', 'blake2s-file.html']
          ]
        }
      ]
    }
  ];

  var LINKS = [['Home', '../index.html']];

  function render() {
    var base = window.NAV_BASE || '';
    var homeHref = window.NAV_HOME || '../index.html';
    var currentFile = location.pathname.split('/').pop() || '';

    var html = '';

    for (var s = 0; s < NAV.length; s++) {
      var sec = NAV[s];
      html += '<div class="section"><h3>' + sec.section + '</h3>';

      for (var g = 0; g < sec.groups.length; g++) {
        var group = sec.groups[g];
        var groupActive = false;
        var itemsHtml = '';

        for (var i = 0; i < group.items.length; i++) {
          var item = group.items[i];
          var href = base + item[1];
          var isActive = item[1] === currentFile;
          if (isActive) groupActive = true;
          itemsHtml += '<li' + (isActive ? ' class="active"' : '') + '><a href="' + href + '">' + item[0] + '</a></li>';
        }

        html += '<details' + (groupActive ? ' class="active" open' : '') + '>';
        html += '<summary>' + group.name + '</summary>';
        html += '<nav><ol>' + itemsHtml + '</ol></nav>';
        html += '</details>';
      }

      html += '</div>';
    }

    html += '<div class="section"><h3>Links</h3><nav class="links"><ol>';
    html += '<li><a href="' + homeHref + '">Home</a></li>';
    html += '</ol></nav></div>';

    return html;
  }

  function init() {
    var container = document.querySelector('#sidebar .container');
    if (!container) return;

    /* Remove existing static .section elements */
    var existing = container.querySelectorAll('.section');
    for (var i = existing.length - 1; i >= 0; i--) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    /* Inject dynamic nav */
    var div = document.createElement('div');
    div.innerHTML = render();
    while (div.firstChild) {
      container.appendChild(div.firstChild);
    }

    /* Prevent Chrome's native <details> expand from scrolling the main page */
    var summaries = container.querySelectorAll('summary');
    for (var j = 0; j < summaries.length; j++) {
      summaries[j].addEventListener('click', function () {
        var y = window.pageYOffset;
        requestAnimationFrame(function () { window.scrollTo(0, y); });
      }, { passive: true });
    }

    /* Attach search handler (idempotent — replaces any previous listener via clone trick) */
    var input = document.getElementById('tool-search');
    if (input) {
      var fresh = input.cloneNode(true);
      input.parentNode.replaceChild(fresh, input);
      fresh.addEventListener('input', function () {
        var q = this.value.toLowerCase();
        var items = container.querySelectorAll('li');
        for (var i = 0; i < items.length; i++) {
          items[i].style.display = (q && items[i].textContent.toLowerCase().indexOf(q) === -1) ? 'none' : '';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
