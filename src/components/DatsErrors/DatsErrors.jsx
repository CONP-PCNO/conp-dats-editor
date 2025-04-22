import React from 'react'
import Typography from '@material-ui/core/Typography'

function genErrorString(errors) {
  if (!errors) {
    return '' // Retourne une chaîne vide ou un message d'erreur par défaut
  }
  if (typeof errors === 'string') {
    return errors // Retourne directement la chaîne si c'est une chaîne d'erreur
  }
  if (Array.isArray(errors)) {
    return errors
      .map((err, index) => {
        if (typeof err === 'object' && err !== null) {
          return `Item ${index}: ${genErrorString(err)}`
        }
        return typeof err === 'string' ? err : JSON.stringify(err)
      })
      .join('; ')
  }
  if (typeof errors === 'object' && errors !== null) {
    return Object.keys(errors)
      .map((key) => {
        return `${key}: ${genErrorString(errors[key])}`
      })
      .join('; ')
  }
  return JSON.stringify(errors)
}

function warningFromKey(key, errors, touched) {
  if (!Object.keys(touched).includes(key)) {
    return null
  }

  return (
    <Typography gutterBottom key={`${Math.random()}`} variant='subtitle1'>
      {`${key}: ${genErrorString(errors[key])}`}
    </Typography>
  )
}

export default function DatsErrors(props) {
  const { errors, touched, className, formEmpty } = props
  if (Object.keys(errors).length === 0) {
    return null
  }

  const warnings = Object.keys(errors)
    .map((key) => warningFromKey(key, errors, touched))
    .filter((x) => x !== null)
  if (warnings.length === 0) {
    return null
  }
  return (
    <div className={className}>
      <Typography gutterBottom variant='h6'>
        To successfully create the DATS.json file, you must first resolve issues
        with the following fields:
      </Typography>

      {warnings}

      {formEmpty ? (
        <Typography gutterBottom variant='subtitle1'>
          All fields are empty
        </Typography>
      ) : null}
    </div>
  )
}
