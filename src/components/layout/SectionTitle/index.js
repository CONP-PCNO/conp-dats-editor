import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: theme.palette.action.disabled
  }
}))

function SectionTitle(props) {
  const classes = useStyles()
  return (
    <Box display='flex flex-column'>
      <Typography
        className={props.isDisabled ? classes.disabled : ''}
        gutterBottom
        variant={props.subsection ? 'subtitle1' : 'h6'}
      >
        {props.name}
      </Typography>

      <Typography
        className={props.isDisabled ? classes.disabled : ''}
        variant='caption'
      >
        <div dangerouslySetInnerHTML={{ __html: props.tooltip }} />
      </Typography>
    </Box>
  )
}

export default SectionTitle
