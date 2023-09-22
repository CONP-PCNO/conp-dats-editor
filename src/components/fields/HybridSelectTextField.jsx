import { React, useCallback, useState } from 'react'

import { Box } from '@material-ui/core'

export default function JsonOtherSelectField(props) {
  const { value, setValue, options } = props

  const [useTextInput, setUseTextInput] = useState(false)
  const useSelect = Object.values(options).includes(value) && !useTextInput
  const defaultSelect = useSelect ? value : 'other'
  const defaultInput = useSelect ? '' : value

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
        <select onChange={handleSelect} value={defaultSelect}>
          {Object.entries(options).map((option) => {
            const [optionValue, optionLabel] = option
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            )
          })}
        </select>
      </Box>

      {!useSelect && (
        <input
          onChange={(ev) => setValue(ev.target.value)}
          value={defaultInput}
        />
      )}
    </React.Fragment>
  )
}
