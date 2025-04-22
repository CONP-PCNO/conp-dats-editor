import React from 'react'
import { IconButton, Box, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

function FieldGroup(props) {
  return (
    <Box display='flex' width='100%'>
      {props.indexed ? (
        <Typography variant='subtitle1'>{`${props.index + 1}. `}</Typography>
      ) : null}

      <Box
        alignItems={props.column ? 'stretch' : 'center'}
        display={props.column ? 'flex flex-column' : 'flex'}
        flexWrap='wrap'
        my={2}
        width='100%'
      >
        {Array.isArray(props.children) ? (
          props.children.map((child, index) => {
            return (
              <Box
                display='flex'
                justifyContent='space-between'
                key={`${props.name}_${index}`}
                m={1}
                width='100%'
              >
                {child}
              </Box>
            )
          })
        ) : (
          <Box p={1} width='100%'>
            {props.children}
          </Box>
        )}
      </Box>

      <Box>
        <IconButton
          color='default'
          onClick={() => props.arrayHelpers.remove(props.index)}
        >
          <CancelIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default FieldGroup
