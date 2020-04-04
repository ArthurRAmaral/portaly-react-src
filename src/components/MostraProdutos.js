import React, { Component } from "react";
import imgDefault from "../assets/imgDefault.png";
import { Link } from "react-router-dom";
import "../css/components/MostrarProdutos.css";

import InitPath from "../services/InitPath";

class MostrarProdutos extends Component {
   constructor(props) {
      super(props);

      this.state = { produtos: this.props.produtos };
   }

   render() {
      return (
         <section className="center-align produtos-list">
            {this.state.produtos.length > 0 ? (
               this.state.produtos.map(produto => {
                  return (
                     <Link
                        className="produto"
                        key={`link-to-${produto.id}`}
                        to={`${InitPath}/produto/${produto.slug}`}
                     >
                        <div className="card small">
                           <div className="card-image">
                              <img
                                 key={produto.id}
                                 src={
                                    produto.images.length > 0
                                       ? produto.images[0].src
                                       : imgDefault
                                 }
                                 alt=""
                              />
                           </div>
                           <div className="produto-dados">
                              <p className="nome grey-text text-darken-4">
                                 {produto.name}
                              </p>
                              <p className="preco">R$: {produto.price}</p>
                           </div>
                        </div>
                     </Link>
                  );
               })
            ) : (
               <div>Nenhum produto encontrado</div>
            )}
         </section>
      );
   }
}

export default MostrarProdutos;
