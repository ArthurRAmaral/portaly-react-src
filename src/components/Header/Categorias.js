import React, { Fragment, Component } from "react";
import ApiWooCommerce from "../../util/ApiWooCommerce";
import { NavLink } from "react-router-dom";

const DefaultCategories = () => {
   return (
      <Fragment>
         <li className="category">
            <a href="#Alizar">Alizar</a>
         </li>
         <li className="category">
            <a href="#Dobradica">Dobradiça</a>
         </li>
         <li className="category">
            <a href="#Fechadura">Fechadura</a>
         </li>
         <li className="category">
            <a href="#KitDeCorrer">Kit de Correr</a>
         </li>
         <li className="category">
            <a href="#Marco">Marco (Batente)</a>
         </li>
         <li className="category">
            <a href="#Outros">Outros</a>
         </li>
         <li className="category">
            <a href="#Portas">Porta</a>
         </li>
         <li className="category">
            <a href="#Puxador">Puxador</a>
         </li>
         <li className="category">
            <a href="#Monte">Monte Sua Porta</a>
         </li>
      </Fragment>
   );
};

const ApiCategories = categorias => {
   return categorias.map(cat => {
      if (window.location.pathname === `/categoria/${cat.id}`)
         return (
            <li key={cat.id}>
               <NavLink
                  style={{
                     backgroundColor: "black"
                  }}
                  key={`categorias${cat.id}`}
                  to={`/categoria/${cat.id}`}
                  onClick={() => {
                     window.location.href = `/categoria/${cat.id}`;
                  }}
               >
                  {cat.name}
               </NavLink>
            </li>
         );
      else
         return (
            <li key={cat.id}>
               <NavLink
                  activeStyle={{
                     backgroundColor: "black"
                  }}
                  key={`categorias${cat.id}`}
                  to={`/categoria/${cat.id}`}
                  onClick={() => {
                     window.location.href = `/categoria/${cat.id}`;
                  }}
               >
                  {cat.name}
               </NavLink>
            </li>
         );
   });
};

class Categorias extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categories: []
      };
   }

   componentDidMount() {
      ApiWooCommerce.getAllCategorias().then(res => {
         this.setState({ categories: [...this.state.categories, ...res.data] });
      });
   }

   render() {
      return (
         <Fragment>
            {this.state.categories.length > 0 ? (
               ApiCategories(this.state.categories)
            ) : (
               <DefaultCategories />
            )}
         </Fragment>
      );
   }
}

export default Categorias;
