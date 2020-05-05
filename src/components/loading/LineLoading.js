import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import colors from "../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: colors.orangeLight,
  },
  barColorPrimary: {
    backgroundColor: colors.orangeDarkDark,
  },
})(LinearProgress);

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorLinearProgress />
    </div>
  );
}
