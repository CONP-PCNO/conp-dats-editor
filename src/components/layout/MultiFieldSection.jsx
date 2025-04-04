import React from 'react'

import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import parseValues from '../../model/fieldParsing'

export default function SingleFieldSection(props) {
  const {
    isExperiment,
    isRequired,
    jsonFieldArray,
    nameAttrArray,
    setupPropsArray,
    fieldPropsArray
  } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { description, name } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const JsonField = jsonField
  return (
    <Section>
      <SectionTitle name={`${name}${requiredStar}`} tooltip={description} />

      <JsonField
        isExperiment={isExperiment}
        isRequired={isRequired}
        nameAttr={nameAttr}
        setupProps={setupProps}
        {...fieldProps}
      />
    </Section>
  )
}
