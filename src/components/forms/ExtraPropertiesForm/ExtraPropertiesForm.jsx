import React from 'react'
import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  Box,
  MenuItem
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
import CustomSelectField from '../../fields/CustomSelectField'

export default function ExtraPropertiesForm(props) {
  const { values, isExperiment } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  return (
    <React.Fragment>
      <Section>
        <SectionTitle
          name='Origin *'
          tooltip={`Name of the institution or consortium that generated the ${selfString}. Both an institution and a consortium can be specified, e.g. in the case of a named collaboration between different labs at the same institution.`}
        />

        <SectionTitle
          name='Institution'
          subsection
          tooltip={`Name of the institution where this ${selfString} was created (if applicable).`}
        />

        <CustomTextField label='Institution' name='origin.institution' />

        <SectionTitle
          name='Consortium'
          subsection
          tooltip={`Name of the consortium where this ${selfString} was created (if applicable).`}
        />

        <CustomTextField label='Consortium' name='origin.consortium' />

        <SectionTitle
          name='City'
          subsection
          tooltip={`(Principal) city where this ${selfString} was created.`}
        />

        <CustomTextField label='City' name='origin.city' />

        <SectionTitle
          name='Province'
          subsection
          tooltip={`(Principal) province where this ${selfString} was created.`}
        />

        <CustomTextField label='Province' name='origin.province' />

        <SectionTitle
          name='Country'
          subsection
          tooltip={`(Principal) country where this ${selfString} was created.`}
        />

        <CustomTextField label='Country' name='origin.country' />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Derived From (For Derived Datasets Only)'
          tooltip={`Required for derived ${selfString}s only. Provide information about the source ${selfString} this ${selfString} has been derived from.`}
        />

        <SectionTitle
          name='Derived From'
          subsection
          tooltip={`Name of the source ${selfString} used to generate this ${selfString}.`}
        />

        <CustomTextField label='Derived From' name='derivedFrom' />

        <SectionTitle
          name={`Parent ${selfString} ID`}
          subsection
          tooltip={`Identifier (DOI) of the source ${selfString} used to generate this ${selfString}.`}
        />

        <CustomTextField
          label={`Parent ${selfString} ID`}
          name='parentDatasetId'
        />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Primary Publications'
          tooltip={`The primary publication(s) associated with the ${selfString}, usually describing how the ${selfString} was produced.`}
        />

        <FieldArray name='primaryPublications'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.primaryPublications.map((primaryPublication, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    column
                    index={index}
                    indexed
                    key={`primaryPublication_${index}`}
                    name={`primaryPublication_${index}`}
                  >
                    <SectionTitle
                      name='Title'
                      subsection
                      tooltip='The name of the publication.'
                    />

                    <CustomTextField
                      label='Title'
                      name={`primaryPublications.${index}.title`}
                    />

                    <SectionTitle
                      name='Publication Venue'
                      subsection
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
                            name='Authors'
                            subsection
                            tooltip='Authors of the publication.'
                          />

                          {(
                            values.primaryPublications[index]?.authors || []
                          ).map((author, idx) => {
                            return (
                              <FieldGroup
                                arrayHelpers={arrayHelpers}
                                column
                                index={idx}
                                indexed
                                key={`author_${idx}`}
                                name={`author_${idx}`}
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
                                        name='Affiliations'
                                        subsection
                                        tooltip='Author affiliations.'
                                      />

                                      {(
                                        values.primaryPublications[index]
                                          ?.authors[idx]?.affiliations || []
                                      ).map((affiliation, i) => {
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
                                              name={`primaryPublications.${index}.authors.${idx}.affiliations.${i}.name`}
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
                              variant='outlined'
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
                        name='Dates'
                        subsection
                        tooltip='Relevant dates for the publication. If you provide a date, it must come with a description of the date (i.e.: first submission, final approval, date of publication, ...).'
                      />

                      <FieldArray name={`primaryPublications.${index}.dates`}>
                        {(arrayHelpers) => (
                          <Box display='flex flex-column'>
                            {values.primaryPublications[index].dates.map(
                              (date, idx) => {
                                return (
                                  <FieldGroup
                                    arrayHelpers={arrayHelpers}
                                    index={index}
                                    key={`date_${index}`}
                                    name={`date_${index}`}
                                  >
                                    <MuiPickersUtilsProvider
                                      utils={DateFnsUtils}
                                    >
                                      <Field
                                        component={DatePicker}
                                        format='MM/dd/yyyy'
                                        label='Date'
                                        name={`primaryPublications.${index}.dates.${idx}.date`}
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
                                color='secondary'
                                onClick={() => {
                                  arrayHelpers.push({
                                    date: new Date(
                                      new Date().setHours(0, 0, 0, 0)
                                    )
                                  })
                                }}
                                variant='outlined'
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
                  variant='outlined'
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
          tooltip={`The different dimensions (granular components) making up a ${selfString}. Providing dimensions give more details about the data types.`}
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

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Identifier'
          tooltip={`A code uniquely identifying the ${selfString} locally to a system or globally.`}
        />

        <CustomTextField label='Identifier' name='identifier.identifier' />

        <SectionTitle
          name='Identifier Source'
          subsection
          tooltip='Information about the organisation/namespace responsible for minting the identifier. It must be provided if the identifier is provided.'
        />

        <CustomTextField label='Source' name='identifier.identifierSource' />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Contact *'
          tooltip={`Provide contact information (name and email address) of the person responsible for the ${selfString}.`}
        />

        <CustomTextField label='Name' name='contact.name' required />

        <CustomTextField label='Email' name='contact.email' required />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Logo'
          tooltip='Link to a URL for the logo or local filename containing the logo.'
        />

        <CustomRadioGroup label='Type' name='logo.type'>
          <FormControlLabel control={<Radio />} label='URL' value='url' />

          <FormControlLabel
            control={<Radio />}
            label='Filename'
            value='fileName'
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
          tooltip={`Relevant dates for the ${selfString}. If you provide a date, it must come with a description of the date (i.e.: first data collection, last data collection, date of first publication, ...).`}
        />

        <FieldArray name='dates'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.dates.map((date, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`date_${index}`}
                    name={`date_${index}`}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        component={DatePicker}
                        format='MM/dd/yyyy'
                        label='Date'
                        name={`dates.${index}.date`}
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
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: { value: '' },
                      date: new Date(new Date().setHours(0, 0, 0, 0))
                    })
                  }}
                  variant='outlined'
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
          tooltip={`Process which generated a given ${selfString}.`}
        />

        <CustomTextField label='Produced By' name='producedBy' />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Is About *'
          tooltip={`Entities (biological entity, taxonomic information, disease, molecular entity, anatomical part, treatment) associated with this ${selfString}. You must provide a species, and other entities are optional.`}
        />

        <FieldArray name='isAbout'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.isAbout.map((isAbout, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`isAbout_${index}`}
                    name={`isAbout_${index}`}
                  >
                    <CustomRadioGroup
                      label='Type'
                      name={`isAbout.${index}.type`}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label='Species'
                        value='Species'
                      />

                      <FormControlLabel
                        control={<Radio />}
                        label='Other Entity'
                        value='Other Entity'
                      />
                    </CustomRadioGroup>

                    {isAbout.type === 'Species' ? (
                      <Section>
                        <CustomSelectField
                          label='Species Name'
                          name={`isAbout.${index}.name`}
                          required
                        >
                          <MenuItem value='Homo sapiens'>Homo Sapiens</MenuItem>

                          <MenuItem value='Mus musculus'>Mus musculus</MenuItem>

                          <MenuItem value='Callithrix jacchus'>
                            Callithrix jacchus
                          </MenuItem>

                          <MenuItem value='Ondatra zibethicus'>
                            Ondatra zibethicus
                          </MenuItem>

                          <MenuItem value='Macaca mulatta'>
                            Macaca mulatta
                          </MenuItem>
                        </CustomSelectField>
                      </Section>
                    ) : (
                      <Section>
                        <CustomTextField
                          label='Name'
                          name={`isAbout.${index}.name`}
                        />
                      </Section>
                    )}
                  </FieldGroup>
                )
              })}

              <Box py={1}>
                <Button
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({ type: 'Species' })
                  }}
                  variant='outlined'
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
          tooltip={`Grant(s) which funded and supported the work reported by the ${selfString}.`}
        />

        <FieldArray name='acknowledges'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.acknowledges.map((s, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`acknowledges_${index}`}
                    name={`acknowledges_${index}`}
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
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      name: '',
                      abbreviation: ''
                    })
                  }}
                  variant='outlined'
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
          tooltip={`The geographical extension and span (i.e.: city, province, administrative region, ...) covered by the ${selfString}.`}
        />

        <FieldArray name='spatialCoverage'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.spatialCoverage.map((s, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`spatialCoverage_${index}`}
                    name={`spatialCoverage_${index}`}
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
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      name: '',
                      description: ''
                    })
                  }}
                  variant='outlined'
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
          tooltip={`In submitting this ${selfString} for inclusion, I declare that *`}
        />

        <CustomSelectField
          label='Select a statement *'
          name='reb_info'
          style={{
            minWidth: 200,
            maxWidth: 700
          }}
        >
          <MenuItem
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'unset',
              maxWidth: 700
            }}
            value='option_1'
          >
            Participants have provided a valid informed consent to the
            de-identification and deposit of their data in an open-access
            portal.
          </MenuItem>

          <MenuItem
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'unset',
              maxWidth: 700
            }}
            value='option_2'
          >
            A waiver or other authorization to deposit these de-identified data
            in an open-access portal was obtained from a research ethics body
            (REB, IRB, REC, etc.).
          </MenuItem>

          <MenuItem
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'unset',
              maxWidth: 700
            }}
            value='option_3'
          >
            Local law or a relevant institutional authorization otherwise
            enables the deposit of these data in an open-access portal.
          </MenuItem>

          <MenuItem
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'unset',
              maxWidth: 700
            }}
            value='option_4'
          >
            These data are not derived from human participants.
          </MenuItem>
        </CustomSelectField>

        <CustomTextField
          label='Ethics committee approval number'
          name='reb_number'
        />
      </Section>
    </React.Fragment>
  )
}
