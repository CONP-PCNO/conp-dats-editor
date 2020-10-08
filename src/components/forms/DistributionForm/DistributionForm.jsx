import React from 'react'
import { Grid, Button, MenuItem, Divider, Box } from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'

export default function GeneralForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Section>
        <SectionTitle
          name='Formats'
          tooltip='The technical format of the dataset distribution. Use the file extension or MIME type when possible. (Definition adapted from DataCite)'
        />
        <FieldArray name='formats'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.formats.map((format, index) => {
                return (
                  <FieldGroup
                    key={'format_' + index}
                    name={'format_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      fullWidth
                      label='Format'
                      name={`formats.${index}`}
                    />
                  </FieldGroup>
                )
              })}
              <Grid item xs={6}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push('')
                  }}
                >
                  Add another Format
                </Button>
              </Grid>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Size' tooltip='The size of the dataset.' />
        <CustomTextField label='Size' name='size.value' />
        <CustomSelectField name='size.units' label='Units'>
          <MenuItem value='MB'>MB</MenuItem>
          <MenuItem value='GB'>GB</MenuItem>
          <MenuItem value='TB'>TB</MenuItem>
          <MenuItem value='PB'>PB</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Access'
          tooltip='The information about access modality for the dataset distribution.'
        />
        <SectionTitle
          name='Landing Page'
          tooltip='A web page that contains information about the associated dataset or other research object and a direct link to the object itself.'
        />
        <CustomTextField label='Landing Page' name='access.landingPage' />
        <SectionTitle
          name='Authorizations'
          tooltip='Types of verification that accessing the resource is allowed. Authorization occurs before successful authentication and refers to the process of obtaining approval to use a data set. Ideally specified from a controlled vocabulary or ontology.'
        />
        <CustomSelectField label='Authorization' name='access.authorization'>
          <MenuItem value='public'>Public</MenuItem>
          <MenuItem value='registered'>Registered</MenuItem>
          <MenuItem value='private'>Private</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Number of Files'
          tooltip='The number of files in the dataset'
        />
        <CustomTextField label='Files' name='files' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Number of Subjects'
          tooltip='The number of subjects in the dataset'
        />
        <CustomTextField label='Subjects' name='subjects' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='CONP Status' tooltip='CONP Status' />
        <CustomSelectField name='conpStatus' label='CONP Status'>
          <MenuItem value='CONP'>CONP</MenuItem>
          <MenuItem value='Canadian'>Canadian</MenuItem>
          <MenuItem value='external'>External</MenuItem>
        </CustomSelectField>
      </Section>
    </React.Fragment>
  )
}
