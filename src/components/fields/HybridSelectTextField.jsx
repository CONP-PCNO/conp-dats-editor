import React, { useCallback, useState } from 'react'

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
  console.log(props)
  const { field, label, options } = props

  const [useTextInput, setUseTextInput] = useState(false)
  const { value } = field
  const useSelect = Object.values(options).includes(value) && !useTextInput
  const defaultSelect = useSelect ? value : 'other'
  const defaultInput = useSelect ? '' : value
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

  return (
    <React.Fragment>
      <Box my={1}>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel>{label}</InputLabel>

          <Select onChange={handleSelect} value={defaultSelect}>
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

      {!useSelect && (
        <Box my={1}>
          <TextField
            fullWidth
            onChange={(ev) => setValue(ev.target.value)}
            value={defaultInput}
            variant='outlined'
          />
        </Box>
      )}
    </React.Fragment>
  )
}
