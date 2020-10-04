// copied and tweaked (for German) from https://www.npmjs.com/package/typeset

function fixQuoutes(text) {
  text = text
    .replace(/(\W|^)"([^\s\!\?:;\.,‽»])/g, "$1\u201e$2") // beginning "
    .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, "$1\u201c$2") // ending "
    .replace(/([^0-9])"/g, "$1\u201c") // remaining " at end of word
    .replace(/(\W|^)'(\S)/g, "$1\u201a$2") // beginning '
    .replace(/([a-z])'([a-z])/gi, "$1\u2019$2") // conjunction's possession
    .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi, "$1\u2018$3") // ending '
    .replace(
      /(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi,
      "\u2019$2$3"
    ) // abbrev. years like '93
    .replace(
      /(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi,
      "$1\u2019"
    ) // backwards apostrophe
    .replace(/'''/g, "\u2034") // triple prime
    .replace(/("|'')/g, "\u2033") // double prime
    .replace(/'/g, "\u2032");

    // Allow escaped quotes
    text = text.replace(/\\“/, '"');
    text = text.replace(/\\”/, '"');
    text = text.replace(/\\’/, "'");
    text = text.replace(/\\‘/, "'");

    return text;
}

function fixPunctuation(text) {
    // Dashes
    text = text.replace(/--/g, "–");
    text = text.replace(/ – /g, "&thinsp;&mdash;&thinsp;");
    text = text.replace(/ - /g, " &ndash; ");

    // Ellipses
    text = text.replace(/\.\.\./g, "…");

    // Nbsp for punc with spaces
    const NBSP = "&nbsp;";
    const NBSP_PUNCTUATION_START = /([«¿¡]) /g;
    const NBSP_PUNCTUATION_END = / ([\!\?:;\.,‽»])/g;

    text = text.replace(NBSP_PUNCTUATION_START, "$1" + NBSP);
    text = text.replace(NBSP_PUNCTUATION_END, NBSP + "$1");

    return text;
}

module.exports = function fixTypesetting(text) {
  return fixPunctuation(fixQuoutes(text));
}
