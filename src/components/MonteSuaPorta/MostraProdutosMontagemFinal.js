import React, { Component } from "react";
import imgDefault from "../../assets/imgDefault.png";
import "../../css/components/MonteSuaPorta/MostrarProdutosFinal.css";

import Montador from "../../util/MontadorPorta";

class MostrarProdutosMontagemFinal extends Component {
   constructor(props) {
      Montador.resetMontadorIfEmpty();

      super(props);

      this.state = {
         produtosSelcionados: Montador.getMontador(),
         produtos: this.props.produtos,
         selected: null,
         quantidade: 1,
      };

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(e) {
      const quantidade = parseInt(e.target.value);
      Montador.setQuantidade(quantidade);
      this.setState({ quantidade: quantidade });
   }

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
            <span>Quantidae de portas montadas: </span>
            <input
               type="number"
               name="Quantidade"
               id="quantidadedekits"
               value={this.state.quantidade}
               onChange={this.handleChange}
            />
         </section>
      );
   }
}

export default MostrarProdutosMontagemFinal;
