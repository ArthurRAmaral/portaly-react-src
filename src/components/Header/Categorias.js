import React, { Component } from "react";
import ApiWooCommerce from "../../util/ApiWooCommerce";
import { NavLink } from "react-router-dom";

const TrocaCategoria = (cat) => {
   if (window.location.pathname === `/categoria/${cat.id}`)
      return;
   else
      return window.location.href = `/categoria/${cat.id}`;
}

const ApiCategories = categorias => {
   return categorias.map(cat => {
      return (
         <li key={cat.id}>
            <NavLink
               key={`categorias${cat.id}`}
               to={`/categoria/${cat.id}`}
               activeStyle={{ backgroundColor: "#a1887f" }}
               // onClick={() => { TrocaCategoria(cat) }}
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
         <ul>
            {this.state.categories.length > 0 ? ApiCategories(this.state.categories) : ""}
         </ul>
      );
   }
}

export default Categorias;
