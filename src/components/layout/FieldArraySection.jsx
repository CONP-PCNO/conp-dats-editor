import React from 'react'
import { FieldArray } from 'formik'
import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import { Button, Box } from '@material-ui/core'
import FieldGroup from '../layout/FieldGroup'
import parseValues from '../../model/fieldParsing'

export default function FieldArraySection(props) {
  const {
    isExperiment,
    isRequired,
    jsonField,
    setupProps,
    nameAttr,
    values,
    ...fieldProps
  } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, description, fieldName } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const JsonField = jsonField
  return (
    <Section>
      <SectionTitle name={`${name}${requiredStar}`} tooltip={description} />

      <FieldArray name={nameAttr}>
        {(arrayHelpers) => (
          <Box display='flex flex-column'>
            {values.map((type, index) => {
              return (
                <FieldGroup
                  arrayHelpers={arrayHelpers}
                  index={index}
                  key={`${fieldName}${index}`}
                  name={`${fieldName}${index}`}
                >
                  <JsonField
                    isExperiment={isExperiment}
                    isRequired={isRequired}
                    nameAttr={`${nameAttr}.${index}`}
                    values={setupProps}
                    {...fieldProps}
                  />
                </FieldGroup>
              )
            })}

            <Box py={1}>
              <Button
                color='secondary'
                onClick={() => {
                  arrayHelpers.push('')
                }}
                variant='outlined'
              >
                {values.length > 0
                  ? `Add another ${nameAttr}`
                  : `Add a ${nameAttr}`}
              </Button>
            </Box>
          </Box>
        )}
      </FieldArray>
    </Section>
  )
}
