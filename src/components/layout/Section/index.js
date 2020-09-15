import React from 'react'
import { Box } from '@material-ui/core'

const Section = (props) => {
  return (
    <Box display='flex flex-column' p={1} my={2}>
      {props.children}
    </Box>
  )
}

export default Section
