import React from 'react'
import { FastField } from 'formik'
import { TextField } from 'formik-material-ui'

function CustomTextField({ disabled, ...props }) {
  return (
    <FastField
      component={TextField}
      {...props}
      disabled={disabled}
      fullWidth
      inputProps={{
        'data-testid': `${props.name}`
      }}
      variant='outlined'
    />
  )
}

export default CustomTextField
