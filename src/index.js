import React, { createRef } from 'react'
import { Formik, Form } from 'formik'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import * as yup from 'yup'

import DatsUploader from './components/DatsUploader/DatsUploader'
import GeneralForm from './components/forms/GeneralForm/GeneralForm'
import DistributionForm from './components/forms/DistributionForm/DistributionForm'
import Review from './components/forms/Review/Review'
import CreateDatsSuccess from './components/CreateDatsSuccess/CreateDatsSuccess'
import DATS from './model/dats'

const defaultValidationSchema = yup.object({
  title: yup.string().required(),
  creators: yup.array().of(
    yup.object({
      name: yup.string().required(),
      email: yup.string().email()
    })
  ),
  contact: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  }),
  description: yup.string().required(),
  types: yup.array().of(yup.string()).min(1).required(),
  version: yup.number().positive(),
  licenses: yup.array().of(yup.string()).min(1),
  keywords: yup.array().of(yup.string()).min(1),
  formats: yup.array().of(yup.string()).min(1),
  size: yup
    .object({
      value: yup.number().positive().required(),
      units: yup.string().required()
    })
    .required(),
  privacy: yup.string().required(),
  files: yup.number().integer().positive().required(),
  subjects: yup.number().integer().positive().required(),
  conpStatus: yup.string().required(),
  derivedFrom: yup.string(),
  parentDatasetId: yup.string(),
  primaryPublications: yup.array().of(yup.string()),
  dimensions: yup.array().of(yup.string()),
  identifier: yup.object({
    name: yup.string().required(),
    source: yup.string().url().required()
  }),
  logo: yup.string(),
  date: yup.object({
    date: yup.date().required(),
    description: yup.string()
  }),
  dates: yup.array().of(
    yup.object({
      date: yup.date().required(),
      description: yup.string()
    })
  ),
  citations: yup.array().of(yup.string()),
  producedBy: yup.string(),
  isAbout: yup.array().of(yup.string()),
  hasPart: yup.string(),
  acknowledges: yup.string(),
  refinement: yup.string(),
  aggregation: yup.string(),
  spatialCoverage: yup.array().of(yup.string())
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
      width: 800,
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
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
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

const dropzoneRef = createRef()
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
}

const steps = ['General Info', 'Distribution', 'Extra Properties']

function renderStep(step, classes, values, setFieldValue, setTouched) {
  switch (step) {
    case 0:
      return (
        <GeneralForm
          classes={classes}
          values={values}
          setFieldValue={setFieldValue}
          setTouched={setTouched}
        />
      )
    case 1:
      return (
        <DistributionForm
          values={values}
          setFieldValue={setFieldValue}
          setTouched={setTouched}
        />
      )
    case 2:
      return (
        <Review
          values={values}
          setFieldValue={setFieldValue}
          setTouched={setTouched}
        />
      )
    default:
      throw new Error('Unknown step')
  }
}

export const DatsCreatorGui = (props) => {
  const validationSchema = props.validationSchema || defaultValidationSchema
  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0)
  const [dats, setDats] = React.useState()
  const isLastStep = activeStep === steps.length - 1

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Create DATS.json
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <CreateDatsSuccess dats={dats} classes={classes} />
            ) : (
              <Formik
                validateOnChange
                initialValues={{
                  title: '',
                  creators: [
                    {
                      type: 'pi',
                      name: '',
                      email: ''
                    }
                  ],
                  contact: {
                    name: '',
                    email: ''
                  },
                  description: '',
                  types: [''],
                  version: '',
                  licenses: [''],
                  keywords: [''],
                  formats: [''],
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
                  date: {
                    date: '',
                    description: ''
                  },
                  dates: [],
                  citations: [],
                  producedBy: '',
                  isAbout: [],
                  hasPart: '',
                  acknowledges: '',
                  refinement: '',
                  aggregation: '',
                  spatialCoverage: [],
                  attachments: []
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true)
                  // make async call
                  const dats = new DATS(data)
                  console.log('submit: ', dats.getJson())
                  setDats(dats.getJson())
                  setActiveStep(activeStep + 1)
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  errors,
                  isSubmitting,
                  setFieldValue,
                  setTouched
                }) => (
                  <Form>
                    <div className={classes.section}>
                      <DatsUploader />
                    </div>
                    {renderStep(
                      activeStep,
                      classes,
                      values,
                      setFieldValue,
                      setTouched
                    )}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          variant='contained'
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      <div className={classes.wrapper}>
                        {isLastStep ? (
                          <Button
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                          >
                            Confirm
                          </Button>
                        ) : (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={handleNext}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        )}
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                  </Form>
                )}
              </Formik>
            )}
          </React.Fragment>
        </Paper>
      </div>
    </React.Fragment>
  )
}
