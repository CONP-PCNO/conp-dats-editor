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
import FieldArraySection from '../../layout/MultiFieldSection'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import SelectSection from '../../fields/SelectSection'
import JsonTextField from '../../fields/JsonTextField'
import TextSection from '../../fields/TextSection'
import SingleFieldSection from '../../layout/SingleFieldSection'
import TextArraySection from '../../layout/TextArraySection'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function GeneralForm(props) {
  const { values, isExperiment } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
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
        values={fieldDescriptions.title}
      />

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

      <TextSection
        isExperiment={isExperiment}
        isRequired
        multiline
        nameAttr='description'
        rows={4}
        values={fieldDescriptions.description}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='types'
        setupProps={fieldDescriptions.types}
        values={values.types}
      />

      <Divider variant='middle' />

      <TextSection
        isExperiment={isExperiment}
        isRequired
        nameAttr='version'
        values={fieldDescriptions.version}
      />

      <Divider variant='middle' />

      <SelectSection
        isExperiment={isExperiment}
        isRequired
        nameAttr='privacy'
        values={fieldDescriptions.privacy}
      />

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

      <TextArraySection
        isExperiment={isExperiment}
        nameAttr='keywords'
        setupProps={fieldDescriptions.keywords}
        values={values.keywords}
      />
    </React.Fragment>
  )
}
