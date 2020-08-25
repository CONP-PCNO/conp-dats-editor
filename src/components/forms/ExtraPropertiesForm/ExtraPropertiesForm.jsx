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
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FieldArray } from 'formik'
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
                          key={'' + Math.random()}
                          container
                          item
                          spacing={3}
                          xs={12}
                        >
                          <Grid item xs={6}>
                            <CustomTextField
                              required
                              fullWidth
                              label='Primary Publication'
                              name={`primaryPublications.${index}`}
                            />
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
                        arrayHelpers.push('')
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
            <CustomTextField fullWidth label='Dimensions' name='dimensions' />
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
                  name='identifier.name'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Source'
                  name='identifier.source'
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
                        key={'' + Math.random()}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              id='date-picker-dialog'
                              label='Date picker dialog'
                              inputVariant='outlined'
                              format='MM/dd/yyyy'
                              name={`dates.${index}.name`}
                              KeyboardButtonProps={{
                                'aria-label': 'change date'
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextField
                            fullWidth
                            label='Description'
                            name={`dates.${index}.description`}
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
                          description: '',
                          date: ''
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
                  title='Acknowledgements for this dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField
              fullWidth
              label='Acknowledges'
              name='acknowledges'
            />
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
            <CustomTextField
              fullWidth
              label='Spatial Coverage'
              name='spatialCoverage'
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
