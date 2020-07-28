import React from 'react'
import { Grid, Typography, Button, Chip } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'

export default function Review(props) {
  const { values, setFieldValue } = props
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          CONP status
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='CONP status'
          name='conpStatus'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Derived From
        </Typography>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              placeholder='Derived From'
              name='derivedFrom'
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              placeholder='Parent dataset id'
              name='parentDatasetId'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Primary Publications
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='Primary Publications'
          name='primaryPublications'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Dimensions
        </Typography>
        <CustomTextField fullWidth placeholder='Dimensions' name='dimensions' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Identifier
        </Typography>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              placeholder='Identifier'
              name='identifier.name'
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              placeholder='Source'
              name='identifier.source'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Contact
        </Typography>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs={6}>
            <CustomTextField fullWidth placeholder='Name' name='contact.name' />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              fullWidth
              placeholder='Email'
              name='contact.email'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Logo
        </Typography>
        <CustomTextField fullWidth placeholder='Logo' name='logo' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Dates
        </Typography>
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
                  placeholder='Description'
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
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Citations
        </Typography>
        <CustomTextField fullWidth placeholder='Citations' name='citations' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Produced by
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='Produced By'
          name='producedBy'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Is About
        </Typography>
        <CustomTextField fullWidth placeholder='Is About' name='isAbout' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Has Part
        </Typography>
        <CustomTextField fullWidth placeholder='Has Part' name='hasPart' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Acknowledges
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='Acknowledges'
          name='acknowledges'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Refinement
        </Typography>
        <CustomTextField fullWidth placeholder='Refinement' name='refinement' />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Aggregation
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='Aggregation'
          name='aggregation'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Spatial Coverage
        </Typography>
        <CustomTextField
          fullWidth
          placeholder='Spatial Coverage'
          name='spatialCoverage'
        />
      </Grid>
    </React.Fragment>
  )
}
