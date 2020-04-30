//From dependencies
import React, { Fragment } from "react";

//From components
import Logo from "../Logo/Logo";
import Busca from "../Busca/Busca";
import Carrinho from "../Carrinho/Carrinho";
import Categorias from "../Categorias/Categorias";

//From utils
import colors from "../../../util/Colors";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import useStyles from "./style";
import Box from "@material-ui/core/Box";

const MainHeader = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className={classes.root}
        >
          <Logo />
          <Busca />
          <Carrinho />
        </Grid>
        <Box
          className="classes.nav"
          borderTop={2}
          borderColor={colors.orangeLight}
          component="div"
          flexGrow={1}
          bgcolor={colors.orangeLightLight}
        >
          <Categorias />
        </Box>
      </Grid>
    </Fragment>
  );
};

export default MainHeader;
