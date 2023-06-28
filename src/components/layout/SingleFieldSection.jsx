import React from 'react'

import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import parseValues from '../../model/fieldParsing'

export default function SingleFieldSection(props) {
  const {
    isExperiment,
    isRequired,
    jsonField,
    nameAttr,
    values,
    ...fieldProps
  } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { description, name } = parseValues(values, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const JsonField = jsonField
  return (
    <Section>
      <SectionTitle name={`${name}${requiredStar}`} tooltip={description} />

      <JsonField
        isExperiment={isExperiment}
        isRequired={isRequired}
        nameAttr={nameAttr}
        values={values}
        {...fieldProps}
      />
    </Section>
  )
}
