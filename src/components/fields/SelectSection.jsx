import React from 'react'

import { MenuItem } from '@material-ui/core'
import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import parseValues from '../../model/fieldParsing'
import CustomSelectField from '../fields/CustomSelectField'

export default function SelectSection(props) {
  const { nameAttr, values, isExperiment, isRequired } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { description, name, items } = parseValues(values, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const label = `${name}${requiredStar}`
  return (
    <Section>
      <SectionTitle name={label} tooltip={description} />

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
    </Section>
  )
}
