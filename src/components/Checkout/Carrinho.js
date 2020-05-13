import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Carrinho from "../../util/Carrinho";
import ApiProdutos from "../../services/ApiProdutos";

import MostraProdutos from "./MostraProdutosCarrinho";
import LineLoaging from "../loading/LineLoading";
import SemProduto from "../semProdutos";

function PaginaCarrinho(props) {
  return (
    <Fragment>
      {props.carrinho ? MostraProdutos(props.carrinho) : <SemProduto />}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ carrinho: state.carrinho });

// const mapDispatchToProps = { addCart };

export default connect(mapStateToProps, null)(PaginaCarrinho);
