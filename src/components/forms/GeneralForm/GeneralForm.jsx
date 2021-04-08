import React from 'react'
import {
  Typography,
  Button,
  MenuItem,
  ListSubheader,
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
        <SectionTitle
          name='Title *'
          tooltip='Name of the dataset. The title needs to be short and easily recognizable and searchable. If there is an acronym, please also provide the long name.'
        />
        <CustomTextField required fullWidth name='title' label='Title' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Creators *'
          tooltip='The person(s) or organization(s) that contributed to the creation of the dataset. This can be the principal investigator, hospital, university, centre, clinic, etc. The first contact provided will be associated as the main contact for this dataset.'
        />
        <FieldArray name='creators'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.creators.map((creator, index) => {
                return (
                  <FieldGroup
                    key={'creator_' + index}
                    name={'creator_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomRadioGroup
                      name={`creators.${index}.type`}
                      label='Type'
                    >
                      <FormControlLabel
                        value='Person'
                        control={<Radio />}
                        label='Person'
                      />
                      <FormControlLabel
                        value='Organization'
                        control={<Radio />}
                        label='Organization'
                      />
                    </CustomRadioGroup>
                    {creator.type === 'Organization' ? (
                      <Section>
                        <CustomTextField
                          required
                          label='Name/Institution'
                          name={`creators.${index}.name`}
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
                        />
                        <CustomTextField
                          label='First Name'
                          name={`creators.${index}.firstName`}
                        />
                        <CustomTextField
                          label='Middle Initial'
                          name={`creators.${index}.middleInitial`}
                        />
                        <CustomTextField
                          fullWidth
                          label='Last Name'
                          name={`creators.${index}.lastName`}
                        />
                        <CustomTextField
                          label='Email'
                          name={`creators.${index}.email`}
                        />
                        <FieldArray name={`creators.${index}.affiliations`}>
                          {(arrayHelpers) => (
                            <Section subsection>
                              <SectionTitle
                                subsection
                                name='Affiliations'
                                tooltip='Creator affiliations'
                              />
                              {(values.creators[index]?.affiliations || []).map(
                                (affiliation, i) => {
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
                                        name={`creators.${index}.affiliations.${i}.name`}
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
                                    arrayHelpers.push('')
                                  }}
                                >
                                  {(values.creators[index]?.affiliations || [])
                                    .length > 0
                                    ? 'Add another Affiliation'
                                    : 'Add an Affiliation'}
                                </Button>
                              </Box>
                            </Section>
                          )}
                        </FieldArray>
                      </Section>
                    )}
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
                      type: 'Organization'
                    })
                  }}
                >
                  {values.creators.length > 0
                    ? 'Add another Creator'
                    : 'Add a Creator'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Description *'
          tooltip='A short paragraph providing a rapid overview of the dataset and the context of data collection. Suggestion of items to include in the description (if applicable): main use of the dataset, population studied, study design, sample size, data collected, methods, techniques, apparatus used to generate the data. Ideally, the first sentence of the description should give a good overall description of the dataset.'
        />
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
          name='Data Types *'
          tooltip='Terms to describe the nature of the data. Data type can be single or multiple. Add a term with the <a href="https://neuinfo.org/interlex/dashboard" rel="noreferrer" target="_blank">interlex URI</a> if possible.'
        />
        <FieldArray name='types'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.types.map((type, index) => {
                return (
                  <FieldGroup
                    key={'type' + index}
                    name={'type' + index}
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
                  {values.types.length > 0 ? 'Add another Type' : 'Add a Type'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Version *'
          tooltip='Provide the version number, or the release point of your dataset. If you do not have an existing versioning convention, we recommend the use of the following versoning convention: 1.0=original dataset; 1.1=minor revisions made to the dataset; 1.2=further minor revisions; 2.0=major/substantive changes to the dataset. For example: minor changes could include corrupted file or link fixes, more description/documentation of the dataset and so on; Major changes would include additional data released (more subjects, more modalities and so on)'
        />
        <CustomTextField required label='Version' name='version' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Privacy'
          tooltip='A qualifier to describe the data protection applied to the dataset. This is relevant for clinical data.
                     <ul>
                       <li><i><strong>open</strong>: freely and publicly available</i></li>
                       <li><i><strong>registered</strong>: available to bona fide researchers/clinical care professionals only</i></li>
                       <li><i><strong>controlled</strong>: available to qualified researchers approved by a committee after review of their research proposal; also known as managed or restricted access</i></li>
                       <li><i><strong>private</strong>: available only to researchers of the project; also known as closed</i></li>
                     </ul>'
        />
        <CustomSelectField label='Privacy' name='privacy'>
              <MenuItem value='open'>open</MenuItem>
              <MenuItem value='registered'>registered</MenuItem>
              <MenuItem value='controlled'>controlled</MenuItem>
              <MenuItem value='private'>private</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Licenses *'
          tooltip='The licences under which this dataset is shared.'
        />
        <FieldArray name='licenses'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.licenses.map((license, index) => {
                return (
                  <FieldGroup
                    key={'license_' + index}
                    name={'license_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomSelectField
                      required
                      label='License *'
                      name={`licenses.${index}.value`}
                    >
                      <ListSubheader>Creative Commons</ListSubheader>
                      <MenuItem value='CC BY'>CC BY</MenuItem>
                      <MenuItem value='CC BY-SA'>CC BY-SA</MenuItem>
                      <MenuItem value='CC BY-NC'>CC BY-NC</MenuItem>
                      <MenuItem value='CC BY-NC-SA'>CC BY-NC-SA</MenuItem>
                      <MenuItem value='CC BY-ND'>CC BY-ND</MenuItem>
                      <MenuItem value='CC BY-NC-ND'>CC BY-NC-ND</MenuItem>
                      <MenuItem value='CC0'>CC0</MenuItem>
                      <ListSubheader>Open Data Commons</ListSubheader>
                      <MenuItem value='ODbL'>ODbL</MenuItem>
                      <MenuItem value='ODC-By'>ODC-By</MenuItem>
                      <MenuItem value='PDDL'>PDDL</MenuItem>
                      <ListSubheader>Other</ListSubheader>
                      <MenuItem value='other'>Other (Please Specify)</MenuItem>
                    </CustomSelectField>
                    {license.value === 'other' ? (
                      <CustomTextField
                        label='License'
                        name={`licenses.${index}.valueOther`}
                      />
                    ) : null}
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
                  {values.licenses.length > 0
                    ? 'Add another License'
                    : 'Add a License'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Keywords *'
          tooltip='Tags associated with the dataset, which will help in its discovery. These should be well known terms by the research community.'
        />
        <FieldArray name='keywords'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.keywords.map((keyword, index) => {
                return (
                  <FieldGroup
                    key={'keyword_' + index}
                    name={'keyword_' + index}
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
                  {values.keywords.length > 0
                    ? 'Add another Keyword'
                    : 'Add a Keyword'}
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
    </React.Fragment>
  )
}
