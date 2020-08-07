import React from 'react'
import {
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import InfoIcon from '@material-ui/icons/Info'
import CancelIcon from '@material-ui/icons/Cancel'

export default function ExtraPropertiesForm(props) {
  const { classes, values, setFieldValue } = props
  return (
    <React.Fragment>
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
                <Tooltip title='Primary Publications' placement='right'>
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
                            {index !== 0 && (
                              <IconButton
                                color='action'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <CancelIcon />
                              </IconButton>
                            )}
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
                      Add another Primary Publication
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
                  title='The dimensions of the dataset'
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
                <Tooltip title='Identifier' placement='right'>
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
          <Grid item xs={12}>
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
            <CustomTextField fullWidth label='Logo' name='logo' />
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
                  title='Important dates related to the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='dates'>
              {(arrayHelpers) => (
                <Grid container item spacing={3} xs={12}>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id='date-picker-dialog'
                        label='Date picker dialog'
                        inputVariant='outlined'
                        format='MM/dd/yyyy'
                        value={values.date.date}
                        onChange={(value) => setFieldValue('date.date', value)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      fullWidth
                      label='Description'
                      name='date.description'
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => {
                        arrayHelpers.push({
                          description: values.date.description,
                          date: values.date.date,
                          id: '' + Math.random()
                        })
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    {values.dates.map((date, index) => {
                      return (
                        <Chip
                          key={date.id}
                          label={date.description}
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
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Citations
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Citations' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Citations' name='citations' />
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
                <Tooltip title='Produced By' placement='right'>
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
                  Has Part
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Dataset parts' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Has Part' name='hasPart' />
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
                  Refinement
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Refinement' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Refinement' name='refinement' />
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
                  Aggregation
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Aggregation' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField
              fullWidth
              placeholder='Aggregation'
              name='aggregation'
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
                <Tooltip title='Spatial Coverage' placement='right'>
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
