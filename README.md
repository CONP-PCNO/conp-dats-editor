# dats-creator-gui

> Graphical user interface for creating dats.json files

[![NPM](https://img.shields.io/npm/v/dats-creator-gui.svg)](https://www.npmjs.com/package/dats-creator-gui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save dats-creator-gui
```

## Usage

```jsx
import React, { Component } from 'react'

import DatsCreatorGui from 'dats-creator-gui'

class Example extends Component {
  render() {
    return <DatsCreatorGui />
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
