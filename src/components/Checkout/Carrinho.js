//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";

//From checkout
import MostraProdutos from "./MostraProdutosCarrinho";
import SemProduto from "../semProdutos";

//From redux
import { removeCart } from "../../redux/actions/cartActions";
import { salvaCupom } from "../../redux/actions/cupomActions";

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupon: "",
    };
  }

  handleChange = async (e) => {
    this.setState({ coupon: e.target.value });
  };

  handleClick = () => {
    this.props.salvaCupom(this.state.coupon);
  };

  render() {
    return (
      <Fragment>
        {this.props.carrinho.quantidade ? (
          MostraProdutos(this.props.carrinho, this.props.removeCart)
        ) : (
          <SemProduto />
        )}
        <TextField
          id="coupon"
          onChange={this.handleChange}
          label="Cupom"
          value={this.state.coupon}
          variant="outlined"
        />
        <button onClick={this.handleClick}>Aplicar</button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
  cupom: state.cupom,
});

const mapDispatchToProps = { removeCart, salvaCupom };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCarrinho);
