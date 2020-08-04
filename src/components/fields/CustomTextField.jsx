import React from 'react'
import { FastField } from 'formik'
import { TextField } from 'formik-material-ui'

const CustomTextField = ({ ...props }) => {
  return <FastField component={TextField} {...props} variant='outlined' />
}

export default CustomTextField
