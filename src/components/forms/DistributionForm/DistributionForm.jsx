import React from 'react'
import { MenuItem, Divider } from '@material-ui/core'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import SelectSection from '../../fields/SelectSection'
import TextSection from '../../fields/TextSection'
import TextArraySection from '../../layout/TextArraySection'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function DistributionForm(props) {
  const { values, isExperiment } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  return (
    <React.Fragment>
      <TextArraySection
        isExperiment={isExperiment}
        isRequired
        nameAttr='formats'
        setupProps={fieldDescriptions.formats}
        values={values.formats}
      />

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

      <SelectSection
        isExperiment={isExperiment}
        isRequired
        nameAttr='conpStatus'
        values={fieldDescriptions.conpStatus}
      />
    </React.Fragment>
  )
}
