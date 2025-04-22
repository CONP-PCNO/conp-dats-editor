import React from 'react'
import { FastField } from 'formik'
import { Checkbox } from 'formik-material-ui'

function CustomCheckbox({ ...props }) {
  return (
    <label>
      <FastField component={Checkbox} type='checkbox' {...props} />

      {props.children}
    </label>
  )
}

export default CustomCheckbox
