import React from 'react'
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Chip,
  Tooltip
} from '@material-ui/core'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import InfoIcon from '@material-ui/icons/Info'

export default function GeneralForm(props) {
  const { values, setFieldValue, setTouched } = props
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Typography variant='h5' gutterBottom>
          General Information
        </Typography>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Title
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Title of the Dataset' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <CustomTextField
            required
            fullWidth
            name='title'
            label='Dataset Title'
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Creators
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Dataset Contributors' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <FieldArray name='creators'>
            {(arrayHelpers) => (
              <Grid container item spacing={3} xs={12}>
                <Grid item xs={6}>
                  <CustomTextField
                    required
                    fullWidth
                    label='Name/Institution'
                    name='creator.name'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    fullWidth
                    label='Email'
                    name='creator.email'
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomSelectField name='creator.type' label='Role' required>
                    <MenuItem value='pi'>PI</MenuItem>
                    <MenuItem value='contributor'>Contributor</MenuItem>
                  </CustomSelectField>
                </Grid>
                <Grid container item xs={3} justify='center'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      arrayHelpers.push({
                        type: values.creator.type,
                        name: values.creator.name,
                        id: '' + Math.random()
                      })
                      setFieldValue('creator', {
                        type: 'contributor',
                        name: '',
                        email: ''
                      })
                      setTouched({ creator: false })
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  {values.creators.map((creator, index) => {
                    return (
                      <Chip
                        key={creator.id}
                        label={creator.name}
                        onDelete={() => arrayHelpers.remove(index)}
                        color='primary'
                      />
                    )
                  })}
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Description
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Description of the Dataset' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <CustomTextField
            required
            fullWidth
            label='Description'
            name='description'
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Types
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Types' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <FieldArray name='types'>
            {(arrayHelpers) => (
              <Grid container item spacing={3} xs={12}>
                <Grid item xs={9}>
                  <CustomTextField
                    required
                    fullWidth
                    label='Type'
                    name='type'
                  />
                </Grid>
                <Grid container item xs={3} justify='center'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      arrayHelpers.push(values.type)
                      setFieldValue('type', '')
                      setTouched({ type: false })
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  {values.types.map((type, index) => {
                    return (
                      <Chip
                        key={'' + Math.random()}
                        label={type}
                        onDelete={() => arrayHelpers.remove(index)}
                        color='primary'
                      />
                    )
                  })}
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Version
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Version number of the dataset' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <CustomTextField fullWidth label='Version' name='version' />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Licenses
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Dataset Licenses' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <FieldArray name='licenses'>
            {(arrayHelpers) => (
              <Grid container item spacing={3} xs={12}>
                <Grid item xs={9}>
                  <CustomTextField
                    required
                    fullWidth
                    label='License'
                    name='license'
                  />
                </Grid>
                <Grid container item xs={3} justify='center'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      arrayHelpers.push(values.license)
                      setFieldValue('license', false)
                      setTouched({ license: false })
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  {values.licenses.map((license, index) => {
                    return (
                      <Chip
                        key={'' + Math.random()}
                        label={license}
                        onDelete={() => arrayHelpers.remove(index)}
                        color='primary'
                      />
                    )
                  })}
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Keywords
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Dataset Keywords' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <FieldArray name='keywords'>
            {(arrayHelpers) => (
              <Grid container item spacing={3} xs={12}>
                <Grid item xs={9}>
                  <CustomTextField
                    required
                    fullWidth
                    label='Keyword'
                    name='keyword'
                  />
                </Grid>
                <Grid container item xs={3} justify='center'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      arrayHelpers.push(values.keyword)
                      setFieldValue('keyword', '')
                      setTouched({ keyword: false })
                    }}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  {values.keywords.map((keyword, index) => {
                    return (
                      <Chip
                        key={'' + Math.random()}
                        label={keyword}
                        onDelete={() => arrayHelpers.remove(index)}
                        color='primary'
                      />
                    )
                  })}
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
