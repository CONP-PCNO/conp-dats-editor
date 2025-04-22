import React from 'react'

import CustomTextField from '../fields/CustomTextField'
import parseValues from '../../model/fieldParsing'

export default function JsonTextField(props) {
  const {
    isExperiment,
    isRequired,
    nameAttr,
    setupProps,
    value,
    ...fieldProps
  } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name } = parseValues(setupProps, selfString)
  return (
    <CustomTextField
      label={name}
      name={nameAttr}
      required={isRequired}
      {...fieldProps}
    />
  )
}
