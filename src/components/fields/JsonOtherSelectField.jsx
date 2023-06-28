import React from 'react'

import { MenuItem } from '@material-ui/core'
import parseValues from '../../model/fieldParsing'
import CustomSelectField from '../fields/CustomSelectField'
import CustomTextField from '../fields/CustomTextField'

export default function JsonOtherSelectField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps, value } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, items } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <React.Fragment>
      <CustomSelectField
        label={label}
        name={`${nameAttr}.value`}
        required={isRequired}
      >
        {Object.entries(items).map((entry) => {
          const [itemValue, itemLabel] = entry
          return (
            <MenuItem key={itemValue} value={itemValue}>
              {itemLabel}
            </MenuItem>
          )
        })}
      </CustomSelectField>

      {typeof value !== 'undefined' && value.value === 'other' ? (
        <CustomTextField
          label={name}
          name={`${nameAttr}.valueOther`}
          required={isRequired}
        />
      ) : null}
    </React.Fragment>
  )
}
