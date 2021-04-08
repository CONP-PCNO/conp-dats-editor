import React from 'react'
import { Grid, Button, MenuItem, Divider, Box } from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'

export default function DistributionForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Section>
        <SectionTitle
          name='Formats *'
          tooltip='The technical format of the dataset distribution. Use the file extension or MIME type when possible. (Definition adapted from DataCite).'
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
                  {values.formats.length > 0
                    ? 'Add another Format'
                    : 'Add a Format'}
                </Button>
              </Grid>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Size *'
          tooltip='The quantity of space required on disk (or other medium) for this dataset.'
        />
        <CustomTextField required label='Size' name='size.value' />
        <SectionTitle
          subsection
          name='Units *'
          tooltip='Unit in which the size is measured.(KB -> KiloByte, MB -> MegaByte, GB -> GigaByte, TB -> TeraByte and PB -> PetaByte).'
        />
        <CustomSelectField required name='size.units' label='Units'>
          <MenuItem value='MB'>MB</MenuItem>
          <MenuItem value='GB'>GB</MenuItem>
          <MenuItem value='TB'>TB</MenuItem>
          <MenuItem value='PB'>PB</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Access *'
          tooltip='The information about access modality for the dataset distribution.'
        />
        <SectionTitle
          subsection
          name='Landing Page *'
          tooltip='A URL (Web page) that contains information about the associated dataset (with a link to the dataset) or a direct link to the dataset itself. When none exists yet, please provide the link to the README.md file of the dataset.'
        />
        <CustomTextField required label='Landing Page' name='access.landingPage' />
        <SectionTitle
          subsection
          name='Authorizations *'
          tooltip='This must be one of "Public", "Registered" or "Private". When this field is absent the value will be treated as "Public". "Public" = available to anyone; "Registered" = available to user authorized by the creator; "Private" = available only to the creator.'
        />
        <CustomSelectField required label='Authorization' name='access.authorization'>
          <MenuItem value='public'>Public</MenuItem>
          <MenuItem value='registered'>Registered</MenuItem>
          <MenuItem value='private'>Private</MenuItem>
        </CustomSelectField>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Number of Files *'
          tooltip='Total number of files in the dataset.'
        />
        <CustomTextField required label='Files' name='files' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Number of Subjects *'
          tooltip='Total number of subjects constituting the dataset.'
        />
        <CustomTextField required label='Subjects' name='subjects' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='CONP Status *'
          tooltip='The CONP status is used to add the CONP logo or Canadian flag on the left of the dataset and sorting in the data search. Valid values are "CONP" = created using funding from the CONP; "Canadian" = created in Canada without CONP funding; "external" = created outside of Canada.'
        />
        <CustomSelectField required name='conpStatus' label='CONP Status'>
          <MenuItem value='CONP'>CONP</MenuItem>
          <MenuItem value='Canadian'>Canadian</MenuItem>
          <MenuItem value='external'>External</MenuItem>
        </CustomSelectField>
      </Section>
    </React.Fragment>
  )
}
