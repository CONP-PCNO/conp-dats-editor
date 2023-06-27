import React from 'react'

import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import CustomTextField from '../fields/CustomTextField'
import parseValues from '../../model/fieldParsing'

export default function TextSection(props) {
  const { nameAttr, values, isExperiment, isRequired, ...fieldProps } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { description, name } = parseValues(values, selfString)
  const requiredStar = isRequired ? ' *' : ''
  return (
    <Section>
      <SectionTitle name={`${name}${requiredStar}`} tooltip={description} />

      <CustomTextField
        fullWidth
        label={name}
        name={nameAttr}
        required={isRequired}
        {...fieldProps}
      />
    </Section>
  )
}
