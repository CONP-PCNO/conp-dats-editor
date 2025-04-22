import React, { useEffect } from 'react'
import { Button, Typography, Box } from '@material-ui/core'

function CreateDatsSuccess(props) {
  const { dats, classes } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const downloadDats = () => {
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(dats, null, 2)], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = 'DATS.json'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <React.Fragment>
      <Typography gutterBottom variant='h5'>
        DATS.json created successfully
      </Typography>

      <Box paddingBottom={1}>
        <Typography gutterBottom variant='body1'>
          Click the "Download" button below to download your "DATS.json" file.
          This is the first of the two files you will need to provide for the
          creation of your dataset page in the CONP Portal.
        </Typography>
      </Box>

      <div className={classes.wrapper}>
        <Box paddingBottom={5}>
          <Button
            className={classes.button}
            color='primary'
            onClick={downloadDats}
            variant='contained'
          >
            Download
          </Button>
        </Box>
      </div>

      <Box paddingBottom={2}>
        <Typography gutterBottom variant='body1'>
          Once you've downloaded the "DATS.json" file, click the "Next" button
          below to continue to the Markdown text editor that will allow you to
          create a "README.md" file for your dataset.
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default CreateDatsSuccess
