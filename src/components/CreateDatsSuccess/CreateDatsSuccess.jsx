import React from 'react'
import { Button, Typography, Box } from '@material-ui/core'

function CreateDatsSuccess(props) {
  const { dats, classes } = props

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

      <Typography gutterBottom variant='body1'>
        The DATS.json file has been created and should be accessible below or in
        your downloaded files. If the file was not automatically downloaded,
        click on the 'DOWNLOAD' button below to download it.
      </Typography>

      <Typography gutterBottom variant='body1'>
        To edit the current DATS file, click on the 'EDIT' button.
      </Typography>

      <Box paddingBottom={2}> 
        <Typography gutterBottom variant='body1'>
          To start the creation of a new DATS.json file, click on 'CREATE A NEW
          DATS'.
        </Typography>
      </Box>

      <div className={classes.wrapper}>
        <Box paddingBottom={10}> 
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
    </React.Fragment>
  )
}

export default CreateDatsSuccess
