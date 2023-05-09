import { Button } from '@material-ui/core'
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

export function genDefaultReadme(values) {
  const publications = values.primaryPublications.join(', ')
  const identifier = values.identifier.source
  const languages = values.experimentsLanguages.join(', ')
  return `# ${values.title}

${values.description}

**Publication:** ${publications}

**Experiment DOI:** ${identifier}

**Functions assessed:** ${values.experimentsFunctionAssessed}

## Features

**Languages:** ${languages}

**Validation:** ${values.experimentsValidation.join(', ')}

**Accessibility:** ${values.experimentsAccessibility.join(', ')}

**Platforms:** ${values.experimentsRequiredPlatforms.join(', ')}

**Devices:** ${values.experimentsRequiredDevices.join(', ')}

**Species:** ${values.isAbout.join(', ')}

## Development

**Software:** ${values.experimentsRequiredSoftware.join(', ')}

**Requirements:** ${values.experimentsAdditionalRequirements}

## Administration

## Procedure and Conditions

## Output Files

## Scoring

## Additional Features

## Planned Features

## How to Contribute

## Contributors

## License and Attribution

**License:** ${values.licenses.join(', ')}

## Additional Reading
`
}

function downloadReadme(readme) {
  const element = document.createElement('a')
  const file = new Blob([readme], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = 'README.md'

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

/* eslint react/forbid-component-props: "off" */

export function ReadmeEditor(props) {
  const { readmeStart, wrapperClass, buttonClass } = props
  const [readme, setReadme] = React.useState(readmeStart)
  return (
    <React.Fragment>
      <MDEditor
        onChange={setReadme}
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
        value={readme}
      />

      <div className={wrapperClass}>
        <Button
          className={buttonClass}
          color='primary'
          onClick={downloadReadme(readme)}
          variant='contained'
        >
          Download
        </Button>
      </div>
    </React.Fragment>
  )
}
