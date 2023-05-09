import React from 'react'
import Typography from '@material-ui/core/Typography'

function genErrorString(key, errors) {
  if (Array.isArray(errors[key])) {
    return errors[key].map((err) => Object.values(err))
  }
  return JSON.stringify(errors[key])
}

function warningFromKey(key, errors, touched) {
  if (!Object.keys(touched).includes(key)) {
    return null
  }

  return (
    <Typography gutterBottom key={`${Math.random()}`} variant='subtitle1'>
      {`${key}: ${genErrorString(key, errors)}`}
    </Typography>
  )
}

export default function DatsErrors(props) {
  const { errors, touched, className } = props

  if (Object.keys(errors).length === 0) {
    return null
  }

  return (
    <div className={className}>
      <Typography gutterBottom variant='h6'>
        To successfully create the DATS.json file, you must first resolve issues
        with the following fields:
      </Typography>

      {Object.keys(errors).map((key) => warningFromKey(key, errors, touched))}
    </div>
  )
}
