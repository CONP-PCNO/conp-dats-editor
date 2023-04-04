import React from 'react'
import { Button, Typography } from '@material-ui/core'

const downloadDats = (dats) => {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(dats, null, 2))
  )
  element.setAttribute('download', `DATS.json`)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

function CreateDatsSuccess(props) {
  const { dats, classes } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        DATS.json created successfully
      </Typography>
      <Typography variant='body1' gutterBottom>
        The DATS.json file has been created and should be accessible below or in
        your downloaded files. If the file was not automatically downloaded,
        click on the 'DOWNLOAD' button below to download it.
      </Typography>
      <Typography variant='body1' gutterBottom>
        To edit the current DATS file, click on the 'EDIT' button.
      </Typography>
      <Typography variant='body1' gutterBottom>
        To start the creation of a new DATS.json file, click on 'CREATE A NEW
        DATS'.
      </Typography>
      <div className={classes.wrapper}>
        <Button
          onClick={downloadDats(dats)}
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Download
        </Button>
      </div>
    </React.Fragment>
  )
}

export default CreateDatsSuccess
