const fs = require('fs');
const path = require('path');
const {onExit} = require('@rauschma/stringio');
const {spawn} = require('child_process');

module.exports = async function render(preparedHtml, outFile) {

  fs.writeFileSync(path.join(__dirname, 'preparedHtml.html'), preparedHtml, 'utf-8');

  const pagedjsCli = spawn('npm', [
    'run', 'pagedjs-cli', '--',
    path.join(__dirname, 'preparedHtml.html'),
    '-o', outFile],
    {
      cwd: __dirname,
      stdio: global.logVerbose ? [process.stdin, process.stdout, process.stderr] : []
    }
  );
  await onExit(pagedjsCli);
  global.logNothing || console.log('written PDF to ' + outFile);
};
