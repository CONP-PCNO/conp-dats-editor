import React from 'react'
import { IconButton, Box, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const FieldGroup = (props) => {
  return (
    <Box
      key={props.key}
      display={props.column ? 'flex flex-column' : 'flex'}
      flexWrap='wrap'
      alignItems={props.column ? 'stretch' : 'center'}
      width='100%'
      my={2}
    >
      {props.indexed ? (
        <Typography variant='subtitle1'>{props.index + 1 + '. '}</Typography>
      ) : null}
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return (
            <Box
              key={props.key + '_' + index}
              display='flex'
              justifyContent='space-between'
              m={1}
            >
              {child}
            </Box>
          )
        })
      ) : (
        <Box p={1}>{props.children}</Box>
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
