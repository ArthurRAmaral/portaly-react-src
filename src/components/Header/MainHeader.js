//From dependencies
import React, { Fragment } from "react";

//From components
import Logo from "./Logo";
import Busca from "./Busca";
import Carrinho from "./Carrinho";
import Categorias from "./Categorias";

//Material-ui
import Grid from '@material-ui/core/Grid';
import useStyles from './styles/styleMainheader'


const MainHeader = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div>
        <Grid container direction="row" justify="space-between" alignItems="center"
          className={classes.root}>
          <Logo />
          <Busca />
          <Carrinho />
        </Grid>
        <nav className="menu brown darken-1 center-align">
          <Categorias />
        </nav>
      </div>
    </Fragment>
  );
};

export default MainHeader;
