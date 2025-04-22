import React from 'react'
import { FastField } from 'formik'
import { RadioGroup } from 'formik-material-ui'
import { FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160
  }
}))

function CustomRadioGroup({ ...props }) {
  const classes = useStyles()
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{props.label}</FormLabel>

      <FastField component={RadioGroup} {...props}>
        {props.children}
      </FastField>
    </FormControl>
  )
}

export default CustomRadioGroup
