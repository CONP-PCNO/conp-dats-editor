import React from 'react'

import { Box, MenuItem } from '@material-ui/core'
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
      <Box my={1}>
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
      </Box>

      {typeof value !== 'undefined' && value.value === 'other' ? (
        <Box my={1}>
          <CustomTextField
            label={name}
            name={`${nameAttr}.valueOther`}
            required={isRequired}
          />
        </Box>
      ) : null}
    </React.Fragment>
  )
}
