import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import theme from "./theme";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    alignItems: theme.shape,
    minHeight: theme.spacing(50),
    width: theme.spacing(100),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
