import React from 'react'
import { FastField, useFormikContext, getIn } from 'formik'
import { Select } from 'formik-material-ui'
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 220,
    maxWidth: '100%',
  }
}))

const CustomSelectField = ({ form, field, disabled, ...props }) => {
  const classes = useStyles()
  const { touched, errors, values } = useFormikContext(); // Accéder directement à touched et errors
  const value = getIn(values, props.name);
  // Utiliser getIn pour accéder aux messages d'erreur et au statut touched pour ce champ spécifique
  const errorText = getIn(touched, props.name) && getIn(errors, props.name);
  const isError = !!errorText && (!value || value === "");

  return (
    <FormControl 
        className={classes.formControl} 
        variant='outlined'
        error={isError}
        disabled={disabled}>
      <InputLabel>{props.label}</InputLabel>
      <FastField
        component={Select}
        {...props}
        inputProps={{
          'data-testid': `${props.name}`
        }}
      >
        {props.children}
      </FastField>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelectField
