import React from "react";
import imgDefault from "../../assets/imgDefault.png";
import { Link } from "react-router-dom";

import "../../css/components/MostrarProdutosCarrinho.css";

import InitPath from "../../services/InitPath";

const MostrarProdutos = (props) => {
   const qntProdutosCarrinho = new Map();
   const produtosListados = [];

   props.map((produto) => {
      if (qntProdutosCarrinho.has(produto.id)) {
         qntProdutosCarrinho.set(
            produto.id,
            qntProdutosCarrinho.get(produto.id) + 1
         );
         return 0;
      } else {
         qntProdutosCarrinho.set(produto.id, 1);
         return 0;
      }
   });

   const cards = props.map((produto) => {
      if (produtosListados.includes(produto.id)) {
         return null;
      } else {
         produtosListados.push(produto.id);
         return (
            <Link
               className="produto"
               key={`link-to-${produto.id}`}
               to={`${InitPath}/produto/${produto.id}`}
            >
               <li className="produto-dados-carrinho">
                  <div className="valign-wrapper">
                     <img
                        className="img-produto-carrinho"
                        key={produto.id}
                        src={
                           produto.images.length > 0
                              ? produto.images[0].src
                              : imgDefault
                        }
                        alt=""
                     />
                     <div className="title-carrinho">
                        <span className="nome-produto-carrinho">
                           {produto.name}
                        </span>
                        <br></br>
                        <span>
                           Preço unitário: <br></br>
                           <span className="preco">R$ {produto.price}</span>
                        </span>
                     </div>
                     <div>
                        <span>
                           Quantidade: {qntProdutosCarrinho.get(produto.id)}
                        </span>
                        <br></br>
                        <span>
                           Valor Total:{" "}
                           {qntProdutosCarrinho.get(produto.id) * produto.price}
                        </span>
                     </div>
                  </div>
               </li>
            </Link>
         );
      }
   });

   return (
      <div className="container-carrinho container">
         <div className="card-carrinho">
            <ul className="list-carrinho">{cards}</ul>
         </div>
      </div>
   );
};

export default MostrarProdutos;
