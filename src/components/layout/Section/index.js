import React from 'react'
import { Box } from '@material-ui/core'

const Section = (props) => {
  return (
    <Box
      display='flex flex-column'
      width='100%'
      p={1}
      my={2}
      boxShadow={props.subsection ? 2 : 0}
    >
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return (
            <Box key={'child_' + index} m={1}>
              {child}
            </Box>
          )
        })
      ) : (
        <Box m={1}>{props.children}</Box>
      )}
    </Box>
  )
}

export default Section
