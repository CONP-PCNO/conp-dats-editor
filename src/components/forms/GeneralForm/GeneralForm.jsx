import React from 'react'
import {
  Typography,
  Button,
  MenuItem,
  Divider,
  FormControlLabel,
  Radio,
  Box
} from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'

export default function GeneralForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        General Information
      </Typography>
      <Section>
        <SectionTitle name='Title' tooltip='The Title of the Dataset' />
        <CustomTextField
          required
          fullWidth
          name='title'
          label='Dataset Title'
        />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Creators' tooltip='Dataset Contributors' />
        <FieldArray name='creators'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.creators.map((creator, index) => {
                return (
                  <FieldGroup
                    key={'creator_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      fullWidth
                      label='Name/Institution'
                      name={`creators.${index}.name`}
                    />
                    <CustomTextField
                      fullWidth
                      label='Email'
                      name={`creators.${index}.email`}
                    />
                    <CustomSelectField
                      name={`creators.${index}.role`}
                      label='Role'
                      required
                    >
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
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: 'contributor',
                      name: '',
                      email: ''
                    })
                  }}
                >
                  Add another Creator
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Description' tooltip='Description of the Dataset' />
        <CustomTextField
          required
          fullWidth
          label='Description'
          name='description'
          multiline
          rows={4}
        />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Data Types'
          tooltip='The data types included in the dataset'
        />
        <FieldArray name='types'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.types.map((type, index) => {
                return (
                  <FieldGroup
                    key={'type' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      label='Type'
                      name={`types.${index}`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push('')
                  }}
                >
                  Add another Type
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Version' tooltip='Version number of the dataset' />
        <CustomTextField label='Version' name='version' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Licenses' tooltip='Dataset Licenses' />
        <FieldArray name='licenses'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.licenses.map((license, index) => {
                return (
                  <FieldGroup
                    key={'license_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomRadioGroup
                      name={`licenses.${index}.type`}
                      label='Type'
                    >
                      <FormControlLabel
                        value='creativeCommons'
                        control={<Radio />}
                        label='Creative Commons'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Radio />}
                        label='Other'
                      />
                    </CustomRadioGroup>
                    {license.type === 'creativeCommons' ? (
                      <CustomSelectField
                        required
                        label='License'
                        name={`licenses.${index}.value`}
                      >
                        <MenuItem value='CC BY'>CC BY</MenuItem>
                        <MenuItem value='CC BY-SA'>CC BY-SA</MenuItem>
                        <MenuItem value='CC BY-NC'>CC BY-NC</MenuItem>
                        <MenuItem value='CC BY-NC-SA'>CC BY-NC-SA</MenuItem>
                        <MenuItem value='CC BY-ND'>CC BY-ND</MenuItem>
                        <MenuItem value='CC BY-NC-ND'>CC BY-NC-ND</MenuItem>
                      </CustomSelectField>
                    ) : (
                      <CustomTextField
                        label='License'
                        name={`licenses.${index}.value`}
                      />
                    )}
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: 'creativeCommons',
                      value: ''
                    })
                  }}
                >
                  Add another License
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Keywords' tooltip='Dataset Keywords' />
        <FieldArray name='keywords'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.keywords.map((keyword, index) => {
                return (
                  <FieldGroup
                    key={'keyword_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      label='Keyword'
                      name={`keywords.${index}`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push('')
                  }}
                >
                  Add another Keyword
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
    </React.Fragment>
  )
}
