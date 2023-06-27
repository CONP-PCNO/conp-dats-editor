import React from 'react'
import FieldGroup from '../../layout/FieldGroup'
import CustomRadioGroup from '../../fields/CustomRadioGroup'
import {
  Button,
  MenuItem,
  FormControlLabel,
  Radio,
  Box
} from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import CustomTextField from '../../fields/CustomTextField'
import SectionTitle from '../../layout/SectionTitle'
import CustomSelectField from '../../fields/CustomSelectField'

export default function CreatorsField(props) {
  const { arrayHelpers, creator, index } = props
  return (
    <FieldGroup
      arrayHelpers={arrayHelpers}
      index={index}
      key={`creator_${index}`}
      name={`creator_${index}`}
    >
      <CustomRadioGroup label='Type' name={`creators.${index}.type`}>
        <FormControlLabel control={<Radio />} label='Person' value='Person' />

        <FormControlLabel
          control={<Radio />}
          label='Organization'
          value='Organization'
        />
      </CustomRadioGroup>

      {creator.type === 'Organization' ? (
        <Section>
          <CustomTextField
            label='Name/Institution'
            name={`creators.${index}.name`}
            required
          />

          <CustomTextField
            label='Abbreviation'
            name={`creators.${index}.abbreviation`}
          />
        </Section>
      ) : (
        <Section>
          <CustomTextField
            label='Full Name'
            name={`creators.${index}.fullName`}
            required
          />

          <CustomTextField
            label='First Name'
            name={`creators.${index}.firstName`}
            required
          />

          <CustomTextField
            label='Middle Initial'
            name={`creators.${index}.middleInitial`}
          />

          <CustomTextField
            fullWidth
            label='Last Name'
            name={`creators.${index}.lastName`}
            required
          />

          <CustomTextField label='Email' name={`creators.${index}.email`} />

          <CustomTextField
            label='ORCID iD (https://orcid.org/XXXX-XXXX-XXXX-XXXX)'
            name={`creators.${index}.orcid`}
            required
          />

          <FieldArray name={`creators.${index}.affiliations`}>
            {(arrayHelpers) => (
              <Section subsection>
                <SectionTitle
                  name='Affiliations'
                  subsection
                  tooltip='Creator affiliations'
                />

                {(values.creators[index]?.affiliations || []).map(
                  (affiliation, i) => {
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
                          name={`creators.${index}.affiliations.${i}.name`}
                        />
                      </FieldGroup>
                    )
                  }
                )}

                <Box py={1}>
                  <Button
                    color='secondary'
                    onClick={() => {
                      arrayHelpers.push('')
                    }}
                    variant='outlined'
                  >
                    {(values.creators[index]?.affiliations || []).length > 0
                      ? 'Add another Affiliation'
                      : 'Add an Affiliation'}
                  </Button>
                </Box>
              </Section>
            )}
          </FieldArray>
        </Section>
      )}

      <CustomSelectField label='Role' name={`creators.${index}.role`} required>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>

        <MenuItem value='Principal Investigator'>
          Principal Investigator
        </MenuItem>

        <MenuItem value='Contributor'>Contributor</MenuItem>
      </CustomSelectField>
    </FieldGroup>
  )
}
