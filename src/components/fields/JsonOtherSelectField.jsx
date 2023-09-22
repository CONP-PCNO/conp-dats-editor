import React from 'react'
import { FastField } from 'formik'
import { Box } from '@material-ui/core'
import parseValues from '../../model/fieldParsing'
import HybridSelectTextField from '../fields/HybridSelectTextField'

export default function JsonOtherSelectField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, items } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <Box my={1}>
      <FastField
        component={HybridSelectTextField}
        inputProps={{ 'data-testid': `${nameAttr}.value` }}
        label={label}
        name={`${nameAttr}.value`}
        options={items}
      />
    </Box>
  )
}
