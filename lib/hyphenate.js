const Hypher = require('hypher');
const german = require('hyphenation.de');
const h = new Hypher(german);

module.exports = function hyphenate(text) {
  return h.hyphenateText(text);
}
