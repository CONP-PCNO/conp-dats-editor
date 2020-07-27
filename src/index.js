import React from 'react'
import { Formik, Field, Form, FieldArray, useField } from 'formik'
import {
  TextField,
  Button,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'

import * as yup from 'yup'

import DATS from './model/dats'

const validationSchema = yup.object({
  title: yup.string().required().max(10),
  creators: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
})

const CustomTextField = ({ ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      variant='outlined'
    />
  )
}

const CustomSelectField = ({ ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <FormControl variant='outlined'>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} {...field} helperText={errorText} error={!!errorText}>
        {props.children}
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

export const DatsCreatorGui = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Create DATS.json
          </Typography>
          <Formik
            validateOnChange
            initialValues={{
              title: '',
              creator: {
                type: 'contributor',
                name: ''
              },
              creators: [],
              contact: {
                name: '',
                email: ''
              },
              description: '',
              types: [],
              version: '',
              licenses: [],
              keywords: [],
              formats: [],
              size: {
                value: '',
                units: 'mb'
              },
              privacy: 'public',
              files: '',
              subjects: '',
              conpStatus: '',
              derivedFrom: '',
              parentDatasetId: '',
              primaryPublications: [],
              dimensions: [],
              identifier: {
                name: '',
                source: ''
              },
              logo: '',
              dates: [],
              citations: [],
              producedBy: '',
              isAbout: [],
              hasPart: '',
              acknowledges: '',
              refinement: '',
              aggregation: '',
              spatialCoverage: []
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true)
              // make async call
              const dats = new DATS(data)
              console.log('submit: ', dats.getJson())
              setSubmitting(false)
            }}
          >
            {({ values, errors, isSubmitting, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Typography variant='h5' gutterBottom>
                    General Information
                  </Typography>
                  <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>
                      Title
                    </Typography>
                    <CustomTextField
                      fullWidth
                      placeholder='Title'
                      name='title'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' gutterBottom>
                      Creators
                    </Typography>
                    <FieldArray name='creators'>
                      {(arrayHelpers) => (
                        <Grid container item spacing={3} xs={12}>
                          <Grid item xs={6}>
                            <CustomTextField
                              fullWidth
                              placeholder='Name'
                              name='creator.name'
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <CustomSelectField name='creator.type' label='Role'>
                              <MenuItem value='pi'>PI</MenuItem>
                              <MenuItem value='contributor'>
                                Contributor
                              </MenuItem>
                            </CustomSelectField>
                          </Grid>
                          <Grid item xs={3}>
                            <Button
                              onClick={() => {
                                arrayHelpers.push({
                                  type: values.creator.type,
                                  name: values.creator.name,
                                  id: '' + Math.random()
                                })
                                setFieldValue({
                                  creator: {
                                    type: 'contributor',
                                    name: ''
                                  }
                                })
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
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Description
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Description'
                    name='description'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Types
                  </Typography>
                  <FieldArray name='types'>
                    {(arrayHelpers) => (
                      <Grid container item spacing={3} xs={12}>
                        <Grid item xs={9}>
                          <CustomTextField
                            fullWidth
                            placeholder='Type'
                            name='type'
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={() => {
                              arrayHelpers.push(values.type)
                              setFieldValue({
                                type: ''
                              })
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
                  <Typography variant='h6' gutterBottom>
                    Version
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Version'
                    name='version'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Licenses
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Licenses'
                    name='licenses'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Keywords
                  </Typography>
                  <FieldArray name='keywords'>
                    {(arrayHelpers) => (
                      <Grid container item spacing={3} xs={12}>
                        <Grid item xs={9}>
                          <CustomTextField
                            fullWidth
                            placeholder='Keyword'
                            name='keyword'
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={() => {
                              arrayHelpers.push(values.keyword)
                              setFieldValue({
                                type: ''
                              })
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
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Formats
                  </Typography>
                  <FieldArray name='formats'>
                    {(arrayHelpers) => (
                      <Grid container item spacing={3} xs={12}>
                        <Grid item xs={9}>
                          <CustomTextField
                            fullWidth
                            placeholder='Format'
                            name='format'
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={() => {
                              arrayHelpers.push(values.format)
                              setFieldValue({
                                type: ''
                              })
                            }}
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item>
                          {values.formats.map((format, index) => {
                            return (
                              <Chip
                                key={'' + Math.random()}
                                label={format}
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
                  <Typography variant='h6' gutterBottom>
                    Size
                  </Typography>
                  <Grid container item spacing={3} xs={12}>
                    <Grid item xs={9}>
                      <CustomTextField
                        fullWidth
                        placeholder='Size'
                        name='size.value'
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <CustomSelectField name='size.units' label='Units'>
                        <MenuItem value='mb'>MB</MenuItem>
                        <MenuItem value='gb'>GB</MenuItem>
                        <MenuItem value='tb'>TB</MenuItem>
                        <MenuItem value='pb'>PB</MenuItem>
                      </CustomSelectField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Landing Page
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Landing Page'
                    name='landingPage'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Privacy
                  </Typography>
                  <CustomSelectField name='privacy' label='Privacy'>
                    <MenuItem value='public'>Public</MenuItem>
                    <MenuItem value='registered'>Registered</MenuItem>
                    <MenuItem value='private'>Private</MenuItem>
                  </CustomSelectField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Files
                  </Typography>
                  <CustomTextField fullWidth placeholder='Files' name='files' />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Subjects
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Subjects'
                    name='subjects'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    CONP status
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='CONP status'
                    name='conpStatus'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Derived From
                  </Typography>
                  <Grid container item spacing={3} xs={12}>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Derived From'
                        name='derivedFrom'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Parent dataset id'
                        name='parentDatasetId'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Primary Publications
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Primary Publications'
                    name='primaryPublications'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Dimensions
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Dimensions'
                    name='dimensions'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Identifier
                  </Typography>
                  <Grid container item spacing={3} xs={12}>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Identifier'
                        name='identifier.name'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Source'
                        name='identifier.source'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Contact
                  </Typography>
                  <Grid container item spacing={3} xs={12}>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Name'
                        name='contact.name'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Email'
                        name='contact.email'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Logo
                  </Typography>
                  <CustomTextField fullWidth placeholder='Logo' name='logo' />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Dates
                  </Typography>
                  <Grid container item spacing={3} xs={12}>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Date'
                        name='date.date'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        placeholder='Description'
                        name='date.description'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Citations
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Citations'
                    name='citations'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Produced by
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Produced By'
                    name='producedBy'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Is About
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Is About'
                    name='isAbout'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Has Part
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Has Part'
                    name='hasPart'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Acknowledges
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Acknowledges'
                    name='acknowledges'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Refinement
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Refinement'
                    name='refinement'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Aggregation
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Aggregation'
                    name='aggregation'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Spatial Coverage
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='Spatial Coverage'
                    name='spatialCoverage'
                  />
                </Grid>
                <div>
                  <Button disabled={isSubmitting} type='submit'>
                    submit
                  </Button>
                </div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </React.Fragment>
  )
}
