import React from 'react'
import { FastField } from 'formik'
import parseValues from '../../model/fieldParsing'
import HybridSelectTextField from '../fields/HybridSelectTextField'

export default function JsonOtherSelectField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, items } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <FastField
      component={HybridSelectTextField}
      inputProps={{ 'data-testid': `${nameAttr}.value` }}
      label={label}
      name={`${nameAttr}.value`}
      options={items}
    />
  )
}
