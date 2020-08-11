import React from 'react'
import { Button, Typography } from '@material-ui/core'

const downloadDats = (dats) => {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(dats, null, 2))
  )
  element.setAttribute('download', 'dats.json')

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
      <Typography variant='subtitle1'>
        Your DATS.json file has been created an is accessible below
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
