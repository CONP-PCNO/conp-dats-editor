import React from 'react'
import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  Box, MenuItem
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
import CustomSelectField from "../../fields/CustomSelectField";

export default function ExtraPropertiesForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Section>
        <SectionTitle
          name='Origin *'
          tooltip='Name of the institution or consortium that generated the dataset. Both an institution and a consortium can be specified, e.g. in the case of a named collaboration between different labs at the same institution.'
        />
        <SectionTitle
          subsection
          name='Institution'
          tooltip='Name of the institution where this dataset was created (if applicable).'
        />
        <CustomTextField label='Institution' name='origin.institution' />
        <SectionTitle
          subsection
          name='Consortium'
          tooltip='Name of the consortium where this dataset was created (if applicable).'
        />
        <CustomTextField label='Consortium' name='origin.consortium' />
        <SectionTitle
          subsection
          name='City'
          tooltip='(Principal) city where this dataset was created.'
        />
        <CustomTextField label='City' name='origin.city' />
        <SectionTitle
          subsection
          name='Province'
          tooltip='(Principal) province where this dataset was created.'
        />
        <CustomTextField label='Province' name='origin.province' />
        <SectionTitle
          subsection
          name='Country'
          tooltip='(Principal) country where this dataset was created.'
        />
        <CustomTextField label='Country' name='origin.country' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Derived From'
          tooltip='The sources this dataset is derived from.'
        />
        <SectionTitle
          subsection
          name='Derived From'
          tooltip='Name of the source dataset used to generate this dataset.'
        />
        <CustomTextField label='Derived From' name='derivedFrom' />
        <SectionTitle
          subsection
          name='Parent dataset ID'
          tooltip='Identifier (DOI) of the source dataset used to generate this dataset.'
        />
        <CustomTextField label='Parent dataset ID' name='parentDatasetId' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Primary Publications'
          tooltip='The primary publication(s) associated with the dataset, usually describing how the dataset was produced.'
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
                    <SectionTitle
                      subsection
                      name='Title'
                      tooltip='The name of the publication.'
                    />
                    <CustomTextField
                      label='Title'
                      name={`primaryPublications.${index}.title`}
                    />
                    <SectionTitle
                      subsection
                      name='Publication Venue'
                      tooltip='The name of the publication venue where the document is published (if applicable).'
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
                            tooltip='Authors of the publication.'
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
                                        tooltip='Author affiliations.'
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
                        tooltip='Relevant dates for the publication. If you provide a date, it must come with a description of the date (i.e.: first submission, final approval, date of publication, ...).'
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
                                    date: new Date(
                                      new Date().setHours(0, 0, 0, 0)
                                    )
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
                    <SectionTitle
                      name='Identifier'
                      tooltip='A code uniquely identifying the publication locally to a system or globally. Provide a Document Object Identifier (DOI) if you have one.'
                    />
                    <CustomTextField
                      label='Identifier'
                      name={`primaryPublications.${index}.identifier.identifier`}
                    />
                    <SectionTitle
                      name='Identifier Source'
                      tooltip='Information about the organisation/namespace responsible for minting the identifier. It must be provided if the identifier is provided.'
                    />
                    <CustomTextField
                      label='Identifier Source'
                      name={`primaryPublications.${index}.identifier.identifierSource`}
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
          tooltip='The different dimensions (granular components) making up a dataset. Providing dimensions give more details about the data types.'
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
          tooltip='A code uniquely identifying the dataset locally to a system or globally.'
        />
        <CustomTextField label='Identifier' name='identifier.identifier' />
        <SectionTitle
          subsection
          name='Identifier Source'
          tooltip='Information about the organisation/namespace responsible for minting the identifier. It must be provided if the identifier is provided.'
        />
        <CustomTextField label='Source' name='identifier.identifierSource' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Contact *'
          tooltip='Provide contact information (name and email address) of the person responsible for the dataset.'
        />
        <CustomTextField required label='Name' name='contact.name' />
        <CustomTextField required label='Email' name='contact.email' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Logo'
          tooltip='Link to a URL for the logo or local filename containing the logo.'
        />
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
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Dates'
          tooltip='Relevant dates for the dataset. If you provide a date, it must come with a description of the date (i.e.: first data collection, last data collection, date of first publication, ...).'
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
                      date: new Date(new Date().setHours(0, 0, 0, 0))
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
          tooltip='Process which generated a given dataset.'
        />
        <CustomTextField label='Produced By' name='producedBy' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Is About'
          tooltip='Entities (biological entity, taxonomic information, disease, molecular entity, anatomical part, treatment) associated with this dataset.'
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
          tooltip='Grant(s) which funded and supported the work reported by the dataset.'
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
          tooltip='The geographical extension and span (i.e.: city, province, administrative region, ...) covered by the dataset.'
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
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Ethical Information *'
          tooltip='In submitting this dataset for inclusion, I certify that *'
        />
        <CustomSelectField
          label='Select a statement *'
          name='reb_info'
          style={{ minWidth: 200 }}
        >
          <MenuItem value='option_1'>
            Participants have consented to the de-identification and deposit of
            the data in an open-access portal.
          </MenuItem>
          <MenuItem value='option_2'>
            I have obtained a waiver or other authorization to deposit
            de-identified data in an open-access portal from my ethics committee
            (REB, IRB, REC, etc.).
          </MenuItem>
          <MenuItem value='option_3'>
            My data is not derived from human participants.
          </MenuItem>
        </CustomSelectField>
        <CustomTextField
          label='Ethics committee approval number (required for human research data)'
          name='reb_number'
        />
      </Section>
    </React.Fragment>
  )
}
