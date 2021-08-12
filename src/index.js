import React from 'react'
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
import ExtraPropertiesForm from './components/forms/ExtraPropertiesForm/ExtraPropertiesForm'
import CreateDatsSuccess from './components/CreateDatsSuccess/CreateDatsSuccess'
import FormToDats from './model/formToDats'
import DatsToForm from './model/datsToForm'

const defaultValidationSchema = yup.object({
  title: yup.string().required(),
  creators: yup.array().of(
    yup.object({
      name: yup.string(),
      email: yup.string().email(),
      orcid: yup
        .string()
        .matches(/^https:\/\/orcid.org\/\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d\d$/)
      // orcid: yup.string().when('type', {
      //   // eslint-disable-next-line eqeqeq
      //   is: (type) => type === 'Person',
      //   then: yup
      //     .string()
      //     .matches(/^https:\/\/orcid.org\/\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d\d$/)
      //     .required('An ORCID (https://orcid.org/XXXX-XXXX-XXXX-XXXX) is required'),
      //   otherwise: yup.string()
      // })
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
  access: yup
    .object({
      landingPage: yup.string().url().required(),
      authorization: yup.string().required()
    })
    .required(),
  privacy: yup
    .string()
    .matches(/(open|registered|controlled|private)/, {
      excludeEmptyString: true
    })
    .required(),
  files: yup.number().integer().positive().required(),
  subjects: yup.number().integer().positive().required(),
  conpStatus: yup
    .string()
    .matches(/(CONP|Canadian|external)/, {
      excludeEmptyString: true
    })
    .required(),
  derivedFrom: yup.string(),
  parentDatasetId: yup.string(),
  primaryPublications: yup.array().of(yup.string()),
  dimensions: yup.array().of(yup.string()),
  identifier: yup.object({
    name: yup.string(),
    source: yup.string().url()
  }),
  logo: yup.object({
    type: yup.string().oneOf(['url', 'fileName']),
    fileName: yup.string(),
    url: yup.string().url()
  }),
  dates: yup.array().of(
    yup.object({
      date: yup.date(),
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
  spatialCoverage: yup.array().of(yup.string()),
  reb_info: yup.string().oneOf(['option_1', 'option_2', 'option_3']).required(),
  reb_number: yup.string()
  // reb_number: yup.string().when('reb_info', {
  //       // eslint-disable-next-line eqeqeq
  //       is: (reb_info) => reb_info === 'option_1' || reb_info === 'option_2',
  //       then: yup
  //         .string()
  //         .required('An REB number is required for human research data'),
  //       otherwise: yup.string()
  //     })
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
  subsection: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
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

const defaultValues = {
  title: '',
  creators: [
    {
      type: 'Organization',
      role: 'Principal Investigator',
      orcid: ''
    }
  ],
  contact: {
    name: '',
    email: ''
  },
  description: '',
  types: [],
  version: '',
  licenses: [
    {
      value: '',
      valueOther: ''
    }
  ],
  keywords: [],
  formats: [],
  size: {
    value: '',
    units: 'MB'
  },
  access: {
    landingPage: '',
    authorization: 'public'
  },
  privacy: '',
  files: '',
  subjects: '',
  conpStatus: '',
  origin: {
    institution: '',
    city: '',
    province: '',
    country: ''
  },
  derivedFrom: '',
  parentDatasetId: '',
  primaryPublications: [],
  dimensions: [],
  identifier: {
    identifier: '',
    identifierSource: ''
  },
  logo: {
    type: 'url',
    fileName: '',
    url: ''
  },
  dates: [],
  citations: [],
  producedBy: '',
  isAbout: [],
  hasPart: '',
  acknowledges: [],
  refinement: '',
  aggregation: '',
  spatialCoverage: [],
  attachments: [],
  reb_info: '',
  reb_number: ''
}

const steps = [
  'General Info',
  'Distribution',
  'Extra Properties',
  'Review & Download'
]

function renderStep(step, classes, values, dats) {
  switch (step) {
    case 0:
      return <GeneralForm classes={classes} values={values} />
    case 1:
      return <DistributionForm classes={classes} values={values} />
    case 2:
      return <ExtraPropertiesForm classes={classes} values={values} />
    case 3:
      return <CreateDatsSuccess classes={classes} values={values} dats={dats} />
    default:
      throw new Error('Unknown step')
  }
}

export const DatsEditorForm = (props) => {
  const validationSchema = props.validationSchema || defaultValidationSchema
  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(props.activeStep || 0)
  const [dats, setDats] = React.useState()
  const [valuesState, setValuesState] = React.useState(defaultValues)
  const isLastStep = () => activeStep === steps.length - 2
  const shouldShowClearButton = () => activeStep <= steps.length - 2
  const shouldShowNextButton = () => activeStep <= steps.length - 2
  const shouldShowUploader = () => activeStep <= steps.length - 2

  const onDatsReceived = (json) => {
    const formData = new DatsToForm(json).getJson()
    console.log(formData)
    setValuesState(formData)
  }

  const handleNext = () => {
    setTimeout(() => {
      setActiveStep(activeStep + 1)
      window.scrollTo(0, 0)
    }, 200)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleClear = () => {
    setValuesState(defaultValues)
    setActiveStep(0)
    window.scrollTo(0, 0)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            DATS Editor
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <Formik
              enableReinitialize
              initialValues={valuesState}
              validationSchema={validationSchema}
              validateOnChange={false}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true)
                const dats = new FormToDats(data)
                setDats(dats.getJson())
                setActiveStep(activeStep + 1)
                setSubmitting(false)
              }}
            >
              {({ values, errors, touched, isSubmitting, handleReset }) => (
                <Form>
                  {shouldShowUploader() ? (
                    <div className={classes.section}>
                      <DatsUploader onDatsReceived={onDatsReceived} />
                    </div>
                  ) : null}
                  {renderStep(activeStep, classes, values, dats)}
                  <div className={classes.buttons}>
                    {shouldShowClearButton() ? (
                      <Button
                        variant='contained'
                        onClick={() => {
                          handleClear()
                          handleReset()
                        }}
                        className={classes.button}
                      >
                        Clear
                      </Button>
                    ) : null}
                    {activeStep !== 0 && (
                      <Button
                        variant='contained'
                        onClick={handleBack}
                        className={classes.button}
                      >
                        {shouldShowNextButton() ? 'Back' : 'Edit'}
                      </Button>
                    )}
                    <div className={classes.wrapper}>
                      {isLastStep() ? (
                        <Button
                          disabled={isSubmitting}
                          type='submit'
                          variant='contained'
                          color='primary'
                          className={classes.button}
                        >
                          Confirm
                        </Button>
                      ) : shouldShowNextButton() ? (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleNext}
                          className={classes.button}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            handleClear()
                            handleReset()
                          }}
                          className={classes.button}
                        >
                          Create a new DATS
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
                  {Object.keys(errors).length > 0 ? (
                    <div className={classes.section}>
                      <Typography variant='h6' gutterBottom>
                        To successfully create the DATS.json file, you must
                        first resolve issues with the following fields:
                      </Typography>
                      {Object.keys(errors).map((key) =>
                        Object.keys(touched).includes(key) ? (
                          <Typography
                            key={'' + Math.random()}
                            variant='subtitle1'
                            gutterBottom
                          >
                            {key}:{' '}
                            {Array.isArray(errors[key])
                              ? errors[key].map((e) => Object.values(e))
                              : JSON.stringify(errors[key])}
                          </Typography>
                        ) : null
                      )}
                    </div>
                  ) : null}
                  {/* {JSON.stringify(values, null, 2)} */}
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </div>
    </React.Fragment>
  )
}
