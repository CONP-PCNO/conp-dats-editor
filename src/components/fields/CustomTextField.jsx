import React from 'react'
import { FastField } from 'formik'
import { TextField } from 'formik-material-ui'

function CustomTextField({ disabled, ...props }) {
  return (
    <FastField
      component={TextField}
      id={props.id || props.name}
      {...props}
      variant='outlined'
      fullWidth
      disabled={disabled}
      inputProps={{
        'data-testid': `${props.name}`
      }}
    />
  )
}

export default CustomTextField
