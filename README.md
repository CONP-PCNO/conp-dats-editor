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

This project was created using [create-react-library](https://github.com/transitive-bullshit/create-react-library) and consists of a React module ('/src') and a sample application that contains the module ('/example).

A more definitive list of frameworks used:

- [React](https://reactjs.org/tutorial/tutorial.html) - React is a JavaScript framework for building user interfaces.
- [Formik](https://formik.org/docs/overview) - A framework for building forms in React.
- [Yup](https://github.com/jquense/yup) - This works with Formik and provides configurable validation of the form fields, ensuring fields are filled out correctly, required fields aren't left empty etc.
- [material-ui](https://material-ui.com/) - Ready-made React components that are developed using material design. Components have a familiar feel that users should feel comfortable with without the need for custom CSS or associated libraries.
- [react-dropzone](https://github.com/react-dropzone/react-dropzone) - This is where the user drops any existing DATS.json file they may have. See the `DatsUploader.jsx` component in `/src/components/DatsUploader`.
- [prettier](https://prettier.io/docs/en/) - Code formatting. Configurable via the `.prettierrc` configuration file. Note that your IDE will ideally have some sort of prettier integration to make this easier (VS Code does), though you can run it from the command line too, or integrate with pre-commit hooks, Travis CI, etc.
- [ESLint](https://eslint.org/docs/user-guide/getting-started) - Linting for JavaScript. As prettier performs code formatting, ESLint performs static analysis for errors, potential bugs etc. This integrates really well with React and can guide you to make sure your components are written correctly. Configurable via `.eslintrc`.

## Releases

The project currently does not have versioned releases. In order to use the conp-dats-editor in your project, add the repository directly to your package.json

```javascript
"dependencies": {
    ...
    "conp-dats-editor": "CONP-PCNO/conp-dats-editor",
    ...
  },
  ...
```

You can alternatively reference specific commits in this fashion, which could serve as a means of updating to the latest version (update the commit hash)

```javascript
"conp-dats-editor": "CONP-PCNO/conp-dats-editor#<commit>"
```

**TODO: Publish conp-dats-editor on npm, using versioned releases. This is the _correct_ way.**

## Unit tests

1. Tests are in the form \*.test.js under the ./src/tests folder. You can run them with

```bash
yarn test:unit
```

## License

MIT © [CONP-PCNO](https://github.com/CONP-PCNO)
