import React from 'react'
import { Field, FieldArray } from 'formik'
import { Typography, Button, Divider, Box } from '@material-ui/core'
import { Checkbox } from 'formik-material-ui'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'

export default function ExperimentsForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        Experiment Information
      </Typography>
      <Section>
        <SectionTitle name='Functions assessed' tooltip='' />
        <CustomTextField
          fullWidth
          name='experimentsFunctionAssessed'
          label='Functions assessed'
        />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Features' tooltip='' />
        <label>
          <Field
            component={Checkbox}
            type='checkbox'
            name='experimentsRepeatability'
          />
          Repeatability
        </label>
        <label>
          <Field
            component={Checkbox}
            type='checkbox'
            name='experimentsMultilingual'
          />
          Multilingual
        </label>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Languages' tooltip='' />
        <FieldArray name='experimentsLanguages'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsLanguages.map((language, index) => {
                return (
                  <FieldGroup
                    key={'language' + index}
                    name={'language' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      label='Language'
                      name={`experimentsLanguages.${index}`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => arrayHelpers.push('')}
                >
                  {values.experimentsLanguages.length > 0
                    ? 'Add another language'
                    : 'Add a language'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Validation' tooltip='' />
        <FieldArray name='experimentsValidation'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsValidation.map((language, index) => {
                return (
                  <FieldGroup
                    key={'validation' + index}
                    name={'validation' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      label='Language'
                      name={`experimentsValidation.${index}`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => arrayHelpers.push('')}
                >
                  {values.experimentsValidation.length > 0
                    ? 'Add another validation measure or population'
                    : 'Add a validation measure or population'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Accessibility' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Platforms' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Devices' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Software' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Requirements' tooltip='' />
      </Section>
    </React.Fragment>
  )
}
