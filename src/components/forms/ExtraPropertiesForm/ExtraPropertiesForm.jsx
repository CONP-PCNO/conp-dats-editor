import React from 'react'
import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  Box
} from '@material-ui/core'
import { DatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FieldArray, Field } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'

import moment from 'moment'

export default function ExtraPropertiesForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Section>
        <SectionTitle name='Origin' tooltip='The origin of this dataset' />
        <CustomTextField label='Institution' name='origin.institution' />
        <CustomTextField label='Consortium' name='origin.consortium' />
        <CustomTextField label='City' name='origin.city' />
        <CustomTextField label='Province' name='origin.province' />
        <CustomTextField label='Country' name='origin.country' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Derived From'
          tooltip='The sources this dataset is derived from'
        />
        <CustomTextField label='Derived From' name='derivedFrom' />
        <CustomTextField label='Parent dataset id' name='parentDatasetId' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Primary Publications'
          tooltip='The primary publication(s) associated with the dataset, usually describing how the dataset was produced'
        />
        <FieldArray name='primaryPublications'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.primaryPublications.map((primaryPublication, index) => {
                return (
                  <FieldGroup
                    column
                    indexed
                    key={'primaryPublication_' + index}
                    name={'primaryPublication_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Title'
                      name={`primaryPublications.${index}.title`}
                    />
                    <CustomTextField
                      label='Publication Venue'
                      name={`primaryPublications.${index}.publicationVenue`}
                    />
                    <FieldArray name={`primaryPublications.${index}.authors`}>
                      {(arrayHelpers) => (
                        <Section subsection>
                          <SectionTitle
                            subsection
                            name='Authors'
                            tooltip='Authors of the publication'
                          />
                          {(
                            values.primaryPublications[index]?.authors || []
                          ).map((author, idx) => {
                            return (
                              <FieldGroup
                                column
                                indexed
                                key={'author_' + idx}
                                name={'author_' + idx}
                                index={idx}
                                arrayHelpers={arrayHelpers}
                              >
                                <CustomTextField
                                  label='Full Name'
                                  name={`primaryPublications.${index}.authors.${idx}.fullName`}
                                />
                                <CustomTextField
                                  label='First Name'
                                  name={`primaryPublications.${index}.authors.${idx}.firstName`}
                                />
                                <CustomTextField
                                  label='Middle Initial'
                                  name={`primaryPublications.${index}.authors.${idx}.middleInitial`}
                                />
                                <CustomTextField
                                  label='Last Name'
                                  name={`primaryPublications.${index}.authors.${idx}.lastName`}
                                />
                                <FieldArray
                                  name={`primaryPublications.${index}.authors.${idx}.affiliations`}
                                >
                                  {(arrayHelpers) => (
                                    <Section subsection>
                                      <SectionTitle
                                        subsection
                                        name='Affiliations'
                                        tooltip='Author affiliations'
                                      />
                                      {(
                                        values.primaryPublications[index]
                                          ?.authors[idx]?.affiliations || []
                                      ).map((affiliation, i) => {
                                        return (
                                          <FieldGroup
                                            column
                                            indexed
                                            key={'affiliation_' + i}
                                            name={'affiliation_' + i}
                                            index={i}
                                            arrayHelpers={arrayHelpers}
                                          >
                                            <CustomTextField
                                              label='Affiliation'
                                              name={`primaryPublications.${index}.authors.${idx}.affiliations.${i}.name`}
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
                                          {(
                                            values.primaryPublications[index]
                                              ?.authors[idx]?.affiliations || []
                                          ).length > 0
                                            ? 'Add another Affiliation'
                                            : 'Add an Affiliation'}
                                        </Button>
                                      </Box>
                                    </Section>
                                  )}
                                </FieldArray>
                              </FieldGroup>
                            )
                          })}
                          <Box py={1}>
                            <Button
                              variant='outlined'
                              color='secondary'
                              onClick={() => {
                                arrayHelpers.push({
                                  fullName: '',
                                  firstName: '',
                                  middleInitial: '',
                                  lastName: '',
                                  affiliations: []
                                })
                              }}
                            >
                              {(
                                values.primaryPublications[index]?.authors || []
                              ).length > 0
                                ? 'Add another Author'
                                : 'Add an Author'}
                            </Button>
                          </Box>
                        </Section>
                      )}
                    </FieldArray>
                    <Section subsection>
                      <SectionTitle
                        subsection
                        name='Dates'
                        tooltip='Relevant dates for the publication. If you provide a date, it must come with a description of the date'
                      />
                      <FieldArray name={`primaryPublications.${index}.dates`}>
                        {(arrayHelpers) => (
                          <Box display='flex flex-column'>
                            {values.primaryPublications[index].dates.map(
                              (date, idx) => {
                                return (
                                  <FieldGroup
                                    key={'date_' + index}
                                    name={'date_' + index}
                                    index={index}
                                    arrayHelpers={arrayHelpers}
                                  >
                                    <MuiPickersUtilsProvider
                                      utils={DateFnsUtils}
                                    >
                                      <Field
                                        component={DatePicker}
                                        name={`primaryPublications.${index}.dates.${idx}.date`}
                                        label='Date'
                                        format='MM/dd/yyyy'
                                      />
                                    </MuiPickersUtilsProvider>
                                    <CustomTextField
                                      label='Description'
                                      name={`primaryPublications.${index}.dates.${idx}.type.value`}
                                    />
                                  </FieldGroup>
                                )
                              }
                            )}
                            <Box py={1}>
                              <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => {
                                  arrayHelpers.push({
                                    description: '',
                                    date: moment().format()
                                  })
                                }}
                              >
                                {values.dates.length > 0
                                  ? 'Add another Date'
                                  : 'Add a Date'}
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </FieldArray>
                    </Section>
                    <Section subsection>
                      <SectionTitle
                        subsection
                        name='Identifier'
                        tooltip='Primary identifier for the dataset. Provide a Document Object Identifier (DOI) if you have one'
                      />
                      <CustomTextField
                        label='Identifier'
                        name={`primaryPublications.${index}.identifier.identifier`}
                      />
                      <CustomTextField
                        label='Source'
                        name={`primaryPublications.${index}.identifier.identifierSource`}
                      />
                    </Section>
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      title: '',
                      publicationVenue: '',
                      authors: [],
                      dates: [],
                      identifier: {
                        identifier: '',
                        identifierSource: ''
                      }
                    })
                  }}
                >
                  {values.primaryPublications.length > 0
                    ? 'Add another Primary Publication'
                    : 'Add a Primary Publication'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Dimensions'
          tooltip='The different dimensions (granular components) making up a dataset. Providing dimensions give more details about the data types'
        />
        <FieldArray name='dimensions'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.dimensions.map((dimension, index) => {
                return (
                  <FieldGroup
                    key={'dimension_' + index}
                    name={'dimension_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
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
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      name: '',
                      description: ''
                    })
                  }}
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
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Identifier'
          tooltip='Primary identifier for the dataset. Provide a Document Object Identifier (DOI) if you have one'
        />
        <CustomTextField label='Identifier' name='identifier.identifier' />
        <CustomTextField label='Source' name='identifier.identifierSource' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Contact'
          tooltip='Contact information for this dataset'
        />
        <CustomTextField label='Name' name='contact.name' />
        <CustomTextField label='Email' name='contact.email' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Logo' tooltip='The Logo for this dataset' />
        <CustomRadioGroup name='logo.type' label='Type'>
          <FormControlLabel value='url' control={<Radio />} label='URL' />
          <FormControlLabel
            value='fileName'
            control={<Radio />}
            label='Filename'
          />
        </CustomRadioGroup>
        {values.logo.type === 'url' ? (
          <CustomTextField label='URL' name='logo.url' />
        ) : (
          <CustomTextField label='Path to File' name='logo.fileName' />
        )}
      </Section>
      <Section>
        <SectionTitle
          name='Dates'
          tooltip='Relevant dates for the dataset. If you provide a date, it must come with a description of the date'
        />
        <FieldArray name='dates'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.dates.map((date, index) => {
                return (
                  <FieldGroup
                    key={'date_' + index}
                    name={'date_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        component={DatePicker}
                        name={`dates.${index}.date`}
                        label='Date'
                        format='MM/dd/yyyy'
                      />
                    </MuiPickersUtilsProvider>
                    <CustomTextField
                      label='Description'
                      name={`dates.${index}.type.value`}
                    />
                  </FieldGroup>
                )
              })}
              <Box item xs={6}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: { value: '' },
                      date: new Date().toISOString()
                    })
                  }}
                >
                  {values.dates.length > 0 ? 'Add another Date' : 'Add a Date'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Produced By'
          tooltip='Process which generated a given dataset'
        />
        <CustomTextField label='Produced By' name='producedBy' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Is About'
          tooltip='Entities (biological entity, taxonomic information, disease, molecular entity, anatomical part, treatment) associated with this dataset'
        />
        <FieldArray name='isAbout'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.isAbout.map((s, index) => {
                return (
                  <FieldGroup
                    key={'isAbout_' + index}
                    name={'isAbout_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField label='Name' name={`isAbout.${index}`} />
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
                  {values.isAbout.length > 0
                    ? 'Add another Entity'
                    : 'Add an Entity'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Acknowledges'
          tooltip='The grant(s) which funded and supported the work reported by the dataset'
        />
        <FieldArray name='acknowledges'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.acknowledges.map((s, index) => {
                return (
                  <FieldGroup
                    key={'acknowledges_' + index}
                    name={'acknowledges_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Name'
                      name={`acknowledges.${index}.name`}
                    />
                    <CustomTextField
                      label='Abbreviation'
                      name={`acknowledges.${index}.abbreviation`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      name: '',
                      abbreviation: ''
                    })
                  }}
                >
                  {values.acknowledges.length > 0
                    ? 'Add another Acknowledgement'
                    : 'Add an Acknowledgement'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Spatial Coverage'
          tooltip='The geographical extension and span covered by the dataset and its measured dimensions/variables'
        />
        <FieldArray name='spatialCoverage'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.spatialCoverage.map((s, index) => {
                return (
                  <FieldGroup
                    key={'spatialCoverage_' + index}
                    name={'spatialCoverage_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      label='Name'
                      name={`spatialCoverage.${index}.name`}
                    />
                    <CustomTextField
                      label='Description'
                      name={`spatialCoverage.${index}.description`}
                    />
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      name: '',
                      description: ''
                    })
                  }}
                >
                  {values.spatialCoverage.length > 0
                    ? 'Add another Spatial Coverage'
                    : 'Add a Spatial Coverage'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
    </React.Fragment>
  )
}
