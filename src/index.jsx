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

function renderStep(step, classes, values, dats, isExperiment, nextClicked) {
  switch (step) {
    case experimentSteps[0]:
      return (
        <GeneralForm
          classes={classes}
          isExperiment={isExperiment}
          values={values}
          nextClicked = {nextClicked}
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
  const [nextClicked, setNextClicked] = React.useState(false);
  const [validateOnChange, setValidateOnChange] = React.useState(false);
  const [formEmpty, setFormEmpty] = React.useState(false);

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
    //console.log('formData', formData)
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

  // const checkRequiredFields = (values) => {
  //   const requiredFields = ['title', 'description', 'version', 'privacy', 'licenses', 'keywords'];
  //   console.log('Checking required fields...');
    
  //   const allFieldsEmpty = requiredFields.every((field) => {
  //     const value = values[field];
  //     console.log(`Checking field: ${field}, value:`, value);
      
  //     if (Array.isArray(value)) {
  //       const isEmpty = value.length === 0 || (value.length === 1 && value[0] === '');
  //       console.log(`Field ${field} is array and is empty: ${isEmpty}`);
  //       return isEmpty;
  //     } else if (typeof value === 'object' && value !== null) {
  //       const isEmpty = Object.keys(value).length === 0 || Object.values(value).some(v => v === '');
  //       console.log(`Field ${field} is object and is empty: ${isEmpty}`);
  //       return isEmpty;
  //     } else {
  //       const isEmpty = !value;
  //       console.log(`Field ${field} is primitive and is empty: ${isEmpty}`);
  //       return isEmpty;
  //     }
  //   });
  
  //   console.log('All fields empty:', allFieldsEmpty);
  //   return allFieldsEmpty;
  // };

  const handleNext = (errors, values) => {
    let modifiedErrors = { ...errors };
    //console.log('value top', errors)
    setNextClicked(true)
    //setFormEmpty(false)
    console.log('values',values )
    // Retirer la clé 'reb_info' si activeStep n'est pas 2
    if(!isExperiment){
      if (activeStep !== 2) {
        if(modifiedErrors['reb_info']){
          delete modifiedErrors['reb_info'];
        }
        if(modifiedErrors['contact']){
          delete modifiedErrors['contact'];
        }
      }
      if(activeStep !== 1){
        if(modifiedErrors['size']){
          delete modifiedErrors['size'];
        }
        if(modifiedErrors['access']){
          delete modifiedErrors['access'];
        }
        if(modifiedErrors['files']){
          delete modifiedErrors['files'];
        }
        if(modifiedErrors['conpStatus']){
          delete modifiedErrors['conpStatus'];
        }
      }
    }
    if (isExperiment) {
      if(activeStep !== 1){
        if(modifiedErrors['size']){
          delete modifiedErrors['size'];
        }
        if(modifiedErrors['access']){
          delete modifiedErrors['access'];
        }
        if(modifiedErrors['files']){
          delete modifiedErrors['files'];
        }
        if(modifiedErrors['conpStatus']){
          delete modifiedErrors['conpStatus'];
        }
      }
      if (activeStep !== 2) {
        if(modifiedErrors['contact']){
          delete modifiedErrors['contact'];
        }
        if(delete modifiedErrors['registrationPageURL']){
          delete modifiedErrors['registrationPageURL'];
        }
        if(modifiedErrors['reb_info']){
          delete modifiedErrors['reb_info'];
        }
      }
      if(activeStep !== 3){
        if(modifiedErrors['types']){
          delete modifiedErrors['types'];
        }
        if(modifiedErrors['experimentsRequiredSoftware']){
          delete modifiedErrors['experimentsRequiredSoftware'];
        }
        if(modifiedErrors['experimentsFunctionAssessed']){
          delete modifiedErrors['experimentsFunctionAssessed'];
        }
        if(modifiedErrors['experimentsLanguages']){
          delete modifiedErrors['experimentsLanguages'];
        }
        if(modifiedErrors['experimentsModalities']){
          delete modifiedErrors['experimentsModalities'];
        }
      }
    }
    console.log(Object.keys(modifiedErrors).length, modifiedErrors)
    if (Object.keys(modifiedErrors).length === 0) {
      setTimeout(() => {
        // const hasEmptyField = checkRequiredFields(values);
        // console.log('apres check')
        // if (hasEmptyField) {
        //   console.log('tout est vide')
        //   setFormEmpty(true)
        //   return; // Retourner immédiatement si l'un des champs spécifiques est vide
        // }
        setActiveStep(activeStep + 1)
        window.scrollTo(0, 0)
      }, 200)
    }
    else {
      // Logique pour défiler jusqu'au premier champ d'erreur
      var firstErrorKey = Object.keys(modifiedErrors)[0];
      var errorFieldSelector = `[name="${firstErrorKey}"]`;
      var errorFieldElement = document.querySelector(errorFieldSelector);

      // Définir la clé pour accéder à des sous-éléments spécifiques, si nécessaire
      if (firstErrorKey === 'access') {
        firstErrorKey = firstErrorKey + '.landingPage';
      } else if (firstErrorKey === 'creators') {
        firstErrorKey = firstErrorKey + '.0.name';
      } else if (firstErrorKey === 'size') {
        firstErrorKey = firstErrorKey + '.value';
      } else if (firstErrorKey === 'conpStatus') {
        // Pas besoin de modification pour 'conpStatus'
      }
      errorFieldSelector = `[data-testid="${firstErrorKey}"]`;
      errorFieldElement = document.querySelector(errorFieldSelector);

      if (errorFieldElement === null) {
        firstErrorKey += '.0'; // Accéder au premier élément d'un tableau, si applicable
        errorFieldSelector = `[data-testid="${firstErrorKey}"]`;
        errorFieldElement = document.querySelector(errorFieldSelector);
      }
      console.log('firstErrorKey', firstErrorKey, errorFieldElement)
      if (firstErrorKey === 'conpStatus' && errorFieldElement) {
        // Pour 'conpStatus', accéder au div parent
        let parentDivElement = errorFieldElement.parentNode;
        // Ensuite, accéder au premier div enfant du div parent
        let childDivElement = parentDivElement.querySelector('div'); // Assurez-vous que c'est bien un div que vous voulez sélectionner
    
        childDivElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (childDivElement.focus) {
          childDivElement.focus();
          childDivElement.blur();
          childDivElement.focus();
        }
      } else if (firstErrorKey === 'privacy' && errorFieldElement) {
          // Pour 'conpStatus', accéder au div parent
          let parentDivElement = errorFieldElement.parentNode;
          // Ensuite, accéder au premier div enfant du div parent
          let childDivElement = parentDivElement.querySelector('div'); // Assurez-vous que c'est bien un div que vous voulez sélectionner
      
          childDivElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (childDivElement.focus) {
            childDivElement.focus();
            childDivElement.blur();
            childDivElement.focus();
          }
      } else if (firstErrorKey === 'licenses.0' && errorFieldElement) {
        // Traiter spécifiquement pour 'licenses'
        let childDivElement = errorFieldElement.querySelector('div'); // Sélectionner le premier div enfant
        if (childDivElement) {
          childDivElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (childDivElement.focus) {
            childDivElement.focus();
            childDivElement.blur();
            childDivElement.focus();
          }
        }
      } else if (errorFieldElement) {
        errorFieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optionnel: focus sur le champ pour accessibilité
        if (errorFieldElement.focus) {
          errorFieldElement.focus();
          errorFieldElement.blur();
          errorFieldElement.focus();
        }
      }
    }
  }

  const handleConfirm = (errors) => {
    console.log('errors', errors)
    setNextClicked(true); // Set when 'Confirm' is clicked
    setValidateOnChange(true);



    if (Object.keys(errors).length === 0) {
      console.log('no error')
    }
    else {
      // Logique pour défiler jusqu'au premier champ d'erreur
      var firstErrorKey = Object.keys(errors)[0];
      var errorFieldSelector = `[name="${firstErrorKey}"]`;
      var errorFieldElement = document.querySelector(errorFieldSelector);
      console.log('firstErrorKeyTop', firstErrorKey, errorFieldElement)
      // Définir la clé pour accéder à des sous-éléments spécifiques, si nécessaire
      if (firstErrorKey === 'experimentsRequiredSoftware') {
        firstErrorKey = firstErrorKey + '.0.software';
      } else if (firstErrorKey === 'creators') {
        firstErrorKey = firstErrorKey + '.0.name';
      } else if (firstErrorKey === 'size') {
        firstErrorKey = firstErrorKey + '.value';
      } else if (firstErrorKey === 'conpStatus') {
        // Pas besoin de modification pour 'conpStatus'
      }
      errorFieldSelector = `[data-testid="${firstErrorKey}"]`;
      errorFieldElement = document.querySelector(errorFieldSelector);

      if (errorFieldElement === null) {
        firstErrorKey += '.0'; // Accéder au premier élément d'un tableau, si applicable
        errorFieldSelector = `[data-testid="${firstErrorKey}"]`;
        errorFieldElement = document.querySelector(errorFieldSelector);
      }
      console.log('firstErrorKey', firstErrorKey, errorFieldElement)
      if ((firstErrorKey === 'experimentsRequiredSoftware.0.software' || firstErrorKey === 'experimentsFunctionAssessed.0' || firstErrorKey === 'experimentsModalities.0') && errorFieldElement) {
          // Pour 'conpStatus', accéder au div parent
          let childDivElement = errorFieldElement.querySelector('div');

          // Ensuite, accéder au premier div enfant du div parent
          //let childDivElement = parentDivElement.querySelector('div'); // Assurez-vous que c'est bien un div que vous voulez sélectionner
          console.log('dans le if du focus')
          childDivElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (childDivElement.focus) {
            childDivElement.focus();
            childDivElement.blur();
            childDivElement.focus();
          }
      } else if (errorFieldElement) {
        errorFieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optionnel: focus sur le champ pour accessibilité
        console.log('in the else focus')
        if (errorFieldElement.focus) {
          errorFieldElement.focus();
          errorFieldElement.blur();
          errorFieldElement.focus();
        }
      }
    }


    // setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleClear = () => {
    setValuesState(defaultDatsValues)
    setActiveStep(0)
    window.scrollTo(0, 0)
  }

  const downloadDats = (formData) => {
    if (!valuesState || Object.keys(valuesState).length === 0) {
      alert('No data available to download.');
      return;
    }
    console.log(formData)
    const datsJson = new FormToDats(formData).getJson();
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(datsJson, null, 2)], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = 'DATS.json'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            initialValues={{ ...valuesState, isExperiment: isExperiment }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true)
              const datsJson = new FormToDats(data)
              console.log('datsJson', datsJson)
              setDats(datsJson.getJson())
              setActiveStep(activeStep + 1)
              setSubmitting(false)
            }}
            // validateOnChange={validateOnChange}
            validateOnChange={true}
            validationSchema={validationSchema || defaultDatsValidationSchema}
            context={{ isExperiment: isExperiment }} 
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
                    <Grid container direction="column" alignItems="center" justifyContent="center">
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
                  isExperiment,
                  nextClicked
                )}

                <div className={classes.buttons}>
                {(activeStep < 3 || (isExperiment && activeStep < 4))  && (
                  <Button
                    className={classes.button}
                    style={{ backgroundColor: '#3f51b5', color: 'white', marginRight: 'auto' }} 
                    onClick={() => downloadDats(values)}
                    // onClick={console.log('pressed')}
                    variant="contained"
                  >
                    Save partial DATS
                  </Button>
                )}

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
                        //onClick={handleConfirm}
                        onClick={() => handleConfirm(errors)} 
                      >
                        Confirm
                      </Button>
                    ) : shouldShowNextButton(activeStep) ? (
                      <Button
                        className={classes.button}
                        color='primary'
                        onClick={() => handleNext(errors, values)}  
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
                  formEmpty={formEmpty}
                />
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </React.Fragment>
  )
}
