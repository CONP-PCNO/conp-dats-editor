import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitze'

export default function ReadmeEditor(props) {
  const { values } = props
  const [readme, setReadme] = React.useState(values.readmeTemplate)
  return (
    <React.Fragment>
      <MDEditor
        value={readme}
        onChange={setReadme}
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
      />
    </React.Fragment>
  )
}
