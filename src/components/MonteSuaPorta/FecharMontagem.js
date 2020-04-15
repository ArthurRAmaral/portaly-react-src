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
      if (
         this.state.produtosSelecionados &&
         this.state.produtosSelecionados.length > 0
      ) {
         let vet = [];
         let qnt = 0;
         this.state.produtosSelecionados.forEach((id) => {
            funcoesApiWooCommerce.getProduto(id).then((res) => {
               vet.push(res.data);
               qnt++;
               if (qnt === this.state.produtosSelecionados.length)
                  this.setState({ produtos: vet });
            });
         });
      } else {
         this.setState({ produtos: [] });
      }
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos ? (
               this.state.produtos.length > 0 ? (
                  <MostraProdutosFinal
                     key={this.state.categoriaID}
                     produtos={this.state.produtos}
                  />
               ) : (
                  <div>{"Nenhum produto selecionado"}</div>
               )
            ) : (
               <CircleLoading />
            )}
         </Fragment>
      );
   }
}

export default EscolherItems;
