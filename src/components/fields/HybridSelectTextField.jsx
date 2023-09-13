import { React, useState } from 'react'

import { Box } from '@material-ui/core'

export default function JsonOtherSelectField(props) {
  const { value, setValue, options } = props
  const defaultSelect = Object.values(options).includes(value) ? value : 'other'
  const [selectedValue, setSelectedValue] = useState(defaultSelect)
  const defaultInput = Object.values(options).includes(value) ? '' : value
  const [inputValue, setInputValue] = useState(defaultInput)

  function handleSelect(ev) {
    const newVal = ev.target.value
    if (newVal === 'other') {
      setSelectedValue(newVal)
      setInputValue('')
      setValue('')
    } else {
      setSelectedValue(newVal)
      setValue(newVal)
    }
  }

  return (
    <React.Fragment>
      <Box my={1}>
        <select onChange={handleSelect} value={selectedValue}>
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

      {value ? (
        <input
          onChange={(ev) => setValue(ev.target.value)}
          value={inputValue}
        />
      ) : null}
    </React.Fragment>
  )
}
