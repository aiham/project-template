# project-template

[![npm version](https://badge.fury.io/js/project-template.svg)](https://badge.fury.io/js/project-template)

Generate a project based on a directory of template files and corresponding template values.

## Requirements

- Node JS v6+

## Install

```sh
yarn add project-template
```

## Example

```sh
yarn run example
```

See [example/index.js](example/index.js)

## Usage

```js
const projectTemplate = require('project-template');

projectTemplate({
  templatePath: '/path/to/templates',
  buildPath: '/path/to/build',
  params: {
    'path/to/file.txt': {
      firstParam: 'First param value',
      secondParam: 'Second param value',
    },
    'path/to/different/file.txt': {
      anotherParam: 'Another param value',
    },
  },
})
.then(files => console.log('Done', files))
.catch(err => console.error('Error', err));
```

## Things to keep in mind

- Template files are expected to use [ect](https://github.com/baryshev/ect) syntax
- Directory structure of files in `templatePath` is maintained in `buildPath`
- All files in `templatePath` with `fileExtension` must be included in `params`
- Files in `templatePath` without `fileExtension` are just copied over to `buildPath`

## API

### projectTemplate(options) -&gt; Promise&lt;Array&lt;String&gt;&gt;

#### options

| Key | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| templatePath | String | Yes | | Directory path containing template files |
| buildPath | String | Yes | | Directory path to write generated files to |
| params | Object | No | `{}` | Keys are relative paths of template files (with `fileExtension` stripped). Values are objects of template variables |
| fileExtension | String | No | `ect` | File extension of template files |

#### Result

The promise is resolved with an array of file paths of generated files, relative to the `buildPath` directory.
