import React from 'react'
import { Field } from 'formik'
import { Select } from 'formik-material-ui'
import { FormControl, InputLabel } from '@material-ui/core'

const CustomSelectField = ({ ...props }) => {
  return (
    <FormControl variant='outlined'>
      <InputLabel>{props.label}</InputLabel>
      <Field component={Select} {...props}>
        {props.children}
      </Field>
    </FormControl>
  )
}

export default CustomSelectField
