import React from 'react'
import { Box } from '@material-ui/core'

function Section(props) {
  return (
    <Box
      boxShadow={props.subsection ? 2 : 0}
      display='flex flex-column'
      my={2}
      p={1}
      width='100%'
    >
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return (
            <Box key={`child_${index}`} m={1}>
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
