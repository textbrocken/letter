module.exports = function yamlToPdf(yaml) {
  // TODO
  const preparedHtml = require('./prepare')(inputYaml);
  await require('./render')(preparedHtml, outFile);
  // TODO make this return PDF buffer
};
