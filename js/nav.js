/**
 * nav.js — single source of truth for sidebar navigation.
 * Item format: [label, 'dir/file.html']
 * Base path is auto-detected from URL depth; override with window.NAV_BASE.
 */
(function () {
  var NAV = [
    {
      section: 'Hash',
      groups: [
        { name: 'CRC', items: [['CRC', 'hash/crc.html']] },
        {
          name: 'MD',
          items: [
            ['MD2', 'hash/md2.html'], ['MD2 File', 'hash/md2-file.html'],
            ['MD4', 'hash/md4.html'], ['MD4 File', 'hash/md4-file.html'],
            ['MD5', 'hash/md5.html'], ['MD5 File', 'hash/md5-file.html']
          ]
        },
        { name: 'SHA1', items: [['SHA1', 'hash/sha1.html'], ['SHA1 File', 'hash/sha1-file.html']] },
        {
          name: 'SHA2',
          items: [
            ['SHA224', 'hash/sha224.html'], ['SHA224 File', 'hash/sha224-file.html'],
            ['SHA256', 'hash/sha256.html'], ['SHA256 File', 'hash/sha256-file.html'],
            ['Double SHA256', 'hash/double-sha256.html']
          ]
        },
        {
          name: 'SHA2-512',
          items: [
            ['SHA384', 'hash/sha384.html'], ['SHA384 File', 'hash/sha384-file.html'],
            ['SHA512', 'hash/sha512.html'], ['SHA512 File', 'hash/sha512-file.html'],
            ['SHA512/224', 'hash/sha512-224.html'], ['SHA512/224 File', 'hash/sha512-224-file.html'],
            ['SHA512/256', 'hash/sha512-256.html'], ['SHA512/256 File', 'hash/sha512-256-file.html']
          ]
        },
        {
          name: 'SHA3',
          items: [
            ['SHA3-224', 'hash/sha3-224.html'], ['SHA3-224 File', 'hash/sha3-224-file.html'],
            ['SHA3-256', 'hash/sha3-256.html'], ['SHA3-256 File', 'hash/sha3-256-file.html'],
            ['SHA3-384', 'hash/sha3-384.html'], ['SHA3-384 File', 'hash/sha3-384-file.html'],
            ['SHA3-512', 'hash/sha3-512.html'], ['SHA3-512 File', 'hash/sha3-512-file.html']
          ]
        },
        {
          name: 'Keccak',
          items: [
            ['Keccak-224', 'hash/keccak-224.html'], ['Keccak-224 File', 'hash/keccak-224-file.html'],
            ['Keccak-256', 'hash/keccak-256.html'], ['Keccak-256 File', 'hash/keccak-256-file.html'],
            ['Keccak-384', 'hash/keccak-384.html'], ['Keccak-384 File', 'hash/keccak-384-file.html'],
            ['Keccak-512', 'hash/keccak-512.html'], ['Keccak-512 File', 'hash/keccak-512-file.html']
          ]
        },
        {
          name: 'SHAKE',
          items: [
            ['SHAKE128', 'hash/shake128.html'], ['SHAKE128 File', 'hash/shake128-file.html'],
            ['SHAKE256', 'hash/shake256.html'], ['SHAKE256 File', 'hash/shake256-file.html']
          ]
        },
        {
          name: 'cSHAKE',
          items: [
            ['cSHAKE128', 'hash/cshake128.html'], ['cSHAKE128 File', 'hash/cshake128-file.html'],
            ['cSHAKE256', 'hash/cshake256.html'], ['cSHAKE256 File', 'hash/cshake256-file.html']
          ]
        },
        {
          name: 'KMAC',
          items: [
            ['KMAC128', 'hash/kmac128.html'], ['KMAC128 File', 'hash/kmac128-file.html'],
            ['KMAC256', 'hash/kmac256.html'], ['KMAC256 File', 'hash/kmac256-file.html']
          ]
        },
        {
          name: 'RIPEMD',
          items: [
            ['RIPEMD-128', 'hash/ripemd-128.html'], ['RIPEMD-128 File', 'hash/ripemd-128-file.html'],
            ['RIPEMD-160', 'hash/ripemd-160.html'], ['RIPEMD-160 File', 'hash/ripemd-160-file.html'],
            ['RIPEMD-256', 'hash/ripemd-256.html'], ['RIPEMD-256 File', 'hash/ripemd-256-file.html'],
            ['RIPEMD-320', 'hash/ripemd-320.html'], ['RIPEMD-320 File', 'hash/ripemd-320-file.html']
          ]
        },
        {
          name: 'BLAKE',
          items: [
            ['BLAKE2b', 'hash/blake2b.html'], ['BLAKE2b File', 'hash/blake2b-file.html'],
            ['BLAKE2s', 'hash/blake2s.html'], ['BLAKE2s File', 'hash/blake2s-file.html']
          ]
        }
      ]
    },
    {
      section: 'Encoding',
      groups: [
        {
          name: 'Base64',
          items: [
            ['Base64 Encode', 'encode/base64-encode.html'],
            ['Base64 Decode', 'encode/base64-decode.html']
          ]
        },
        {
          name: 'Hex (Base16)',
          items: [
            ['Hex Encode', 'encode/hex-encode.html'],
            ['Hex Decode', 'encode/hex-decode.html']
          ]
        },
        {
          name: 'Web',
          items: [
            ['HTML Encode', 'encode/html-encode.html'],
            ['HTML Decode', 'encode/html-decode.html'],
            ['URL Encode', 'encode/url-encode.html'],
            ['URL Decode', 'encode/url-decode.html']
          ]
        }
      ]
    },
    {
      section: 'Formatters',
      groups: [
        {
          name: 'JSON',
          items: [
            ['JSON Formatter', 'format/json-formatter.html'],
            ['JSON Minifier', 'format/json-minifier.html'],
            ['JSON Validator', 'format/json-validator.html']
          ]
        }
      ]
    },
    {
      section: 'Converters',
      groups: [
        {
          name: 'Case',
          items: [['Case Converter', 'convert/case-converter.html']]
        }
      ]
    },
    {
      section: 'Cryptography',
      groups: [
        {
          name: 'AES',
          items: [
            ['AES Encrypt', 'crypto/aes-encrypt.html'],
            ['AES Decrypt', 'crypto/aes-decrypt.html']
          ]
        }
      ]
    }
  ];

  function getBase() {
    if (window.NAV_BASE !== undefined) return window.NAV_BASE;
    var depth = location.pathname.split('/').filter(function (s) { return s.length > 0; }).length;
    return depth >= 2 ? '../' : '';
  }

  function getHomeHref() {
    if (window.NAV_HOME !== undefined) return window.NAV_HOME;
    var depth = location.pathname.split('/').filter(function (s) { return s.length > 0; }).length;
    return depth >= 2 ? '../index.html' : 'index.html';
  }

  function render() {
    var base = getBase();
    var currentPath = location.pathname; // e.g. /hash/sha256.html

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
          // item[1] is like 'hash/sha256.html'
          var isActive = currentPath.endsWith('/' + item[1]);
          if (isActive) groupActive = true;
          var href = base + item[1];
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
    html += '<li><a href="' + getHomeHref() + '">Home</a></li>';
    html += '</ol></nav></div>';

    return html;
  }

  function init() {
    var container = document.querySelector('#sidebar .container');
    if (!container) return;

    var existing = container.querySelectorAll('.section');
    for (var i = existing.length - 1; i >= 0; i--) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    var div = document.createElement('div');
    div.innerHTML = render();
    while (div.firstChild) container.appendChild(div.firstChild);

    /* Prevent Chrome's native <details> expand from scrolling the main page */
    var summaries = container.querySelectorAll('summary');
    for (var j = 0; j < summaries.length; j++) {
      summaries[j].addEventListener('click', function () {
        var y = window.pageYOffset;
        requestAnimationFrame(function () { window.scrollTo(0, y); });
      }, { passive: true });
    }

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
