import React, { Component, Fragment } from "react";
import Carrinho from "../util/Carrinho";
import ApiWooCommerce from "../util/ApiWooCommerce";
import MostraProdutos from "../components/MostraProdutos";
import LineLoaging from "../components/loading/LineLoading";

class PaginaCarrinho extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
      };
   }

   componentDidMount() {
      this.recebeProdutosNoCarrinho();
   }

   recebeProdutosNoCarrinho() {
      const itens = Carrinho.getItensCarrinho();

      for (const item of itens) {
         ApiWooCommerce.getProduto(item.id)
            .then((response) => {
               console.log(response.data);
               this.setState({
                  produtos: [...this.state.produtos, response.data],
               });
            })
            .catch((error) => {
               console.log("Carregando");
            });
      }
   }

   render() {
      Carrinho.setCarrinho();
      console.log(this.state);

      return (
         <Fragment>
            {this.state.produtos.length > 0
               ? MostraProdutos(this.state.produtos)
               : LineLoaging()}
         </Fragment>
      );
   }
}

export default PaginaCarrinho;
