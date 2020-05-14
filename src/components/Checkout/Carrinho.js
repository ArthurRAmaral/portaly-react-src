import React, { Fragment } from "react";
import { connect } from "react-redux";

import MostraProdutos from "./MostraProdutosCarrinho";
import SemProduto from "../semProdutos";

function PaginaCarrinho(props) {
  return (
    <Fragment>
      {props.carrinho.quantidade ? (
        MostraProdutos(props.carrinho)
      ) : (
        <SemProduto />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({ carrinho: state.carrinho });

// const mapDispatchToProps = { addCart };

export default connect(mapStateToProps, null)(PaginaCarrinho);
