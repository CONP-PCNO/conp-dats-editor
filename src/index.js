import React from "react";
import {
  Formik,
  Field,
  Form,
  FieldArray
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem
} from "@material-ui/core";

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as yup from "yup";

import { makeStyles } from '@material-ui/core/styles';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));



export const DatsCreatorGui = () => {

  const classes = useStyles();

  return (

    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create DATS.json
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              title: "",
              description: "",
              types: [],
              license: "",
              keywords: [],
              creators: []
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              // make async call
              console.log("submit: ", data);
              setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <Typography variant="h6" gutterBottom>
                  General Information
              </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      placeholder="Title"
                      name="title"
                      type="input"
                      as={TextField}
                    />
                  </Grid>
                  <Typography variant="h6" gutterBottom>
                  Creators
              </Typography>
                  <Grid item xs={12}>
                    <FieldArray name="creators">
                      {arrayHelpers => (
                        <div>
                          <Button
                            onClick={() =>
                              arrayHelpers.push({
                                type: "frog",
                                name: "",
                                id: "" + Math.random()
                              })
                            }
                          >
                          Add a Creator
                        </Button>
                          {values.creators.map((creator, index) => {
                            return (
                              <div key={creator.id}>
                                <MyTextField
                                  placeholder="Name"
                                  name={`creators.${index}.name`}
                                />
                                <Field
                                  name={`creators.${index}.type`}
                                  type="select"
                                  as={Select}
                                >
                                  <MenuItem value="cat">cat</MenuItem>
                                  <MenuItem value="dog">dog</MenuItem>
                                  <MenuItem value="frog">frog</MenuItem>
                                </Field>
                                <Button onClick={() => arrayHelpers.remove(index)}>
                                  x
                        </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      placeholder="Description"
                      name="description"
                      type="input"
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div>Types:</div>
                    <Field
                      name="types"
                      type="checkbox"
                      value="type1"
                      as={Checkbox}
                    />
                    <Field
                      name="types"
                      type="checkbox"
                      value="type2"
                      as={Checkbox}
                    />
                    <Field
                    name="types"
                    type="checkbox"
                    value="type3"
                    as={Checkbox} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      placeholder="License"
                      name="license"
                      type="input"
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      placeholder="Keywords"
                      name="keywords"
                      type="input"
                      as={TextField}
                    />
                  </Grid>
    
                  <div>
                    <Button disabled={isSubmitting} type="submit">
                      submit
              </Button>
                  </div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </React.Fragment>
  );
};
