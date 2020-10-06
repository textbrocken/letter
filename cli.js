const figlet = require('figlet');
const meow = require('meow');
const getStdin = require('get-stdin');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const open = require('open');

(async function main() {
  const cli = meow(`
    Usage
      $ npx @textbrocken/letter -i <input file name> -o <output file name>

    Options
      -i, --input,      Input YAML file (alternatively: pass YAML via stdin)
      -o, --output      Output PDF file (defaults to input yaml file name with .pdf extension)
      -v, --verbose     Log verbosely (default false)
      -q, --quiet       Log nothing (default false)
      -a, --auto-open   Open PDF file in PDF viewer (default true)

    Examples
      $ npx @textbrocken/letter -i my-letter.yml -o my-letter.pdf
  `, {
    flags: {
      input: {
          type: 'string',
          alias: 'i'
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      verbose: {
        alias: 'v',
        type: 'boolean',
        default: false
      },
      quiet: {
        alias: 'q',
        type: 'boolean',
        default: false
      },
      'auto-open': {
        alias: 'a',
        type: 'boolean',
        default: true
      },
      help: {
        alias: 'h',
        type: 'boolean'
      }
  }
  });

  global.logVerbose = cli.flags.verbose;
  global.logNothing = cli.flags.quiet;

  global.logNothing || console.log(figlet.textSync('@textbrocken/letter', { font: 'cybermedium' }));

  const stdin = await getStdin();

  global.logVerbose && console.log('called with flags:', cli.flags);
  global.logVerbose && console.log('stdin:', stdin);

  const inputYaml = yaml.safeLoad(
    stdin ||
    (cli.flags.input && fs.readFileSync(cli.flags.input, 'utf8')) ||
    (console.log('!!! no input YAML found, call with --help to learn more'), '')
  );

  global.logVerbose && console.log('got JSON from YAML', inputYaml);

  const outFile = path.resolve(
    cli.flags.output ||
    (cli.flags.input
      ? path.parse(cli.flags.input).name + '.pdf'
      : `letter-${Date.now().toString()}.pdf`)
  );

  global.logVerbose && console.log('will use outFile ' + outFile);

  const preparedHtml = require('./prepare')(inputYaml);
  await require('./render')(preparedHtml, outFile);
  cli.flags.autoOpen && await open(outFile, {wait: false});
  global.logNothing || console.log(figlet.textSync('done', { font: 'cybermedium' }));
})();
