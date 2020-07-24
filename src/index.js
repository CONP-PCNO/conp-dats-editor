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

import * as yup from 'yup'

import { makeStyles } from '@material-ui/core/styles'

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
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
              description: '',
              types: [],
              version: '',
              license: '',
              keywords: [],
              formats: [],
              size: {
                value: '',
                units: 'mb'
              },
              authorizations: 'public'
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true)
              // make async call
              console.log('submit: ', data)
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
                    License
                  </Typography>
                  <CustomTextField
                    fullWidth
                    placeholder='License'
                    name='license'
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
                    Access
                  </Typography>
                  <CustomSelectField name='authorizations' label='Access'>
                    <MenuItem value='public'>Public</MenuItem>
                    <MenuItem value='registered'>Registered</MenuItem>
                    <MenuItem value='private'>Private</MenuItem>
                  </CustomSelectField>
                </Grid>
                <div>
                  <Button disabled={isSubmitting} type='submit'>
                    submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </React.Fragment>
  )
}
