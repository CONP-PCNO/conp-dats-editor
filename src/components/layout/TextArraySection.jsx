import React from 'react'
import { FieldArray } from 'formik'
import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import { Button, Box } from '@material-ui/core'
import FieldGroup from '../layout/FieldGroup'
import CustomTextField from '../fields/CustomTextField'
import parseValues from '../../model/fieldParsing'

export default function TextArraySection(props) {
  const { isExperiment, setupProps, nameAttr, values } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, description, fieldName } = parseValues(setupProps, selfString)
  const requiredStar = isExperiment ? ' *' : ''
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
                  <CustomTextField
                    label={name}
                    name={`${fieldName}.${index}`}
                    required
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
                {values.length > 0 ? 'Add another Type' : 'Add a Type'}
              </Button>
            </Box>
          </Box>
        )}
      </FieldArray>
    </Section>
  )
}
