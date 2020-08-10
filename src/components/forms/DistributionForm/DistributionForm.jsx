import React from 'react'
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Divider,
  Tooltip,
  IconButton
} from '@material-ui/core'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import InfoIcon from '@material-ui/icons/Info'
import CancelIcon from '@material-ui/icons/Cancel'

export default function GeneralForm(props) {
  const { classes, values } = props
  return (
    <React.Fragment>
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Formats
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The formats included in the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='formats'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.formats.map((format, index) => {
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
                            label='Format'
                            name={`formats.${index}`}
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
                  })}
                  <Grid item xs={6}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        arrayHelpers.push('')
                      }}
                    >
                      Add another Format
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
                  Size
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Size of the Dataset' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={9}>
                <CustomTextField fullWidth label='Size' name='size.value' />
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
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Access
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='How to Access the Dataset' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label='Landing Page'
                  name='access.landingPage'
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelectField
                  fullWidth
                  label='Authorization'
                  name='access.authorization'
                >
                  <MenuItem value='public'>Public</MenuItem>
                  <MenuItem value='registered'>Registered</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>
                </CustomSelectField>
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
                  Privacy
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Dataset Privacy' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomSelectField name='privacy' label='Privacy'>
              <MenuItem value='public'>Public</MenuItem>
              <MenuItem value='registered'>Registered</MenuItem>
              <MenuItem value='private'>Private</MenuItem>
            </CustomSelectField>
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
                  Files
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Number of files in the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Files' name='files' />
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
                  Subjects
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Number of subjects in the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField fullWidth label='Subjects' name='subjects' />
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
                  CONP status
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='CONP status' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomSelectField name='conpStatus' label='CONP Status'>
              <MenuItem value='conp'>CONP</MenuItem>
              <MenuItem value='canadian'>Canadian</MenuItem>
              <MenuItem value='external'>External</MenuItem>
            </CustomSelectField>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}
