const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const hyphenate = require('./lib/hyphenate');
const fixTypesetting = require('./lib/typeset');

module.exports = function prepare(data) {
  data = Object.assign(
    {
      meta: {},
      header: 'oh my',
      sender: 'me',
      address: 'you',
      subject: 'oh me oh my',
      body: 'ain\'t that perfection',
      salutation: ['sincererly', 'yours truly']
    },
    data
  )

  data.meta = data.meta || {};

  if (!(data.meta.hyphenate === false)) {
    data.body = hyphenate(data.body);
    global.logVerbose && console.log('added hyphenation to body: ', data.body);
  }

  if (!(data.meta.fixTypesetting === false)) {
    data.body = fixTypesetting(data.body);
    global.logVerbose && console.log('added typsetting fixes to body: ', data.body);
  }

  const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

  const html = ejs.render(template, data);

  return html;
};
