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
  const { values, isExperiment } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  return (
    <React.Fragment>
      <Typography gutterBottom variant='h5'>
        General Information
      </Typography>

      <Section>
        <SectionTitle
          name='Title *'
          tooltip={`Name of the ${selfString}. The title needs to be short and easily recognizable and searchable. If there is an acronym, please also provide the long name.`}
        />

        <CustomTextField fullWidth label='Title' name='title' required />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Creators *'
          tooltip={`The person(s) or organization(s) that contributed to the creation of the ${selfString}. This can be the principal investigator, hospital, university, centre, clinic, etc. The first contact provided will be associated as the main contact for this ${selfString}.`}
        />

        <FieldArray name='creators'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.creators.map((creator, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`creator_${index}`}
                    name={`creator_${index}`}
                  >
                    <CustomRadioGroup
                      label='Type'
                      name={`creators.${index}.type`}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label='Person'
                        value='Person'
                      />

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

                        <CustomTextField
                          label='Email'
                          name={`creators.${index}.email`}
                        />

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
                      label='Role'
                      name={`creators.${index}.role`}
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
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: 'Organization'
                    })
                  }}
                  variant='outlined'
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
          tooltip={`A short paragraph providing a rapid overview of the ${selfString} and the context of data collection. Suggestion of items to include in the description (if applicable): main use of the ${selfString}, population studied, study design, sample size, data collected, methods, techniques, apparatus used to generate the data. Ideally, the first sentence of the description should give a good overall description of the ${selfString}.`}
        />

        <CustomTextField
          fullWidth
          label='Description'
          multiline
          name='description'
          required
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
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`type${index}`}
                    name={`type${index}`}
                  >
                    <CustomTextField
                      label='Type'
                      name={`types.${index}`}
                      required
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
          tooltip={`Provide the version number, or the release point of your ${selfString}. If you do not have an existing versioning convention, we recommend the use of the following versoning convention: 1.0=original ${selfString}; 1.1=minor revisions made to the ${selfString}; 1.2=further minor revisions; 2.0=major/substantive changes to the ${selfString}. For example: minor changes could include corrupted file or link fixes, more description/documentation of the ${selfString} and so on; Major changes would include additional data released (more subjects, more modalities and so on)`}
        />

        <CustomTextField label='Version' name='version' required />
      </Section>

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='Privacy *'
          tooltip={`A qualifier to describe the data protection applied to the ${selfString}. This is relevant for clinical data.
                     <ul>
                       <li><i><strong>open</strong>: freely and publicly available</i></li>
                       <li><i><strong>registered</strong>: available to bona fide researchers/clinical care professionals only</i></li>
                       <li><i><strong>controlled</strong>: available to qualified researchers approved by a committee after review of their research proposal; also known as managed or restricted access</i></li>
                       <li><i><strong>private</strong>: available only to researchers of the project; also known as closed</i></li>
                     </ul>`}
        />

        <CustomSelectField label='Privacy *' name='privacy'>
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
          tooltip={`The licences under which this ${selfString} is shared.`}
        />

        <FieldArray name='licenses'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.licenses.map((license, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`license_${index}`}
                    name={`license_${index}`}
                  >
                    <CustomSelectField
                      label='License *'
                      name={`licenses.${index}.value`}
                      required
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
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: 'creativeCommons',
                      value: ''
                    })
                  }}
                  variant='outlined'
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
          tooltip={`Tags associated with the ${selfString}, which will help in its discovery. These should be well known terms by the research community.`}
        />

        <FieldArray name='keywords'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.keywords.map((keyword, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`keyword_${index}`}
                    name={`keyword_${index}`}
                  >
                    <CustomTextField
                      label='Keyword'
                      name={`keywords.${index}`}
                      required
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
