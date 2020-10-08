import React from 'react'
import { Box, Typography } from '@material-ui/core'

const SectionTitle = (props) => {
  return (
    <Box display='flex flex-column'>
      <Typography variant={props.subsection ? 'subtitle1' : 'h6'} gutterBottom>
        {props.name}
      </Typography>
      <Typography variant='caption'>{props.tooltip}</Typography>
    </Box>
  )
}

export default SectionTitle
