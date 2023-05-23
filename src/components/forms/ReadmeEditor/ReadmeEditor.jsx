import { Button } from '@material-ui/core'
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

export function genDefaultReadme(values) {
  const publications = values.primaryPublications.join(', ')
  const identifier = values.identifier.source || ''
  const languages = values.experimentsLanguages.join(', ')
  const licenses = values.licenses
    .map((license) =>
      license.value === 'other' ? license.valueOther : license.value
    )
    .join(', ')
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

**Species:** ${values.isAbout.map((isAbout) => isAbout.name).join(', ')}

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

**License:** ${licenses}

## Additional Reading
`
}

/* eslint react/forbid-component-props: "off" */

export function ReadmeEditor(props) {
  const { readmeStart, wrapperClass, buttonClass } = props
  const [readme, setReadme] = React.useState(readmeStart)

  function downloadReadme() {
    const element = document.createElement('a')
    const file = new Blob([readme], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'README.md'

    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const onClick = React.useCallback(downloadReadme, [readme])

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
          onClick={onClick}
          variant='contained'
        >
          Download
        </Button>
      </div>
    </React.Fragment>
  )
}
