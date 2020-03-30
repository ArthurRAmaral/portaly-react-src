import React from "react";
import imgDefault from "../assets/imgDefault.png";
import { Link } from "react-router-dom";


const MostrarProdutos = (props) => {

   const cards = 
      props.map(produto => {
         return(
         <Link key={`link-to-${produto.id}`} to={`/produto/${produto.id}`}>
            <div className="produto card small">
               <div className="">
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
                  <p className="nome grey-text text-darken-4 ">
                     {produto.name}
                  </p>
                  <p className="preco grey-text text-darken-4">
                     R$: {produto.price}
                  </p>
               </div>
            </div>
         </Link>

      )
   })

   return (
      <section id="produtos-list">
         {cards}
      </section>
   );
};

export default MostrarProdutos;