import React from 'react'

import { MenuItem } from '@material-ui/core'
import parseValues from '../../model/fieldParsing'
import CustomSelectField from '../fields/CustomSelectField'

export default function JsonSelectField(props) {
  const { isExperiment, isRequired, nameAttr, values } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, items } = parseValues(values, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <CustomSelectField label={label} name={nameAttr}>
      {Object.entries(items).map((entry) => {
        const [value, itemLabel] = entry
        return (
          <MenuItem key={value} value={value}>
            {itemLabel}
          </MenuItem>
        )
      })}
    </CustomSelectField>
  )
}
