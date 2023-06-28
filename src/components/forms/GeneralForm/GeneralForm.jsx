import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import FieldArraySection from '../../layout/FieldArraySection'
import JsonOtherSelectField from '../../fields/JsonOtherSelectField'
import JsonSelectField from '../../fields/JsonSelectField'
import JsonTextField from '../../fields/JsonTextField'
import CreatorsField from '../../fields/CreatorsField'
import SingleFieldSection from '../../layout/SingleFieldSection'
import fieldDescriptions from '../../../model/fieldDescriptions.json'

export default function GeneralForm(props) {
  const { values, isExperiment } = props
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
        setupProps={fieldDescriptions.title}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={CreatorsField}
        nameAttr='creators'
        setupProps={fieldDescriptions.creators}
        values={values.creators}
      />

      <Divider variant='middle' />

      <SingleFieldSection
        fullWidth
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        multiline
        nameAttr='description'
        rows={4}
        setupProps={fieldDescriptions.description}
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

      <SingleFieldSection
        fullWidth
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='version'
        setupProps={fieldDescriptions.version}
      />

      <Divider variant='middle' />

      <SingleFieldSection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonSelectField}
        nameAttr='privacy'
        setupProps={fieldDescriptions.privacy}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonOtherSelectField}
        nameAttr='licenses'
        setupProps={fieldDescriptions.licenses}
        values={values.licenses}
      />

      <Divider variant='middle' />

      <FieldArraySection
        isExperiment={isExperiment}
        isRequired
        jsonField={JsonTextField}
        nameAttr='keywords'
        setupProps={fieldDescriptions.keywords}
        values={values.keywords}
      />
    </React.Fragment>
  )
}
