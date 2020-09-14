import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const FieldGroup = (props) => {
  return (
    <Box
      key={props.key}
      display='flex'
      justifyContent='space-between'
      flexWrap='wrap'
      py={1}
    >
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return <Box key={props.key + '_' + index}>{child}</Box>
        })
      ) : (
        <Box>{props.children}</Box>
      )}
      <Box>
        {props.index !== 0 && (
          <IconButton
            color='default'
            onClick={() => props.arrayHelpers.remove(props.index)}
          >
            <CancelIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default FieldGroup
