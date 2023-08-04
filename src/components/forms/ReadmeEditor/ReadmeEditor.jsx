import { Button } from '@material-ui/core'
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

function getValueOrOther(value) {
  return value.value === 'other' ? value.valueOther : value.value
}

export function genDefaultReadme(values) {
  const publications = values.primaryPublications
    .map((publication) => publication.title)
    .join(', ')
  const identifier = values.identifier.identifier || ''
  const functionsAssessed = values.experimentsFunctionAssessed
    .map(getValueOrOther)
    .join(', ')
  const languages = values.experimentsLanguages.join(', ')
  const validationMeasures = values.experimentsValidationMeasures
    .map(getValueOrOther)
    .join(', ')
  const validationPopulations = values.experimentsValidationPopulations
    .map(getValueOrOther)
    .join(', ')
  const licenses = values.licenses.map(getValueOrOther).join(', ')
  const accessibility = values.experimentsAccessibility
    .map(getValueOrOther)
    .join(', ')
  const modalities = values.experimentsModalities
    .map(getValueOrOther)
    .join(', ')
  const devices = values.experimentsRequiredDevices
    .map(getValueOrOther)
    .join(', ')
  const software = values.experimentsRequiredSoftware
    .map(
      (value) => `${getValueOrOther(value.software)} version ${value.version}`
    )
    .join(', ')
  return `# ${values.title}

${values.description}

**Publication:** ${publications}

**Experiment DOI:** ${identifier}

**Functions assessed:** ${functionsAssessed}

## Features

**Languages:** ${languages}

**Validation:**
  * Measures: ${validationMeasures}
  * Populations: ${validationPopulations}

**Accessibility:** ${accessibility}

**Modalities:** ${modalities}

**Devices:** ${devices}

**Species:** ${values.isAbout.map((isAbout) => isAbout.name).join(', ')}

## Development

**Software:** ${software}

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
