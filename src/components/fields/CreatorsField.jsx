import React from 'react'
import CustomRadioGroup from '../fields/CustomRadioGroup'
import { MenuItem, FormControlLabel, Radio } from '@material-ui/core'
import Section from '../layout/Section'
import CustomTextField from '../fields/CustomTextField'
import PersonField from '../fields/PersonField'
import CustomSelectField from '../fields/CustomSelectField'

export default function CreatorsField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps, value } = props
  return (
    <React.Fragment>
      <CustomRadioGroup label='Type' name={`${nameAttr}.type`}>
        <FormControlLabel control={<Radio />} label='Person' value='Person' />

        <FormControlLabel
          control={<Radio />}
          label='Organization'
          value='Organization'
        />
      </CustomRadioGroup>

      {value.type === 'Organization' ? (
        <Section>
          <CustomTextField
            label='Name/Institution'
            name={`${nameAttr}.name`}
            required
          />

          <CustomTextField
            label='Abbreviation'
            name={`${nameAttr}.abbreviation`}
          />
        </Section>
      ) : (
        <PersonField
          isExperiment={isExperiment}
          isRequired={isRequired}
          nameAttr={nameAttr}
          setupProps={setupProps}
          value={value}
        />
      )}

      <CustomSelectField label='Role' name={`${nameAttr}.role`} required>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>

        <MenuItem value='Principal Investigator'>
          Principal Investigator
        </MenuItem>

        <MenuItem value='Contributor'>Contributor</MenuItem>
      </CustomSelectField>
    </React.Fragment>
  )
}
