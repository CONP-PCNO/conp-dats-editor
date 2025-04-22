import React from 'react'

import SectionTitle from '../layout/SectionTitle'
import parseValues from '../../model/fieldParsing'

export default function JsonSectionTitle(props) {
  const { isExperiment, isRequired, setupProps, subsection, isDisabled } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { description, name } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  return (
    <SectionTitle
      isDisabled={isDisabled}
      name={`${name}${requiredStar}`}
      subsection={subsection}
      tooltip={description}
    />
  )
}
