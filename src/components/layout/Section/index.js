import React from 'react'
import { Box } from '@material-ui/core'

const Section = (props) => {
  return (
    <Box display='flex flex-column' p={1} m={1}>
      {props.children}
    </Box>
  )
}

export default Section
