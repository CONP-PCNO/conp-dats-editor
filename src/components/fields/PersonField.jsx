import React from 'react'
import FieldGroup from '../layout/FieldGroup'
import { Button, Box } from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../layout/Section'
import CustomTextField from '../fields/CustomTextField'
import SectionTitle from '../layout/SectionTitle'

export default function PersonField(props) {
  const { isExperiment, isRequired, nameAttr, setupProps, value } = props
  return (
    <Section>
      <CustomTextField
        label='Full Name'
        name={`${nameAttr}.fullName`}
        required
      />

      <CustomTextField
        label='First Name'
        name={`${nameAttr}.firstName`}
        required
      />

      <CustomTextField
        label='Middle Initial'
        name={`${nameAttr}.middleInitial`}
      />

      <CustomTextField
        fullWidth
        label='Last Name'
        name={`${nameAttr}.lastName`}
        required
      />

      <CustomTextField label='Email' name={`${nameAttr}.email`} />

      <CustomTextField
        label='ORCID iD (https://orcid.org/XXXX-XXXX-XXXX-XXXX)'
        name={`${nameAttr}.orcid`}
        required
      />

      <FieldArray name={`${nameAttr}.affiliations`}>
        {(arrayHelpers) => (
          <Section subsection>
            <SectionTitle
              name='Affiliations'
              subsection
              tooltip='Creator affiliations'
            />

            {(value?.affiliations || []).map((affiliation, i) => {
              return (
                <FieldGroup
                  arrayHelpers={arrayHelpers}
                  column
                  index={i}
                  indexed
                  key={`affiliation_${i}`}
                  name={`affiliation_${i}`}
                >
                  <CustomTextField
                    label='Affiliation'
                    name={`${nameAttr}.affiliations.${i}.name`}
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
                {(value?.affiliations || []).length > 0
                  ? 'Add another Affiliation'
                  : 'Add an Affiliation'}
              </Button>
            </Box>
          </Section>
        )}
      </FieldArray>
    </Section>
  )
}
