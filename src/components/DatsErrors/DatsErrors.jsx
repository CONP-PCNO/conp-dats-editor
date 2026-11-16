import React from 'react'
import Typography from '@material-ui/core/Typography'
import fieldDescriptions from '../../model/fieldDescriptions.json'

// Field names as the form shows them, for keys that fieldDescriptions.json
// doesn't name (or names differently).
const LABELS = {
  registrationPageURL: 'Registration page',
  reb_info: 'Ethics statement',
  reb_number: 'Ethics committee approval number',
  files: 'Number of files',
  subjects: 'Number of subjects',
  primaryPublications: 'Primary publications',
  isAbout: 'Is about (species)',
  experimentsRequiredSoftware: 'Software'
}

export function fieldLabel(key, isExperiment) {
  if (LABELS[key]) return LABELS[key]
  const d = fieldDescriptions[key]
  const name = d && d.name
  if (typeof name === 'string') return name
  if (name && typeof name === 'object') return name[isExperiment ? 'experiment' : 'dataset'] || name.dataset
  return key
}

// yup's default messages name the internal path ("size.value is a required
// field"); say what to do instead.
export function plainMessage(message) {
  const m = String(message || '')
  if (/^[\w.[\]]+ is a required field$/.test(m)) return 'This is required.'
  if (/must be a `number` type/.test(m)) return 'Enter a number.'
  if (/must be a valid URL$/.test(m)) return 'Enter a web address starting with https://'
  if (/^[\w.[\]]+ field must have at least \d+ items?$/.test(m)) return 'Add at least one.'
  return m
}

// Every message in an error value (string, array of item errors, or object of
// sub-field errors), once each, with item numbers starting at 1.
export function errorMessages(errors, prefix = '') {
  if (!errors) return []
  if (typeof errors === 'string') return [prefix + plainMessage(errors)]
  if (Array.isArray(errors)) {
    return errors.flatMap((err, index) =>
      err ? errorMessages(err, typeof err === 'string' ? prefix : `${prefix}item ${index + 1} › `) : []
    )
  }
  if (typeof errors === 'object') {
    return Object.keys(errors).flatMap((key) => errorMessages(errors[key], prefix))
  }
  return [prefix + String(errors)]
}

function warningFromKey(key, errors, touched, isExperiment) {
  if (!Object.keys(touched).includes(key)) {
    return null
  }
  const messages = Array.from(new Set(errorMessages(errors[key])))
  return (
    <li key={key}>
      <Typography component='span' variant='subtitle1'>
        <strong>{fieldLabel(key, isExperiment)}</strong>: {messages.join(' ')}
      </Typography>
    </li>
  )
}

export default function DatsErrors(props) {
  const { errors, touched, className, formEmpty, isExperiment } = props
  if (Object.keys(errors).length === 0) {
    return null
  }

  const warnings = Object.keys(errors)
    .map((key) => warningFromKey(key, errors, touched, isExperiment))
    .filter((x) => x !== null)
  if (warnings.length === 0) {
    return null
  }
  return (
    <div className={className} role='alert'>
      <Typography gutterBottom variant='h6'>
        Before the file can be created, please complete or correct:
      </Typography>

      <ul>{warnings}</ul>

      {formEmpty && <Typography gutterBottom variant='subtitle1'>All fields are empty.</Typography>}
    </div>
  )
}
