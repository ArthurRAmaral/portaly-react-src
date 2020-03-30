import React from "react";
import imgDefault from "../assets/imgDefault.png";
import { Link } from "react-router-dom";


const MostrarProdutos = (props) => {

   const cards =
      props.map(produto => {
         return (
            <Link key={`link-to-${produto.id}`} to={`/produto/${produto.id}`} className="hover">
               <div className="col s12 m6 l4 xl3" key={`${produto.slug}${produto.id}`}>
                  <div className="card">
                     <div className="card-image waves-effect waves-block waves-light  image_card">
                        <img className="activator" src={produto.images.length > 0
                           ? produto.images[0].src
                           : imgDefault} />
                     </div>
                     <div className="card-content row">
                        <span className="card-title activator grey-text text-darken-4">{produto.name}</span>
                        <p>{produto.price}</p>
                     </div>
                  </div>
               </div>
            </Link>
         )
      })

   return (
      <section className="row center-align container">
         {cards}
      </section>
   );
};

export default MostrarProdutos;
