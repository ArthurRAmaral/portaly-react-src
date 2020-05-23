//From dependencies
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

//From services
import InitPath from "../../../services/InitPath";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";

//From utils
import colors from "../../../util/Colors";

function CarrinhoCompras(props) {
  return (
    <NavLink key={`carrinho`} to={`${InitPath}/meuCarrinho`}>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        style={{
          color: colors.gray,
          backgroundColor: colors.orangeLight,
          width: "100%",
          height: "100%",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <ShoppingCartIcon size="large" />
        <TrendingFlatIcon />
        <span id="value">R$: {props.valorTotal}</span>
      </Grid>
    </NavLink>
  );
}

const mapStateToProps = (state) => ({ valorTotal: state.carrinho.valorTotal });

export default connect(mapStateToProps, null)(CarrinhoCompras);
