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
  Radio,
  Box
} from '@material-ui/core'
import { FieldArray } from 'formik'
import Section from '../../layout/Section'
import SectionTitle from '../../layout/SectionTitle'
import FieldGroup from '../../layout/FieldGroup'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'
import CustomRadioGroup from '../../fields/CustomRadioGroup'
import InfoIcon from '@material-ui/icons/Info'
import CancelIcon from '@material-ui/icons/Cancel'

export default function GeneralForm(props) {
  const { classes, values } = props
  return (
    <React.Fragment>
      <Typography variant='h5' gutterBottom>
        General Information
      </Typography>
      <Section>
        <SectionTitle name='Title' tooltip='The Title of the Dataset' />
        <CustomTextField
          required
          fullWidth
          name='title'
          label='Dataset Title'
        />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Creators' tooltip='Dataset Contributors' />
        <FieldArray name='creators'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.creators.map((creator, index) => {
                return (
                  <FieldGroup
                    key={'creator_' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      fullWidth
                      label='Name/Institution'
                      name={`creators.${index}.name`}
                    />
                    <CustomTextField
                      fullWidth
                      label='Email'
                      name={`creators.${index}.email`}
                    />
                    <CustomSelectField
                      name={`creators.${index}.role`}
                      label='Role'
                      required
                    >
                      <MenuItem value='pi'>Principal Investigator</MenuItem>
                      <MenuItem value='contributor'>Contributor</MenuItem>
                    </CustomSelectField>
                  </FieldGroup>
                )
              })}
              <Box py={1}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    arrayHelpers.push({
                      type: 'contributor',
                      name: '',
                      email: ''
                    })
                  }}
                >
                  Add another Creator
                </Button>
              </Box>
            </Box>
          )}
        </FieldArray>
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle name='Description' tooltip='Description of the Dataset' />
        <CustomTextField
          required
          fullWidth
          label='Description'
          name='description'
          multiline
          rows={4}
        />
      </Section>
      <Divider variant='middle' />
      <Section>
        <SectionTitle
          name='Data Types'
          tooltip='The data types included in the dataset'
        />
        <FieldArray name='types'>
          {(arrayHelpers) => (
            <Box display='flex flex-column'>
              {values.types.map((type, index) => {
                return (
                  <FieldGroup
                    key={'type' + index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                  >
                    <CustomTextField
                      required
                      fullWidth
                      label='Type'
                      name={`types.${index}`}
                    />
                  </FieldGroup>
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
            </Box>
          )}
        </FieldArray>
      </Section>
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
                        key={'license_' + index}
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
                              color='default'
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
                        key={'keyword_' + index}
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
                              color='default'
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
