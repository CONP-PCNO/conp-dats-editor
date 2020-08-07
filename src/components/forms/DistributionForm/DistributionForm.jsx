import React from 'react'
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Chip,
  Divider
} from '@material-ui/core'
import { FieldArray } from 'formik'
import CustomTextField from '../../fields/CustomTextField'
import CustomSelectField from '../../fields/CustomSelectField'

export default function GeneralForm(props) {
  const { classes, values, setFieldValue } = props
  return (
    <React.Fragment>
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Formats
            </Typography>
            <FieldArray name='formats'>
              {(arrayHelpers) => (
                <Grid container item spacing={3} xs={12}>
                  <Grid item xs={9}>
                    <CustomTextField
                      fullWidth
                      placeholder='Format'
                      name='format'
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => {
                        arrayHelpers.push(values.format)
                        setFieldValue({
                          type: ''
                        })
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    {values.formats.map((format, index) => {
                      return (
                        <Chip
                          key={'' + Math.random()}
                          label={format}
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
            <Typography variant='h6' gutterBottom>
              Size
            </Typography>
            <Grid container item spacing={3} xs={12}>
              <Grid item xs={9}>
                <CustomTextField
                  fullWidth
                  placeholder='Size'
                  name='size.value'
                />
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
            <Typography variant='h6' gutterBottom>
              Landing Page
            </Typography>
            <CustomTextField
              fullWidth
              placeholder='Landing Page'
              name='landingPage'
            />
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Privacy
            </Typography>
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
            <Typography variant='h6' gutterBottom>
              Files
            </Typography>
            <CustomTextField fullWidth placeholder='Files' name='files' />
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Subjects
            </Typography>
            <CustomTextField fullWidth placeholder='Subjects' name='subjects' />
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.section}>
        <Grid container spacing={3}>
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
        </Grid>
      </div>
    </React.Fragment>
  )
}
