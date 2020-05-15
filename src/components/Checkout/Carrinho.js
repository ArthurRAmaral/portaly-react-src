//From depedencies
import React, { Fragment } from "react";
import { connect } from "react-redux";

//From checkout
import MostraProdutos from "./MostraProdutosCarrinho";
import SemProduto from "../semProdutos";

//From redux
import { removeCart } from "../../redux/actions/cartActions";

function PaginaCarrinho(props) {
  return (
    <Fragment>
      {props.carrinho.quantidade ? (
        MostraProdutos(props.carrinho, props.removeCart)
      ) : (
        <SemProduto />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ carrinho: state.carrinho });

const mapDispatchToProps = { removeCart };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCarrinho);
