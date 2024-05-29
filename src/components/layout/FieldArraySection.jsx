import React, { useEffect } from 'react'
import { FieldArray, useFormikContext, getIn } from 'formik'
import Section from '../layout/Section'
import SectionTitle from '../layout/SectionTitle'
import { Button, Box } from '@material-ui/core'
import FieldGroup from '../layout/FieldGroup'
import parseValues from '../../model/fieldParsing'

export default function FieldArraySection(props) {
  const {
    isExperiment,
    isRequired,
    jsonField,
    setupProps,
    nameAttr,
    values,
    ...fieldProps
  } = props
  const selfString = isExperiment ? 'experiment' : 'dataset'
  const { name, description, fieldName } = parseValues(setupProps, selfString)
  const requiredStar = isRequired ? ' *' : ''
  const JsonField = jsonField
  //const [initialized, setInitialized] = React.useState(false); 
  // Utiliser FormikContext pour accéder aux erreurs et au statut touched de Formik
  const { errors, touched, setFieldValue } = useFormikContext();
  // console.log('bigger values', values, fieldName)

  // Utilisez useEffect pour initialiser les valeurs si nécessaire
  useEffect(() => {
    if ((nameAttr === 'types' || nameAttr === 'keywords' || nameAttr === 'licenses' || nameAttr === 'experimentsFunctionAssessed' || nameAttr === 'experimentsModalities' || nameAttr === 'experimentsLanguages') && values.length === 0) {
      setFieldValue(nameAttr, ['']);
    }
  }, [nameAttr, values.length, setFieldValue]);

  return (
    <Section>
      <SectionTitle name={`${name}${requiredStar}`} tooltip={description} />
      <FieldArray name={nameAttr}>
        {(arrayHelpers) => (
          <Box display="flex flex-column">
            {values.map((value, index) => {
              const fieldPath = `${nameAttr}[${index}]`;
              const errorText = getIn(errors, fieldPath); // Get error message
              const touchedField = getIn(touched, fieldPath); // Check if field was touched
              const isError = touchedField && !!errorText; // Display error only if field was touched

              return (
                <FieldGroup
                  arrayHelpers={arrayHelpers}
                  index={index}
                  key={`${fieldName}${index}`}
                  name={`${fieldName}${index}`}
                >
                  <JsonField
                    isExperiment={isExperiment}
                    isRequired={isRequired}
                    nameAttr={`${nameAttr}.${index}`}
                    setupProps={setupProps}
                    value={value}
                    {...fieldProps}
                  />
                </FieldGroup>
              );
            })}
            <Box py={1}>
              <Button
                color="secondary"
                onClick={() => arrayHelpers.push('')}
                variant="outlined"
              >
                {values.length > 0 ? `Add another ${fieldName}` : `Add a ${fieldName}`}
              </Button>
            </Box>
          </Box>
        )}
      </FieldArray>
    </Section>
  );
}