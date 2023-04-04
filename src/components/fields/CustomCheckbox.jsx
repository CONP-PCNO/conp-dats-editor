import React from 'react'
import { FastField } from 'formik'
import { FormControl, FormLabel, FormGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160
  }
}))

const CustomCheckbox = ({ ...props }) => {
  const classes = useStyles()
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{props.label}</FormLabel>
      <FastField component={FormGroup} {...props}>
        {props.children}
      </FastField>
    </FormControl>
  )
}

export default CustomCheckbox
