//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From checkout
import MostraProdutos from "./MostraProdutosCarrinho";
import SemProduto from "../semProdutos";

//From redux
import { removeCart } from "../../redux/actions/cartActions";

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupon: "só quero testar ",
    };
  }

  render() {
    return (
      <Fragment>
        {this.props.carrinho.quantidade ? (
          MostraProdutos(this.props.carrinho, this.props.removeCart)
        ) : (
          <SemProduto />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ carrinho: state.carrinho });

const mapDispatchToProps = { removeCart };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCarrinho);
