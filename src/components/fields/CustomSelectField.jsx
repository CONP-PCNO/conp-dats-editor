import React from 'react'
import { useField } from 'formik'
import { Select, FormControl, InputLabel } from '@material-ui/core'

const CustomSelectField = ({ ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <FormControl variant='outlined'>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} {...field} helperText={errorText} error={!!errorText}>
        {props.children}
      </Select>
    </FormControl>
  )
}

export default CustomSelectField
