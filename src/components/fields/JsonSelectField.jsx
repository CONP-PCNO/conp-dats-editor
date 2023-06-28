import React from 'react'

import { MenuItem } from '@material-ui/core'
import parseValues from '../../model/fieldParsing'
import CustomSelectField from '../fields/CustomSelectField'

export default function JsonSelectField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps, value } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, items } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <CustomSelectField label={label} name={nameAttr} required={isRequired}>
      {Object.entries(items).map((entry) => {
        const [itemValue, itemLabel] = entry
        return (
          <MenuItem key={itemValue} value={itemValue}>
            {itemLabel}
          </MenuItem>
        )
      })}
    </CustomSelectField>
  )
}
