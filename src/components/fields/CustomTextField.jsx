import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'

const CustomTextField = ({ ...props }) => {
  return <Field component={TextField} {...props} variant='outlined' />
}

export default CustomTextField
