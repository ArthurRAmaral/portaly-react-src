//From dependencies
import React from "react";

//Material-ui
import Grid from '@material-ui/core/Grid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import useStyles from './styles/styleTopHeader'

const TopHeader = () => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.root}>
      <Grid item className={classes.hover} >
        <WhatsAppIcon className={classes.icon} />
        <Typography variant="span" className={classes.span}> (31) 2522-2915 </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Grid item>
        <AccessTimeIcon className={classes.icon} />
        <Typography variant="span" className={classes.span}> Segunda a Sexta 8a.m 18p.m </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem className={classes.divider} />
    </Grid>
  );
};

export default TopHeader;
