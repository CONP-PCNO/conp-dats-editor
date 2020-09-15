import React from 'react'
import { Grid, Typography, Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const SectionTitle = (props) => {
  return (
    <Grid item xs={12}>
      <Grid container direction='row' spacing={1}>
        <Grid item>
          <Typography
            variant={props.subsection ? 'subtitle1' : 'h6'}
            gutterBottom
          >
            {props.name}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={props.tooltip} placement='right'>
            <InfoIcon fontSize='small' color='action' />
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SectionTitle
