//From dependencies
import React, { Component } from "react";
import Carrinho from "../../../util/Carrinho";
import ApiProdutos from "../../../services/ApiProdutos";
import { NavLink } from "react-router-dom";
import InitPath from "../../../services/InitPath";

//From Material-ui
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";

//From utils
import colors from "../../../util/Colors";

class CarrinhoCompras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valor: 0,
    };
  }

  async componentDidMount() {
    const itens = Carrinho.getItensCarrinho();
    let val = 0;
    itens.forEach((element) => {
      ApiProdutos.getProduto(element.product_id).then((res) => {
        val = this.state.valor += parseFloat(res.data.price) * element.quantity;
        this.setState({ valor: val });
      });
    });
  }

  render() {
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
          }}
        >
          <ShoppingCartIcon size="large" />
          <TrendingFlatIcon />
          <span id="value">
            R$: {(Math.round(this.state.valor * 100) / 100).toFixed(2)}
          </span>
        </Grid>
      </NavLink>
    );
  }
}

export default CarrinhoCompras;
