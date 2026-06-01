# YoSin Tools - Technical Overview

YoSin Tools is a suite of 100% client-side browser-based developer utilities focused on cryptography, hashing, and encoding.

## Core Philosophy
- **Privacy First**: No data is uploaded to servers. All computations (hashing, file reading) happen locally in the user's browser.
- **Transparency**: Tools use standard libraries and clear logic for cryptographic verification.

## Tech Stack
- **Frontend**: HTML5, CSS3 (with Dark Mode support).
- **Libraries**:
  - **jQuery (v1.10.1)**: Used for DOM manipulation and event orchestration.
  - **Clipboard.js**: Handles "Copy to Clipboard" functionality.
  - **TextEncoding Polyfill**: Provides `TextEncoder` and `TextDecoder` for legacy character set support (UTF-16, ISO-8859, etc.).
  - **CryptoApi**: A custom or wrapped interface for various hash algorithms (RIPEMD, MD, etc.).

## Key Components

### 1. Navigation & Discovery
- `/js/nav.js`: The single source of truth for the sidebar. Dynamically builds the tool hierarchy and handles sidebar search.
- `/index.html`: Contains the "Popular Tools" grid and a homepage-specific search engine.

### 2. File Processing (`/js/file.js`)
- Handles `FileReader` logic.
- Implements chunked reading (`FILE_BATCH_SIZE`) to handle large files without freezing the browser UI.
- Supports drag-and-drop via the `droppableFile` jQuery plugin (`/js/droppable-file.js`).

### 3. Encoding Architecture (`/js/site-init.js`)
- Bootstraps the environment.
- Automatically populates encoding `<select>` elements with a comprehensive list of binary (Hex, Base64) and text (UTF, Legacy) encodings.

### 4. Cryptographic Integration (`/js/crypto-api.js`)
- Acts as a glue layer between the UI logic and the underlying hashing implementations.
- Supports standard `update()` and `finalize()` patterns for both plain text and Hashing/HMAC.

## Maintenance Notes
- To add a new tool:
  1. Create the specific HTML file in `/hash/`.
  2. Update the `NAV` array in `js/nav.js`.
  3. Update the `ALL_TOOLS` array in `index.html` to reflect it on the homepage.
  4. Ensure any new crypto algorithms are registered in `js/crypto-api.js`.

## Upcoming Tools (Roadmap)

### 1. Cryptography
- **AES / DES / Triple DES / RC4**: Encryption and Decryption utilities.
- **ECDSA**: Key Generator, Message Signing, and Signature Verification.
- **RSA**: Key Generator, Signing/Verification, and Encryption/Decryption.

### 2. Encoding
- **Hex (Base16)**: Encode/Decode, File to Hex, Hex to File.
- **Base32 / Base58 / Base64**: String and File-based encoding/decoding.
- **Web**: HTML Encode/Decode, URL Encode/Decode.

### 3. Formatters & Validators
- **JSON / XML**:
  - Validator
  - Minifier
  - Formatter / Beautifier

### 4. String Conversion (Case)
- lower case / UPPER CASE
- lowerCamelCase / UpperCamelCase
- snake_case / kebab-case
- CONSTANT_CASE

### 5. Others
- QR Code Generator
- Syntax Highlighter