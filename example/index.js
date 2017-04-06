const projectTemplate = require('../src');
const path = require('path');

const buildPath = path.join(__dirname, 'build');

projectTemplate({
  fileExtension: 'ect',
  templatePath: path.join(__dirname, 'templates'),
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
  console.log('Project generated with the following files:');
  files.forEach(file => console.log(path.join(buildPath, file)));
})
.catch(err => {
  console.error('Failed to generate project', err);
});
