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
          Repeatable
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
        <SectionTitle
          name='Validation'
          tooltip='Validation measure(s) and population(s)'
        />
        <FieldArray name='experimentsValidation'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsValidation.map((validation, index) => {
                return (
                  <FieldGroup
                    key={'validation' + index}
                    name={'validation' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Validation measure'
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
        <SectionTitle
          name='Accessibility'
          tooltip='Accessibility considerations (e.g. colourblind friendly)'
        />
        <FieldArray name='experimentsAccessibility'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsAccessibility.map((accesibility, index) => {
                return (
                  <FieldGroup
                    key={'accessibility' + index}
                    name={'accessibility' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Accessibility consideration'
                      name={`experimentsAccessibility.${index}`}
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
                  {values.experimentsAccessibility.length > 0
                    ? 'Add another accessibility consideration'
                    : 'Add an accessibility consideration'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Platforms'
          tooltip='Platforms (e.g. online, offline, fMRI, EEG, MEG)'
        />
        <FieldArray name='experimentsRequiredPlatforms'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsRequiredPlatforms.map((platform, index) => {
                return (
                  <FieldGroup
                    key={'platforms' + index}
                    name={'platforms' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Platform'
                      name={`experimentsRequiredPlatforms.${index}`}
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
                  {values.experimentsRequiredPlatforms.length > 0
                    ? 'Add another platform'
                    : 'Add a platform'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Devices'
          tooltip='Devices required to run the experiment (e.g. PC, smartphone)'
        />
        <FieldArray name='experimentsRequiredDevices'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsRequiredDevices.map((device, index) => {
                return (
                  <FieldGroup
                    key={'devices' + index}
                    name={'devices' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Device'
                      name={`experimentsRequiredDevices.${index}`}
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
                  {values.experimentsRequiredDevices.length > 0
                    ? 'Add another device'
                    : 'Add a device'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Software'
          tooltip='Software and version to run the experiment'
        />
        <FieldArray name='experimentsRequiredSoftware'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsRequiredSoftware.map((software, index) => {
                return (
                  <FieldGroup
                    key={'software' + index}
                    name={'software' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Software'
                      name={`experimentsRequiredSoftware.${index}`}
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
                  {values.experimentsRequiredSoftware.length > 0
                    ? 'Add another software/version'
                    : 'Add a software/version'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Requirements'
          tooltip='Any additional requirements'
        />
        <CustomTextField
          fullWidth
          name='experimentsAdditionalRequirements'
          label='Description of additional requirements'
        />
      </Section>
    </React.Fragment>
  )
}
