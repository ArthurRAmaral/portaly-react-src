import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../util/ApiWooCommerce";
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos";
import Carrinho from "../util/Carrinho";

const HomePage = (produtos) => {
 
      Carrinho.setCarrinho();

      return (
         <Fragment>
            {produtos.length > 0 ? (
               MostrarProdutos(produtos)
            ) : (
               <LineLoading />
            )}
         </Fragment>
      );
}

export default HomePage;

