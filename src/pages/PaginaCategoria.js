import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../util/ApiWooCommerce";
import MostraProdutos from "../components/MostraProdutos"
import Loaging from "../components/Loading"
import Carrinho from "../util/Carrinho";

class PaginaCategorias extends Component {

   constructor(props) {
      super(props)

      this.state = {
         produtos: []
      }
   }

   componentDidMount() {
      const id = this.props.match.params;
      ApiWooCommerce.getCategoria(id.id)
         .then(res => {
            this.setState({ produtos: [...this.state.produtos, ...res.data] });
         })
         .catch(console.log("Erro"))
   }

   render() {

      Carrinho.setCarrinho();

      return (
         <Fragment>
            {this.state.produtos.length > 0 ? MostraProdutos(this.state.produtos) : Loaging()}
         </Fragment>
      )
   }
}

export default PaginaCategorias;


