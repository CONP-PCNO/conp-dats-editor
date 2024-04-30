import React, { useCallback, useEffect, useState } from 'react'

import {
  FormControl,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 220
  }
}))

export default function HybridSelectTextField(props) {
  const { field, label, options, inputProps  } = props

  const { value } = field
  const validOption = value === '' || Object.values(options).includes(value)
  const [useTextInput, setUseTextInput] = useState(!validOption)
  const defaultSelect = useTextInput ? 'other' : value
  const defaultInput = useTextInput ? value : ''
  const classes = useStyles()

  function setValue(newVal) {
    field.onChange({ target: { name: field.name, value: newVal } })
  }

  const handleSelect = useCallback(
    (ev) => {
      const newVal = ev.target.value
      if (newVal === 'other') {
        setUseTextInput(true)
        setValue('')
      } else {
        setUseTextInput(false)
        setValue(newVal)
      }
    },
    [setUseTextInput, setValue]
  )

  useEffect(() => {
    if (!validOption) {
      setUseTextInput(true)
    }
  })

  return (
    <React.Fragment>
      <Box my={1}>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel>{label}</InputLabel>

          <Select {...inputProps} label={label} onChange={handleSelect} value={defaultSelect}>
            {Object.entries(options).map((option) => {
              const [optionValue, optionLabel] = option
              return (
                <MenuItem key={optionValue} value={optionValue}>
                  {optionLabel}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>

      {Boolean(useTextInput) && (
        <Box my={1}>
          <TextField
            fullWidth
            onChange={(ev) => setValue(ev.target.value)}
            value={defaultInput}
            variant='outlined'
            {...inputProps}
          />
        </Box>
      )}
    </React.Fragment>
  )
}
