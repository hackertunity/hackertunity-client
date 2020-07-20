/*
Fixes build error:

> hackertunity-client@1.0.0 build:js {{rootDirectory}}
> parcel build src/assets/js/index.js --out-dir dist/assets/js

🚨  No entries found.
at Bundler.bundle ({{rootDirectory}}/node_modules/parcel-bundler/src/Bundler.js:275:17)
*/

module.exports = {};
