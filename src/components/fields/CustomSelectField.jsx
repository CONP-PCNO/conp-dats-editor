import React from 'react'
import { FastField } from 'formik'
import { Select } from 'formik-material-ui'
import { FormControl, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160
  }
}))

const CustomSelectField = ({ ...props }) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl} variant='outlined'>
      <InputLabel>{props.label}</InputLabel>
      <FastField component={Select} {...props}>
        {props.children}
      </FastField>
    </FormControl>
  )
}

export default CustomSelectField
