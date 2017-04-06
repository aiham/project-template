const projectTemplate = require('../src');
const path = require('path');
const assert = require('assert');
const fs = require('fs');

const promisify = require('../src/promisify');
const readFile = promisify(fs.readFile);
const readTextFile = filePath => readFile(filePath, { encoding: 'utf8' });

const templatePath = path.join(__dirname, 'templates');
const buildPath = path.join(__dirname, 'build');

projectTemplate({
  fileExtension: 'ect',
  templatePath,
  buildPath,
  params: {
    'README.md': {
      project: 'Awesome Project',
    },
    'foo/config.json': {
      version: 5,
    },
    'foo/bar/baz/index.js': {
      name: 'World',
    },
  },
})
.then(files => {
  const config = require(path.join(buildPath, 'foo/config.json'));
  assert.ok(config);
  assert.strictEqual(typeof config, 'object');
  assert.strictEqual(config.version, 'v5');

  const baz = require(path.join(buildPath, 'foo/bar/baz/index.js'));
  assert.strictEqual(typeof baz, 'function');
  assert.strictEqual(baz(), 'Hello World!');

  const assertFirstLine = (data, firstLine) => {
    assert.strictEqual(typeof data, 'string');
    assert.strictEqual(data.split(/[\n\r]+/)[0], firstLine);
  };

  return readTextFile(path.join(buildPath, 'README.md'))
    .then(data => assertFirstLine(data, '# Awesome Project'))
    .then(() => Promise.all([
      readTextFile(path.join(buildPath, 'LICENSE')),
      readTextFile(path.join(templatePath, 'LICENSE')),
    ])
    .then(([data1, data2]) => {
      assertFirstLine(data1, 'MIT License');
      assert.strictEqual(data1, data2);
    }))
    .then(() => files);
})
.then(files => {
  console.log('Project generated with the following files:');
  files.forEach(file => console.log(path.join(buildPath, file)));
})
.catch(err => {
  console.error('Failed to generate project', err);
});
