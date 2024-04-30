import React from 'react'
import Typography from '@material-ui/core/Typography'

function genErrorString(key, errors) {
  if (!errors[key]) {
    return ''; // Retourne une chaîne vide ou un message d'erreur par défaut
  }
  if (Array.isArray(errors[key])) {

    //return errors[key].map((err) => Object.values(err))
    //return errors[key].map((err) => err ? Object.values(err).join(', ') : '').join('; ');

    return errors[key].map(err => {
      // Vérifie si l'erreur est un objet et le transforme en chaîne
      // Sinon, retourne l'erreur telle quelle si elle est déjà une chaîne
      if (typeof err === 'object' && err !== null && !(err instanceof Array)) {
        return Object.values(err).join(', ');
      }
      // Si l'erreur est une autre structure (comme un tableau ou autre), on la convertit en JSON
      return typeof err === 'string' ? err : JSON.stringify(err);
    }).join('; ');
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
  const { errors, touched, className, next } = props
  if (Object.keys(errors).length === 0) {
    return null
  }
  
  // Calculer les warnings à partir des erreurs
  const warnings = Object.keys(errors).map(key => warningFromKey(key, errors, touched)).filter(x => x !== null);
  // Si aucun warning valide n'est généré, ne rien rendre
  if (warnings.length === 0) {
    return null;
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
