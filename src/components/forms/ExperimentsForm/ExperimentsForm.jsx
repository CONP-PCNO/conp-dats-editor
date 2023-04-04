import React from 'react'
import { Typography, Divider, FormControlLabel } from '@material-ui/core'
import { Checkbox } from 'formik-material-ui'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import CustomCheckbox from '../../fields/CustomCheckbox'

export default function ExperimentsForm(props) {
  const { values } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        Experiment Information
      </Typography>
      <Section>
        <SectionTitle name='Functions assessed' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Features' tooltip='' />
        <CustomCheckbox name='features' label='features'>
          <FormControlLabel
            control={<Checkbox checked={false} name='repeatability' />}
            label='Repeatability'
          />
          <FormControlLabel
            control={<Checkbox checked={false} name='multilingual' />}
            label='Multilingual'
          />
        </CustomCheckbox>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Languages' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Validation' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Accessibility' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Platforms' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Devices' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Software' tooltip='' />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Requirements' tooltip='' />
      </Section>
    </React.Fragment>
  )
}
