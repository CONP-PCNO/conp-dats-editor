import React from 'react'
import { useFormikContext, getIn } from 'formik';

import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import parseValues from '../../model/fieldParsing'

export default function SingleFieldSection(props) {
  const {
    isExperiment,
    isRequired,
    jsonField,
    nameAttr,
    setupProps,
    nextClicked,
    ...fieldProps
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
        // error={isError} // Passer l'état d'erreur au composant JsonField
        // helperText={errorText} // Passer le texte d'erreur pour affichage
        {...fieldProps}
      />
    </Section>
  )
}
