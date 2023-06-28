import React from 'react'

import CustomTextField from '../fields/CustomTextField'
import parseValues from '../../model/fieldParsing'

export default function JsonTextField(props) {
  const { isExperiment, isRequired, nameAttr, values, ...fieldProps } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name } = parseValues(values, selfString)
  return (
    <CustomTextField
      label={name}
      name={nameAttr}
      required={isRequired}
      {...fieldProps}
    />
  )
}
