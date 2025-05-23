import React, { Fragment } from 'react'
import { Button, Divider, Box, Typography } from '@material-ui/core'
import FieldArraySection from '../../layout/FieldArraySection'
import { FieldArray } from 'formik'
import FieldGroup from '../../layout/FieldGroup'
import Section from '../../layout/Section'
import JsonSectionTitle from '../../layout/JsonSectionTitle'
import CustomTextField from '../../fields/CustomTextField'
import JsonTextField from '../../fields/JsonTextField'
import JsonOtherSelectField from '../../fields/JsonOtherSelectField'
import JsonSelectField from '../../fields/JsonSelectField'
import CreatorsField from '../../fields/CreatorsField'
import SingleFieldSection from '../../layout/SingleFieldSection'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function GeneralForm(props) {
  const { values, isExperiment, nextClicked } = props
  // Détermine si registrationPageURL doit être obligatoire
  const isRegistrationPageRequired = ['registered', 'controlled', 'private'].includes(values.privacy);

  return (
    <React.Fragment>
      <Typography gutterBottom variant='h5'>
        General Information
      </Typography>

      <SingleFieldSection
        fullWidth
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='title'
        nextClicked = {nextClicked}
        setupProps={fieldDescriptions.title}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={CreatorsField}
        nameAttr='creators'
        setupProps={fieldDescriptions.creators}
        values={values.creators}
      />

      <Divider variant='middle' />

      <SingleFieldSection
        fullWidth
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        minRows={4}
        multiline
        nextClicked = {nextClicked}
        nameAttr='description'
        setupProps={fieldDescriptions.description}
      />

      <Divider variant='middle' />

      {isExperiment ? null : (
        <FieldArraySection
          isExperiment={isExperiment}
          isRequired
          jsonField={JsonTextField}
          nameAttr='types'
          setupProps={fieldDescriptions.types}
          values={values.types}
        />
      )}

      {isExperiment ? null : (
        <>
          <Divider variant='middle' />

          <Section>
            <JsonSectionTitle
              isExperiment={isExperiment}
              setupProps={fieldDescriptions.dimensions}
            />

            <FieldArray name='dimensions'>
              {(arrayHelpers) => (
                <Box display='flex flex-column'>
                  {values.dimensions.map((dimension, index) => {
                    return (
                      <FieldGroup
                        arrayHelpers={arrayHelpers}
                        index={index}
                        key={`dimension_${index}`}
                        name={`dimension_${index}`}
                      >
                        <CustomTextField
                          label='Name'
                          name={`dimensions.${index}.name`}
                        />

                        <CustomTextField
                          label='Description'
                          name={`dimensions.${index}.description`}
                        />
                      </FieldGroup>
                    )
                  })}

                  <Box py={1}>
                    <Button
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          name: '',
                          description: ''
                        })
                      }}
                      variant='outlined'
                    >
                      {values.dimensions.length > 0
                        ? 'Add another Dimension'
                        : 'Add a Dimension'}
                    </Button>
                  </Box>
                </Box>
              )}
            </FieldArray>
          </Section>
        </>
      )}

      <Divider variant='middle' />

      <SingleFieldSection
        fullWidth
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='version'
        setupProps={fieldDescriptions.version}
      />

      <Divider variant='middle' />

      <SingleFieldSection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonSelectField}
        nameAttr='privacy'
        setupProps={fieldDescriptions.privacy}
      />

      <Divider variant='middle' />

      {!isExperiment && (
        <Section>
          <JsonSectionTitle
            isExperiment={isExperiment}
            isRequired={isRegistrationPageRequired}
            setupProps={fieldDescriptions.registrationPage}
          />

          <CustomTextField
           label='registrationPage' 
           name='registrationPageURL' 
           required={isRegistrationPageRequired}  />
        </Section>
      )}

      <Divider variant='middle' /> 

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='licenses'
        setupProps={fieldDescriptions.licenses}
        values={values.licenses}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='keywords'
        setupProps={fieldDescriptions.keywords}
        values={values.keywords}
      />
    </React.Fragment>
  )
}
