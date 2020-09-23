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
          tooltip='The formats included in the dataset'
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
        <SectionTitle name='Size' tooltip='Size of the Dataset' />
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
        <SectionTitle name='Access' tooltip='How to access the dataset' />
        <CustomTextField label='Landing Page' name='access.landingPage' />
        <CustomSelectField label='Authorization' name='access.authorization'>
          <MenuItem value='public'>Public</MenuItem>
          <MenuItem value='registered'>Registered</MenuItem>
          <MenuItem value='private'>Private</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Privacy' tooltip='Dataset Privacy' />
        <CustomSelectField name='privacy' label='Privacy'>
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
