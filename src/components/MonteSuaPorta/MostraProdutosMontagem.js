import React, { Component } from "react";
import imgDefault from "../../assets/imgDefault.png";
import { Link } from "react-router-dom";
import "../../css/components/MonteSuaPorta/MostrarProdutos.css";

import InitPath from "../../services/InitPath";

class MostrarProdutosMontagem extends Component {
   constructor(props) {
      if (!sessionStorage.getItem("monteportaids"))
         sessionStorage.setItem("monteportaids", JSON.stringify([30, 1, 2]));
      super(props);

      this.state = {
         produtosSelcionados: JSON.parse(
            sessionStorage.getItem("monteportaids")
         ),
         produtos: this.props.produtos,
         selected: null,
      };

      this.handleSelect = this.handleSelect.bind(this);
   }

   handleSelect(id) {
      let vet = this.state.produtosSelcionados;
      const verif = vet.includes(id);

      this.state.produtos.forEach((prod) => {
         if (vet.indexOf(prod.id) >= 0) {
            vet.splice(vet.indexOf(prod.id), 1);
         }
      });
      if (!verif) vet.push(id);

      sessionStorage.setItem("monteportaids", JSON.stringify(vet));
      this.setState({ produtosSelcionados: vet });
   }

   render() {
      return (
         <section className="center-align produtos-list">
            {this.state.produtos.length > 0 ? (
               this.state.produtos.map((produto) => {
                  return this.state.produtosSelcionados.includes(produto.id) ? (
                     <div
                        className="produto-montagem selecionado"
                        onClick={() => this.handleSelect(produto.id)}
                        // key={`link-to-${produto.id}`}
                        // to={`${InitPath}/produto/${produto.slug}`}
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
                  ) : (
                     <div
                        className="produto-montagem"
                        onClick={() => this.handleSelect(produto.id)}
                        // key={`link-to-${produto.id}`}
                        // to={`${InitPath}/produto/${produto.slug}`}
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
