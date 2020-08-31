import React from 'react'
import {
  Grid,
  Typography,
  Button,
  Divider,
  Tooltip,
  IconButton,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import {
  TimePicker,
  DatePicker,
  DateTimePicker
} from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FieldArray, Field } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'
import InfoIcon from '@material-ui/icons/Info'
import CancelIcon from '@material-ui/icons/Cancel'

export default function ExtraPropertiesForm(props) {
  const { classes, values } = props
  return (
    <React.Fragment>
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Origin
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='The origin of this dataset' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Institution'
                  name='origin.institution'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField fullWidth label='City' name='origin.city' />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Province'
                  name='origin.province'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Country'
                  name='origin.country'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Derived From
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The sources this dataset is derived from'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Derived From'
                  name='derivedFrom'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Parent dataset id'
                  name='parentDatasetId'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Primary Publications
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The primary publication(s) associated with the dataset, usually describing how the dataset was produced'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='primaryPublications'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.primaryPublications.map(
                    (primaryPublication, index) => {
                      return (
                        <Grid
                          key={'primaryPublication_' + index}
                          container
                          item
                          spacing={3}
                          xs={12}
                        >
                          <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='Title'
                              name={`primaryPublications.${index}.title`}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <CustomTextField
                              fullWidth
                              label='Publication Venue'
                              name={`primaryPublications.${index}.publicationVenue`}
                            />
                          </Grid>
                          <FieldArray
                            name={`primaryPublications.${index}.authors`}
                          >
                            {(arrayHelpers) => (
                              <Grid container item spacing={5} xs={12}>
                                {values.primaryPublications[index].authors.map(
                                  (author, idx) => {
                                    return (
                                      <Grid
                                        key={'author_' + idx}
                                        container
                                        item
                                        spacing={3}
                                        xs={12}
                                      >
                                        <Grid item xs={12}>
                                          <CustomTextField
                                            fullWidth
                                            label='Full Name'
                                            name={`primaryPublications.${index}.authors.${idx}.fullName`}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <CustomTextField
                                            fullWidth
                                            label='First Name'
                                            name={`primaryPublications.${index}.authors.${idx}.firstName`}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <CustomTextField
                                            fullWidth
                                            label='Middle Initial'
                                            name={`primaryPublications.${index}.authors.${idx}.middleInitial`}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <CustomTextField
                                            fullWidth
                                            label='Last Name'
                                            name={`primaryPublications.${index}.authors.${idx}.lastName`}
                                          />
                                        </Grid>
                                        <FieldArray
                                          name={`primaryPublications.${index}.authors.${idx}.affiliations`}
                                        >
                                          {(arrayHelpers) => (
                                            <Grid
                                              container
                                              item
                                              spacing={5}
                                              xs={12}
                                            >
                                              {values.primaryPublications[
                                                index
                                              ].authors[idx].affiliations.map(
                                                (affiliation, i) => {
                                                  return (
                                                    <Grid
                                                      key={
                                                        'affiliation_' + index
                                                      }
                                                      container
                                                      item
                                                      spacing={3}
                                                      xs={12}
                                                    >
                                                      <Grid item xs={6}>
                                                        <CustomTextField
                                                          fullWidth
                                                          label='Affiliation'
                                                          name={`primaryPublications.${index}.authors.${idx}.affiliations.${i}.name`}
                                                        />
                                                      </Grid>
                                                      <Grid
                                                        container
                                                        item
                                                        xs={3}
                                                        justify='center'
                                                      >
                                                        <IconButton
                                                          color='default'
                                                          onClick={() =>
                                                            arrayHelpers.remove(
                                                              i
                                                            )
                                                          }
                                                        >
                                                          <CancelIcon />
                                                        </IconButton>
                                                      </Grid>
                                                    </Grid>
                                                  )
                                                }
                                              )}
                                              <Grid item xs={6}>
                                                <Button
                                                  variant='outlined'
                                                  color='secondary'
                                                  onClick={() => {
                                                    arrayHelpers.push('')
                                                  }}
                                                >
                                                  {values.primaryPublications[
                                                    index
                                                  ].authors[idx].affiliations
                                                    .length > 0
                                                    ? 'Add another Affiliation'
                                                    : 'Add an Affiliation'}
                                                </Button>
                                              </Grid>
                                            </Grid>
                                          )}
                                        </FieldArray>
                                        <Grid
                                          container
                                          item
                                          xs={3}
                                          justify='center'
                                        >
                                          <IconButton
                                            color='default'
                                            onClick={() =>
                                              arrayHelpers.remove(idx)
                                            }
                                          >
                                            <CancelIcon />
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    )
                                  }
                                )}
                                <Grid item xs={6}>
                                  <Button
                                    variant='outlined'
                                    color='secondary'
                                    onClick={() => {
                                      arrayHelpers.push({
                                        fullName: '',
                                        firstName: '',
                                        middleInitial: '',
                                        lastName: '',
                                        affiliations: []
                                      })
                                    }}
                                  >
                                    {values.primaryPublications[index].authors
                                      .length > 0
                                      ? 'Add another Author'
                                      : 'Add an Author'}
                                  </Button>
                                </Grid>
                              </Grid>
                            )}
                          </FieldArray>
                          <Grid item xs={12}>
                            <Grid container direction='row' spacing={1}>
                              <Grid item>
                                <Typography variant='h6' gutterBottom>
                                  Dates
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  title='Relevant dates for the publication. If you provide a date, it must come with a description of the date'
                                  placement='right'
                                >
                                  <InfoIcon fontSize='small' color='action' />
                                </Tooltip>
                              </Grid>
                            </Grid>
                            <FieldArray
                              name={`primaryPublications.${index}.dates`}
                            >
                              {(arrayHelpers) => (
                                <Grid container item spacing={3} xs={12}>
                                  {values.primaryPublications[index].dates.map(
                                    (date, idx) => {
                                      return (
                                        <Grid
                                          key={'date_' + idx}
                                          container
                                          item
                                          spacing={3}
                                          xs={12}
                                        >
                                          <Grid item xs={4}>
                                            <MuiPickersUtilsProvider
                                              utils={DateFnsUtils}
                                            >
                                              <Field
                                                component={DatePicker}
                                                name={`primaryPublications.${index}.dates.${idx}.date`}
                                                label='Date'
                                                format='MM/dd/yyyy'
                                              />
                                            </MuiPickersUtilsProvider>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <CustomTextField
                                              fullWidth
                                              label='Description'
                                              name={`primaryPublications.${index}.dates.${idx}.description`}
                                            />
                                          </Grid>
                                          <Grid
                                            container
                                            item
                                            xs={1}
                                            justify='center'
                                          >
                                            <IconButton
                                              color='default'
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <CancelIcon />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      )
                                    }
                                  )}
                                  <Grid item xs={6}>
                                    <Button
                                      variant='outlined'
                                      color='secondary'
                                      onClick={() => {
                                        arrayHelpers.push({
                                          description: '',
                                          date: new Date().toISOString()
                                        })
                                      }}
                                    >
                                      {values.dates.length > 0
                                        ? 'Add another Date'
                                        : 'Add a Date'}
                                    </Button>
                                  </Grid>
                                </Grid>
                              )}
                            </FieldArray>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container direction='row' spacing={1}>
                              <Grid item>
                                <Typography variant='h6' gutterBottom>
                                  Identifier
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Tooltip
                                  title='Primary identifier for the dataset. Provide a Document Object Identifier (DOI) if you have one'
                                  placement='right'
                                >
                                  <InfoIcon fontSize='small' color='action' />
                                </Tooltip>
                              </Grid>
                            </Grid>
                            <Grid container item spacing={3} xs={12}>
                              <Grid item xs={6}>
                                <CustomTextField
                                  fullWidth
                                  label='Identifier'
                                  name={`primaryPublications.${index}.identifier.identifier`}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <CustomTextField
                                  fullWidth
                                  label='Source'
                                  name={`primaryPublications.${index}.identifier.identifierSource`}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container item xs={3} justify='center'>
                            <IconButton
                              color='default'
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      )
                    }
                  )}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          title: '',
                          publicationVenue: '',
                          authors: [],
                          dates: [],
                          identifier: {
                            identifier: '',
                            identifierSource: ''
                          }
                        })
                      }}
                    >
                      {values.primaryPublications.length > 0
                        ? 'Add another Primary Publication'
                        : 'Add a Primary Publication'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Dimensions
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The different dimensions (granular components) making up a dataset. Providing dimensions give more details about the data types'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='dimensions'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.dimensions.map((dimension, index) => {
                    return (
                      <Grid
                        key={'dimension_' + index}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Name'
                            name={`dimensions.${index}.name`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Description'
                            name={`dimensions.${index}.description`}
                          />
                        </Grid>
                        <Grid container item xs={2} justify='center'>
                          <IconButton
                            color='default'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          name: '',
                          description: ''
                        })
                      }}
                    >
                      {values.dimensions.length > 0
                        ? 'Add another Dimension'
                        : 'Add a Dimension'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Identifier
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Primary identifier for the dataset. Provide a Document Object Identifier (DOI) if you have one'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Identifier'
                  name='identifier.identifier'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Source'
                  name='identifier.identifierSource'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Contact
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Contact information for this dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={6}>
                <CustomTextField fullWidth label='Name' name='contact.name' />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField fullWidth label='Email' name='contact.email' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid container direction='row' spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom>
                Logo
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='The logo for this dataset' placement='right'>
                <InfoIcon fontSize='small' color='action' />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <CustomRadioGroup name='logo.type' label='Type'>
              <FormControlLabel value='url' control={<Radio />} label='URL' />
              <FormControlLabel
                value='fileName'
                control={<Radio />}
                label='Filename'
              />
            </CustomRadioGroup>
          </Grid>
          <Grid container item spacing={3} xs={9}>
            <Grid item xs={12}>
              {values.logo.type === 'url' ? (
                <CustomTextField fullWidth label='URL' name='logo.url' />
              ) : (
                <CustomTextField
                  fullWidth
                  label='Path to File'
                  name='logo.fileName'
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Dates
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Relevant dates for the dataset. If you provide a date, it must come with a description of the date'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='dates'>
              {(arrayHelpers) => (
                <Grid container item spacing={3} xs={12}>
                  {values.dates.map((date, index) => {
                    return (
                      <Grid
                        key={'date_' + index}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Field
                              component={DatePicker}
                              name={`dates.${index}.date`}
                              label='Date'
                              format='MM/dd/yyyy'
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextField
                            fullWidth
                            label='Description'
                            name={`dates.${index}.type.value`}
                          />
                        </Grid>
                        <Grid container item xs={1} justify='center'>
                          <IconButton
                            color='default'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          type: { value: '' },
                          date: new Date().toISOString()
                        })
                      }}
                    >
                      {values.dates.length > 0
                        ? 'Add another Date'
                        : 'Add a Date'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Produced By
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Process which generated a given dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Produced By' name='producedBy' />
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Is About
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='What this dataset is about' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Is About' name='isAbout' />
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Acknowledges
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The grant(s) which funded and supported the work reported by the dataset.'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='acknowledges'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.acknowledges.map((s, index) => {
                    return (
                      <Grid
                        key={'acknowledges_' + index}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Name'
                            name={`acknowledges.${index}.name`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Description'
                            name={`acknowledges.${index}.abbreviation`}
                          />
                        </Grid>
                        <Grid container item xs={2} justify='center'>
                          <IconButton
                            color='default'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          name: '',
                          abbreviation: ''
                        })
                      }}
                    >
                      {values.acknowledges.length > 0
                        ? 'Add another Acknowledgement'
                        : 'Add an Acknowledgement'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Spatial Coverage
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The geographical extension and span covered by the dataset and its measured dimensions/variables'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='spatialCoverage'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.spatialCoverage.map((s, index) => {
                    return (
                      <Grid
                        key={'spatialCoverage_' + index}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Name'
                            name={`spatialCoverage.${index}.name`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <CustomTextField
                            fullWidth
                            label='Description'
                            name={`spatialCoverage.${index}.description`}
                          />
                        </Grid>
                        <Grid container item xs={2} justify='center'>
                          <IconButton
                            color='default'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push({
                          name: '',
                          description: ''
                        })
                      }}
                    >
                      {values.spatialCoverage.length > 0
                        ? 'Add another Spatial Coverage'
                        : 'Add a Spatial Coverage'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
