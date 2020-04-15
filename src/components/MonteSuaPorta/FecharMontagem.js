import React, { Component, Fragment } from "react";
import funcoesApiWooCommerce from "../../util/ApiWooCommerce";
import MostraProdutosFinal from "./MostraProdutosMontagemFinal";
import CircleLoading from "../loading/CircleLoading";

import Montador from "../../util/MontadorPorta";

class EscolherItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtosSelecionados: Montador.getMontador(),
         produtos: null,
      };
   }

   componentDidMount() {
      let vet = [];
      this.state.produtosSelecionados.forEach((id, indx) => {
         funcoesApiWooCommerce.getProduto(id).then((res) => {
            vet.push(res.data);
            if (indx === this.state.produtosSelecionados.length - 1)
               this.setState({ produtos: vet });
         });
      });
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos ? (
               <MostraProdutosFinal
                  key={this.state.categoriaID}
                  produtos={this.state.produtos}
               />
            ) : (
               <CircleLoading />
            )}
         </Fragment>
      );
   }
}

export default EscolherItems;
