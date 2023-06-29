import React from 'react'
import { FieldArray } from 'formik'
import { Typography, Button, Divider, Box } from '@material-ui/core'
import FieldArraySection from '../../layout/FieldArraySection'
import SingleFieldSection from '../../layout/SingleFieldSection'
import JsonOtherSelectField from '../../fields/JsonOtherSelectField'
import JsonTextField from '../../fields/JsonTextField'
import Section from '../../layout/Section'
import JsonSectionTitle from '../../layout/JsonSectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function ExperimentsForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Typography gutterBottom variant='h5'>
        Experiment Information
      </Typography>

      <FieldArraySection
        fullwidth
        isExperiment
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='experimentsFunctionAssessed'
        setupProps={fieldDescriptions.experimentsFunctionAssessed}
        values={values.experimentsFunctionAssessed}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='experimentsModalities'
        setupProps={fieldDescriptions.experimentsModalities}
        values={values.experimentsModalities}
      />

      <Divider variant='middle' />

      <Section>
        <JsonSectionTitle
          isExperiment
          setupProps={fieldDescriptions.experimentsRequiredSoftwareTitle}
        />

        <FieldArray name='experimentsRequiredSoftware'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsRequiredSoftware.map((software, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`software${index}`}
                    name={`software${index}`}
                  >
                    <JsonSectionTitle
                      isExperiment
                      setupProps={fieldDescriptions.experimentsRequiredSoftware}
                      subsection
                    />

                    <JsonOtherSelectField
                      isExperiment
                      nameAttr={`experimentsRequiredSoftware.${index}.software`}
                      setupProps={fieldDescriptions.experimentsRequiredSoftware}
                      value={values.experimentsRequiredSoftware[index].software}
                    />

                    <JsonSectionTitle
                      isExperiment
                      setupProps={
                        fieldDescriptions.experimentsRequiredSoftwareVersion
                      }
                      subsection
                    />

                    <CustomTextField
                      label={
                        fieldDescriptions.experimentsRequiredSoftwareVersion
                          .name
                      }
                      name={`experimentsRequiredSoftware.${index}.version`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  color='secondary'
                  onClick={() => arrayHelpers.push('')}
                  variant='outlined'
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

      <FieldArraySection
        isExperiment
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='experimentsRequiredDevices'
        setupProps={fieldDescriptions.experimentsRequiredDevices}
        values={values.experimentsRequiredDevices}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment
        jsonField={JsonOtherSelectField}
        nameAttr='experimentsStimuli'
        setupProps={fieldDescriptions.experimentsStimuli}
        values={values.experimentsStimuli}
      />

      <Divider variant='middle' />

      <FieldArraySection
        fullWidth
        isExperiment
        isRequired
        jsonField={JsonTextField}
        nameAttr='experimentsLanguages'
        setupProps={fieldDescriptions.experimentsLanguages}
        values={values.experimentsLanguages}
      />

      <Divider variant='middle' />

      <Section>
        <JsonSectionTitle
          isExperiment
          setupProps={fieldDescriptions.experimentsValidation}
        />

        <JsonSectionTitle
          isExperiment
          setupProps={fieldDescriptions.experimentsValidationMeasures}
          subsection
        />

        <FieldArray name='experimentsValidationMeasures'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsValidationMeasures.map((validation, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`validationMeasure${index}`}
                    name={`validationMeasure${index}`}
                  >
                    <JsonOtherSelectField
                      isExperiment
                      nameAttr={`experimentsValidationMeasures.${index}`}
                      setupProps={
                        fieldDescriptions.experimentsValidationMeasures
                      }
                      value={values.experimentsValidationMeasures[index]}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  color='secondary'
                  onClick={() => arrayHelpers.push('')}
                  variant='outlined'
                >
                  {values.experimentsValidationMeasures.length > 0
                    ? 'Add another validation measure'
                    : 'Add a validation measure'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>

        <JsonSectionTitle
          isExperiment
          setupProps={fieldDescriptions.experimentsValidationPopulations}
          subsection
        />

        <FieldArray name='experimentsValidationPopulations'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {' '}
              {values.experimentsValidationPopulations.map(
                (validation, index) => {
                  return (
                    <FieldGroup
                      arrayHelpers={arrayHelpers}
                      index={index}
                      key={`validationPopulation${index}`}
                      name={`validationPopulation${index}`}
                    >
                      <JsonOtherSelectField
                        isExperiment
                        nameAttr={`experimentsValidationPopulations.${index}`}
                        setupProps={
                          fieldDescriptions.experimentsValidationPopulations
                        }
                        value={values.experimentsValidationPopulations[index]}
                      />
                    </FieldGroup>
                  )
                }
              )}
              <Box py={1}>
                <Button
                  color='secondary'
                  onClick={() => arrayHelpers.push('')}
                  variant='outlined'
                >
                  {values.experimentsValidationPopulations.length > 0
                    ? 'Add another validation population'
                    : 'Add a validation population'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>

      <Divider variant='middle' />

      <FieldArraySection
        fullWidth
        isExperiment
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='experimentsAccessibility'
        setupProps={fieldDescriptions.experimentsAccessibility}
        values={values.experimentsAccessibility}
      />

      <Divider variant='middle' />

      <SingleFieldSection
        fullWidth
        isExperiment
        jsonField={JsonTextField}
        nameAttr='experimentsAdditionalRequirements'
        setupProps={fieldDescriptions.experimentsAdditionalRequirements}
      />
    </React.Fragment>
  )
}
