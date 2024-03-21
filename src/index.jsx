/* eslint max-lines: "off" */

import React from 'react'
import { Formik, Form } from 'formik'
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress
} from '@material-ui/core'

import CssBaseline from '@material-ui/core/CssBaseline'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import DatsErrors from './components/DatsErrors/DatsErrors'
import DatsUploader from './components/DatsUploader/DatsUploader'
import GeneralForm from './components/forms/GeneralForm/GeneralForm'
import DistributionForm from './components/forms/DistributionForm/DistributionForm'
import ExperimentsForm from './components/forms/ExperimentsForm/ExperimentsForm'
import ExtraPropertiesForm from './components/forms/ExtraPropertiesForm/ExtraPropertiesForm'
import {
  ReadmeEditor,
  genDefaultReadme
} from './components/forms/ReadmeEditor/ReadmeEditor'
import CreateDatsSuccess from './components/CreateDatsSuccess/CreateDatsSuccess'
import FormToDats from './model/formToDats'
import DatsToForm from './model/datsToForm'
import {
  defaultDatsValidationSchema,
  defaultDatsValues
} from './model/datsSpec'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '65vw',
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

const datasetSteps = [
  'General Info',
  'Distribution',
  'Extra Properties',
  'Review & Download', 
  'Readme Editor'
]

const experimentSteps = [
  ...datasetSteps.slice(0, 3),
  'Experiment Properties',
  datasetSteps[3],
  'Readme Editor'
]

function renderStep(step, classes, values, dats, isExperiment) {
  switch (step) {
    case experimentSteps[0]:
      return (
        <GeneralForm
          classes={classes}
          isExperiment={isExperiment}
          values={values}
        />
      )
    case experimentSteps[1]:
      return (
        <DistributionForm
          classes={classes}
          isExperiment={isExperiment}
          values={values}
        />
      )
    case experimentSteps[2]:
      return (
        <ExtraPropertiesForm
          classes={classes}
          isExperiment={isExperiment}
          values={values}
        />
      )
    case experimentSteps[3]:
      return (
        <ExperimentsForm
          classes={classes}
          isExperiment={isExperiment}
          values={values}
        />
      )
    case experimentSteps[4]:
      return (
        <CreateDatsSuccess
          classes={classes}
          dats={dats}
          isExperiment={isExperiment}
          values={values}
        />
      )
    case experimentSteps[5]:
      return (
        <ReadmeEditor
          buttonClass={classes.button}
          readmeStart={genDefaultReadme(values)}
          wrapperClass={classes.wrapper}
        />
      )
    default:
      throw new Error('Unknown step')
  }
}

