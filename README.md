# conp-dats-editor

> Graphical user interface for creating dats.json files

[![NPM](https://img.shields.io/npm/v/conp-dats-editor.svg)](https://www.npmjs.com/package/conp-dats-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save conp-dats-editor
```

## Usage

```jsx
import React, { Component } from 'react'

import DatsEditorForm from 'conp-dats-editor'

class Example extends Component {
  render() {
    return <DatsEditorForm />
  }
}
```

## Development

1. Start the component
```bash
yarn install # first time only
yarn start
```

2. Run the sample application (in another terminal)
```bash
cd example/
yarn install # first time only
yarn start
```

3. The application should now be running at localhost:3000

## Unit tests

1. Tests are in the form *.test.js under the ./src/tests folder. You can run them with
```bash
yarn test:unit
```

## License

MIT © [CONP-PCNO](https://github.com/CONP-PCNO)
