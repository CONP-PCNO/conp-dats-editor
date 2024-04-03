import {Button, Box, Typography} from '@material-ui/core'
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

export function genDefaultReadme(values) {
  const publications = values.primaryPublications
    .map((publication) => publication.title)
    .join(', ')
  const identifier = values.identifier.identifier || ''
  const functionsAssessed = values.experimentsFunctionAssessed.join(', ')
  const languages = values.experimentsLanguages.join(', ')
  const validationMeasures = values.experimentsValidationMeasures.join(', ')
  const validationPopulations =
    values.experimentsValidationPopulations.join(', ')
  const licenses = values.licenses.join(', ')
  const accessibility = values.experimentsAccessibility.join(', ')
  const modalities = values.experimentsModalities.join(', ')
  const devices = values.experimentsRequiredDevices.join(', ')
  const software = values.experimentsRequiredSoftware
    .map((value) => `${value.software} version ${value.version}`)
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
      <div style={{ height: '400px' }}>
        <MDEditor
          height="400px"
          onChange={setReadme}
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          value={readme}
        />
      </div>

      <Box paddingTop={3}>
        <Typography gutterBottom variant='body1'>
          Click the "Download" button below to download your "README" file. This is 
          the second of the two files you will need to provide for the creation of your 
          dataset page in the CONP Portal.
        </Typography>
      </Box>

      <Box> 
        <Typography gutterBottom variant='body1'>
          To edit the current DATS file, click on the 'EDIT' button.
        </Typography>
      </Box>

      <Box paddingBottom={1}> 
        <Typography gutterBottom variant='body1'>
          To start the creation of a new DATS.json file, click on 'CREATE A NEW
          DATS'.
        </Typography>
      </Box>

      <div className={wrapperClass}>
        {/* <Box paddingBottom={10}> */}
          <Button
            className={buttonClass}
            color='primary'
            onClick={onClick}
            variant='contained'
          >
            Downloads
          </Button>
        {/* </Box> */}
      </div>
    </React.Fragment>
  )
}
