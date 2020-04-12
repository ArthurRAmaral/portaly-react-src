import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../util/ApiWooCommerce";
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos";
import Carrinho from "../util/Carrinho";

class ProdutosBuscado extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
      };
   }

   componentDidMount() {
      const value = this.props.match.params.value;

      ApiWooCommerce.getAll().then((res) => {
         let produtos = res.data.filter((produto) =>
            produto.name.toString().toUpperCase().includes(value.toUpperCase())
         );

         console.log(produtos);

         this.setState({
            produtos: [...this.state.produtos, ...produtos],
         });
      });
   }

   render() {
      Carrinho.setCarrinho();

      return (
         <Fragment>
            {this.state.produtos.length > 0 ? (
               MostrarProdutos(this.state.produtos)
            ) : (
               <LineLoading />
            )}
         </Fragment>
      );
   }
}

export default ProdutosBuscado;