/* eslint max-statements: "off" */
export function DatsEditorForm(props) {
  const { validationSchema, initialActiveStep } = props
  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(initialActiveStep || 0)
  const [dats, setDats] = React.useState()
  const [valuesState, setValuesState] = React.useState(defaultDatsValues)
  const [isExperiment, setIsExperiment] = React.useState(false)

  const steps = isExperiment ? experimentSteps : datasetSteps
  const postDatsSteps = isExperiment ? 2 : 2

  const isLastStep = (activeStep) =>
    activeStep === steps.length - (postDatsSteps + 1)
  const shouldShowClearButton = (activeStep) =>
    activeStep <= steps.length - (postDatsSteps + 1)
  const shouldShowNextButton = (activeStep) =>
    activeStep <= steps.length - postDatsSteps
  const shouldShowUploader = (activeStep) =>
    activeStep <= steps.length - (postDatsSteps + 1)

  const onDatsReceived = (json) => {
    const formData = new DatsToForm(json).getJson()
    setValuesState(formData)
    if(formData.experimentsLanguages.length > 0){
      setIsExperiment(true)
    }
    else{
      setIsExperiment(false)
    }
  }

  const handleRadioChange = (event) => {
    setIsExperiment(event.target.value === 'experiment')
    setActiveStep(0) // Réinitialiser l'étape active si la sélection change
  }

  const toggleIsExperiment = () => {
    setIsExperiment(!isExperiment)
    setActiveStep(0)
  }

  const handleNext = (errors) => {
    let modifiedErrors = { ...errors };
    console.log(modifiedErrors['reb_info'])
    // Retirer la clé 'reb_info' si activeStep n'est pas 2
    if (activeStep !== 2) {
      delete modifiedErrors['reb_info'];
    }
    if (isExperiment) {
      delete modifiedErrors['registrationPageURL'];
    }
    console.log(Object.keys(modifiedErrors).length, modifiedErrors)
    if (Object.keys(modifiedErrors).length === 0) {
      setTimeout(() => {
        setActiveStep(activeStep + 1)
        window.scrollTo(0, 0)
      }, 200)
    }
    else {
      // Logique pour défiler jusqu'au premier champ d'erreur
      const firstErrorKey = Object.keys(errors)[0];
      const errorFieldSelector = `[name="${firstErrorKey}"]`;
      const errorFieldElement = document.querySelector(errorFieldSelector);
  
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optionnel: focus sur le champ pour accessibilité
        if (errorFieldElement.focus) {
          errorFieldElement.focus();
        }
      }
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleClear = () => {
    setValuesState(defaultDatsValues)
    setActiveStep(0)
    window.scrollTo(0, 0)
  }

  /* eslint react/jsx-newline: "off" */
  /* eslint react/jsx-max-depth: "off" */
  /* eslint react/forbid-component-props: "off" */
  /* eslint no-ternary: "off" */
  /* eslint no-nested-ternary: "off" */
  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography align='center' component='h1' variant='h4'>
            DATS Editor
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Formik
            enableReinitialize
            initialValues={valuesState}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true)
              const datsJson = new FormToDats(data)
              console.log('datsJson', datsJson)
              setDats(datsJson.getJson())
              setActiveStep(activeStep + 1)
              setSubmitting(false)
            }}
            validateOnChange={false}
            validationSchema={validationSchema || defaultDatsValidationSchema}
            validationContext={{ isExperiment: isExperiment }}
          >
            {({ values, errors, touched, isSubmitting, handleReset }) => (
              <Form>
                {shouldShowUploader(activeStep) ? (
                  <React.Fragment>
                    <div className={classes.section}>
                      <DatsUploader onDatsReceived={onDatsReceived} />
                    </div>

                    {/* <Grid
                      alignItems='center'
                      component='label'
                      container
                      justifyContent='center'
                      spacing={1}
                    >
                      <Grid item>Dataset</Grid>
                      <Grid item>
                        <Switch
                          checked={isExperiment}
                          name='isExperimentSwitch'
                          onChange={toggleIsExperiment}
                        />
                      </Grid>
                      <Grid item>Experiment</Grid>
                    </Grid> */}
                    <Grid container direction="column" alignItems="center" justify="center">
                    <FormControl component="fieldset" className={classes.formControl}>
                      <RadioGroup
                        
                        aria-label="isExperiment"
                        name="isExperiment"
                        value={isExperiment ? 'experiment' : 'dataset'}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel value="dataset" control={<Radio />} label="Dataset" style={{ fontSize: '1rem' }}/>
                        <FormControlLabel value="experiment" control={<Radio />} label="Experiment" style={{ fontSize: '1rem' }}/>
                      </RadioGroup>
                    </FormControl>
                    </Grid>


                  </React.Fragment>
                ) : null}

                {renderStep(
                  steps[activeStep],
                  classes,
                  values,
                  dats,
                  isExperiment
                )}

                <div className={classes.buttons}>
                  {shouldShowClearButton(activeStep) ? (
                    <Button
                      className={classes.button}
                      onClick={() => {
                        handleClear()
                        handleReset()
                      }}
                      variant='contained'
                    >
                      Clear
                    </Button>
                  ) : null}

                  {activeStep !== 0 && (
                    <Button
                      className={classes.button}
                      onClick={handleBack}
                      variant='contained'
                    >
                      {shouldShowNextButton(activeStep) ? 'Back' : 'Edit'}
                    </Button>
                  )}

                  <div className={classes.wrapper}>
                    {isLastStep(activeStep) ? (
                      <Button
                        className={classes.button}
                        color='primary'
                        disabled={isSubmitting}
                        type='submit'
                        variant='contained'
                      >
                        Confirm
                      </Button>
                    ) : shouldShowNextButton(activeStep) ? (
                      <Button
                        className={classes.button}
                        color='primary'
                        onClick={() => handleNext(errors)} 
                        variant='contained'
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className={classes.button}
                        color='primary'
                        onClick={() => {
                          handleClear()
                          handleReset()
                        }}
                        variant='contained'
                      >
                        Create a new DATS
                      </Button>
                    )}

                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.buttonProgress}
                        size={24}
                      />
                    ) : null}
                  </div>
                </div>

                <DatsErrors
                  className={classes.section}
                  errors={errors}
                  touched={touched}
                />
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </React.Fragment>
  )
}
