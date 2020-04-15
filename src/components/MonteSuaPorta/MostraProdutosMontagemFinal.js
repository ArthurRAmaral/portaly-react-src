import React, { Component } from "react";
import imgDefault from "../../assets/imgDefault.png";
import "../../css/components/MonteSuaPorta/MostrarProdutosFinal.css";

import Montador from "../../util/MontadorPorta";

class MostrarProdutosMontagem extends Component {
   constructor(props) {
      Montador.resetMontadorIfEmpty();

      super(props);

      this.state = {
         produtosSelcionados: Montador.getMontador(),
         produtos: this.props.produtos,
         selected: null,
      };
   }

   // handleSelect(id) {
   //    let vet = this.state.produtosSelcionados;
   //    const verif = vet.includes(id);

   //    this.state.produtos.forEach((prod) => {
   //       if (vet.indexOf(prod.id) >= 0) {
   //          vet.splice(vet.indexOf(prod.id), 1);
   //       }
   //    });
   //    if (!verif) vet.push(id);

   //    Montador.setMontador(vet);
   //    this.setState({ produtosSelcionados: vet });
   // }

   render() {
      return (
         <section className="center-align produtos-list">
            {this.state.produtos.length > 0 ? (
               this.state.produtos.map((produto) => {
                  return (
                     <div
                        className="produto-final"
                        // onClick={() => this.handleSelect(produto.id)}
                        key={`intem-${produto.id}`}
                     >
                        <img
                           key={produto.id}
                           src={
                              produto.images.length > 0
                                 ? produto.images[0].src
                                 : imgDefault
                           }
                           alt=""
                        />
                        <div className="produto-dados-montagem">
                           <p className="nome">{produto.name}</p>
                           <p className="preco">R$: {produto.price}</p>
                        </div>
                     </div>
                  );
               })
            ) : (
               <div>Nenhum produto encontrado</div>
            )}
         </section>
      );
   }
}

export default MostrarProdutosMontagem;
