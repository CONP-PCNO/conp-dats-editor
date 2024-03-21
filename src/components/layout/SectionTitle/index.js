import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

const SectionTitle = (props) => {
  const classes = useStyles();
  return (
    <Box display='flex flex-column'>
      <Typography variant={props.subsection ? 'subtitle1' : 'h6'} gutterBottom className={props.isDisabled ? classes.disabled : ''}>
        {props.name}
      </Typography>
      <Typography variant='caption' className={props.isDisabled ? classes.disabled : ''}>
        <div dangerouslySetInnerHTML={{ __html: props.tooltip }} />
      </Typography>
    </Box>
  )
}

export default SectionTitle
