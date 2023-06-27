import React from 'react'
import { Grid, Button, MenuItem, Divider, Box } from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import TextSection from '../../fields/TextSection'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function DistributionForm(props) {
  const { values, isExperiment } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  return (
    <React.Fragment>
      <Section>
        <SectionTitle
          name='Formats *'
          tooltip={`The technical format of the ${selfString} distribution. Use the file extension or MIME type when possible. (Definition adapted from DataCite).`}
        />

        <FieldArray name='formats'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.formats.map((format, index) => {
                return (
                  <FieldGroup
                    arrayHelpers={arrayHelpers}
                    index={index}
                    key={`format_${index}`}
                    name={`format_${index}`}
                  >
                    <CustomTextField
                      fullWidth
                      label='Format'
                      name={`formats.${index}`}
                      required
                    />
                  </FieldGroup>
                )
              })}

              <Grid item xs={6}>
                <Button
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push('')
                  }}
                  variant='outlined'
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
          tooltip={`The quantity of space required on disk (or other medium) for this ${selfString}.`}
        />

        <CustomTextField label='Size' name='size.value' required />

        <SectionTitle
          name='Units *'
          subsection
          tooltip='Unit in which the size is measured.(KB -> KiloByte, MB -> MegaByte, GB -> GigaByte, TB -> TeraByte and PB -> PetaByte).'
        />

        <CustomSelectField label='Units' name='size.units' required>
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
          tooltip={`The information about access modality for the ${selfString} distribution.`}
        />

        <SectionTitle
          name='Landing Page *'
          subsection
          tooltip={`A URL (Web page) that contains information about the associated ${selfString} (with a link to the ${selfString}) or a direct link to the ${selfString} itself. When none exists yet, please provide the link to the README.md file of the ${selfString}.`}
        />

        <CustomTextField
          label='Landing Page'
          name='access.landingPage'
          required
        />

        <SectionTitle
          name='Authorizations *'
          subsection
          tooltip='This must be one of "Public", "Registered" or "Private". When this field is absent the value will be treated as "Public". "Public" = available to anyone; "Registered" = available to user authorized by the creator; "Private" = available only to the creator.'
        />

        <CustomSelectField
          label='Authorization'
          name='access.authorization'
          required
        >
          <MenuItem value='public'>Public</MenuItem>

          <MenuItem value='registered'>Registered</MenuItem>

          <MenuItem value='private'>Private</MenuItem>
        </CustomSelectField>
      </Section>

      <Divider variant='middle' />

      <TextSection
        isExperiment={isExperiment}
        isRequired
        nameAttr='files'
        values={fieldDescriptions.files}
      />

      <Divider variant='middle' />

      <TextSection
        isExperiment={isExperiment}
        isRequired
        nameAttr='subjects'
        values={fieldDescriptions.subjects}
      />

      <Divider variant='middle' />

      <Section>
        <SectionTitle
          name='CONP Status *'
          tooltip={`The CONP status is used to add the CONP logo or Canadian flag on the left of the ${selfString} and sorting in the data search. Valid values are "CONP" = created using funding from the CONP; "Canadian" = created in Canada without CONP funding; "external" = created outside of Canada.`}
        />

        <CustomSelectField label='CONP Status *' name='conpStatus' required>
          <MenuItem value='CONP'>CONP</MenuItem>

          <MenuItem value='Canadian'>Canadian</MenuItem>

          <MenuItem value='external'>External</MenuItem>
        </CustomSelectField>
      </Section>
    </React.Fragment>
  )
}
