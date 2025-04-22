import React, { useCallback, useEffect, useState } from 'react'
import { useField, useFormikContext, getIn } from 'formik'
import {
  FormControl,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 220
  }
}))

export default function HybridSelectTextField(props) {
  const { field, label, options, inputProps } = props
  const { touched, errors, values } = useFormikContext()
  const meta = useField(field.name)[1]
  const { setValue, setTouched } = useField(field.name)[2]
  const value = getIn(values, field.name)
  const errorText = getIn(touched, field.name) && getIn(errors, field.name)
  const showError = Boolean(errorText) && (!value || value === '')
  const [useTextInput, setUseTextInput] = useState(value === 'other')
  const classes = useStyles()

  const handleSelect = useCallback(
    (ev) => {
      const newVal = ev.target.value
      setTouched(true)
      if (newVal === 'other') {
        setUseTextInput(true)
        setValue('')
      } else {
        setUseTextInput(false)
        setValue(newVal)
      }
    },
    [setUseTextInput, setValue, setTouched]
  )

  useEffect(() => {
    if (!Object.values(options).includes(value)) {
      setUseTextInput(false)
    }
  }, [value, options])

  return (
    <React.Fragment>
      <Box my={1}>
        <FormControl
          className={classes.formControl}
          error={showError}
          variant='outlined'
        >
          <InputLabel>{label}</InputLabel>

          <Select
            {...field}
            {...inputProps}
            label={label}
            onChange={handleSelect}
            value={value || ''}
          >
            {Object.entries(options).map(([optionValue, optionLabel]) => (
              <MenuItem key={optionValue} value={optionValue}>
                {optionLabel}
              </MenuItem>
            ))}

            {!Object.values(options).includes('Other (Please Specify)') && (
              <MenuItem key='other' value='other'>
                Other (Please Specify)
              </MenuItem>
            )}
          </Select>

          {showError ? <FormHelperText>{errorText}</FormHelperText> : null}
        </FormControl>
      </Box>

      {useTextInput ? (
        <Box my={1}>
          <TextField
            fullWidth
            onChange={(ev) => setValue(ev.target.value)}
            value={value || ''}
            variant='outlined'
            {...inputProps}
            error={showError}
            helperText={errorText}
            name={field.name}
          />
        </Box>
      ) : null}
    </React.Fragment>
  )
}
