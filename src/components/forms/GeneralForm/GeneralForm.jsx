import React from 'react'
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Tooltip,
  IconButton,
  Divider,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'
import InfoIcon from '@material-ui/icons/Info'
import CancelIcon from '@material-ui/icons/Cancel'

export default function GeneralForm(props) {
  const { classes, values } = props
  return (
    <React.Fragment>
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Typography variant='h5' gutterBottom>
            General Information
          </Typography>
          <Grid item xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item>
                <Typography variant='h6' gutterBottom>
                  Title
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Title of the Dataset' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField
              required
              fullWidth
              name='title'
              label='Dataset Title'
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
                  Creators
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Dataset Contributors' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='creators'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.creators.map((creator, index) => {
                    return (
                      <Grid key={creator.id} container item spacing={3} xs={12}>
                        <Grid item xs={6}>
                          <CustomTextField
                            required
                            fullWidth
                            label='Name/Institution'
                            name={`creators.${index}.name`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextField
                            fullWidth
                            label='Email'
                            name={`creators.${index}.email`}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <CustomSelectField
                            name={`creators.${index}.type`}
                            label='Role'
                            required
                          >
                            <MenuItem value='pi'>
                              Principal Investigator
                            </MenuItem>
                            <MenuItem value='contributor'>Contributor</MenuItem>
                          </CustomSelectField>
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
                        arrayHelpers.push({
                          type: 'contributor',
                          name: '',
                          email: '',
                          id: '' + Math.random()
                        })
                      }}
                    >
                      Add another Creator
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
                  Description
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Description of the Dataset' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <CustomTextField
              required
              fullWidth
              label='Description'
              name='description'
              multiline
              rows={4}
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
                  Data Types
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='The date types included in the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='types'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.types.map((type, index) => {
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
                            label='Type'
                            name={`types.${index}`}
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
                      Add another Type
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
                  Version
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title='Version number of the dataset'
                  placement='right'
                >
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <CustomTextField fullWidth label='Version' name='version' />
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
                  Licenses
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Dataset Licenses' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='licenses'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.licenses.map((license, index) => {
                    return (
                      <Grid
                        key={'' + Math.random()}
                        container
                        item
                        spacing={3}
                        xs={12}
                      >
                        <Grid item xs={3}>
                          <CustomRadioGroup
                            name={`licenses.${index}.type`}
                            label='Type'
                          >
                            <FormControlLabel
                              value='creativeCommons'
                              control={<Radio />}
                              label='Creative Commons'
                            />
                            <FormControlLabel
                              value='other'
                              control={<Radio />}
                              label='Other'
                            />
                          </CustomRadioGroup>
                        </Grid>
                        <Grid item xs={6}>
                          {license.type === 'creativeCommons' ? (
                            <CustomSelectField
                              required
                              label='License'
                              name={`licenses.${index}.value`}
                            >
                              <MenuItem value='CC BY'>CC BY</MenuItem>
                              <MenuItem value='CC BY-SA'>CC BY-SA</MenuItem>
                              <MenuItem value='CC BY-NC'>CC BY-NC</MenuItem>
                              <MenuItem value='CC BY-NC-SA'>
                                CC BY-NC-SA
                              </MenuItem>
                              <MenuItem value='CC BY-ND'>CC BY-ND</MenuItem>
                              <MenuItem value='CC BY-NC-ND'>
                                CC BY-NC-ND
                              </MenuItem>
                            </CustomSelectField>
                          ) : (
                            <CustomTextField
                              fullWidth
                              label='License'
                              name={`licenses.${index}.value`}
                            />
                          )}
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
                        arrayHelpers.push({
                          type: 'creativeCommons',
                          value: ''
                        })
                      }}
                    >
                      Add another License
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
                  Keywords
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Dataset Keywords' placement='right'>
                  <InfoIcon fontSize='small' color='action' />
                </Tooltip>
              </Grid>
            </Grid>
            <FieldArray name='keywords'>
              {(arrayHelpers) => (
                <Grid container item spacing={5} xs={12}>
                  {values.keywords.map((keyword, index) => {
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
                            label='Keyword'
                            name={`keywords.${index}`}
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
                      Add another Keyword
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
