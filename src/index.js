import React from 'react'
import { Formik, Field, Form, FieldArray } from 'formik'
import {
  TextField,
  Button,
  Checkbox,
  Select,
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
              description: '',
              types: [],
              license: '',
              keywords: [],
              creator: {
                type: 'contributor',
                name: ''
              },
              creators: [
                {
                  type: 'contributor',
                  name: '',
                  id: '' + Math.random()
                }
              ]
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
                    <Field
                      fullWidth
                      placeholder='Title'
                      name='title'
                      type='input'
                      as={TextField}
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
                            <Field
                              fullWidth
                              placeholder='Name'
                              name='creator.name'
                              type='input'
                              as={TextField}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Field
                              name='creator.type'
                              type='select'
                              as={Select}
                            >
                              <MenuItem value='pi'>PI</MenuItem>
                              <MenuItem value='contributor'>
                                Contributor
                              </MenuItem>
                            </Field>
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
                  <Field
                    fullWidth
                    placeholder='Description'
                    name='description'
                    type='input'
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div>Types:</div>
                  <Field
                    name='types'
                    type='checkbox'
                    value='type1'
                    as={Checkbox}
                  />
                  <Field
                    name='types'
                    type='checkbox'
                    value='type2'
                    as={Checkbox}
                  />
                  <Field
                    name='types'
                    type='checkbox'
                    value='type3'
                    as={Checkbox}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    placeholder='License'
                    name='license'
                    type='input'
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    placeholder='Keywords'
                    name='keywords'
                    type='input'
                    as={TextField}
                  />
                </Grid>

                <Typography variant='h6' gutterBottom>
                  Next section
                </Typography>

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
