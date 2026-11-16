// Jest stand-in for @uiw/react-md-editor and rehype-sanitize, whose current
// versions are ES modules that react-scripts' Jest can't load. The form tests
// don't exercise the Markdown editor itself.
const React = require('react')

function MDEditor(props) {
  return React.createElement('textarea', {
    'data-testid': 'readme-editor',
    value: props.value,
    onChange: (e) => props.onChange && props.onChange(e.target.value)
  })
}

module.exports = MDEditor
module.exports.default = MDEditor
