import React, { Component } from "react";
import ApiWooCommerce from "../services/api";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.js";
import imgDefault from "../assets/imgDefault.png";
import "../css/HomePage.css";

class HomePage extends Component {

   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
      }
   }

   componentDidMount() {
      ApiWooCommerce.get("products", { per_page: 20 })
         .then(res => {
            this.setState({ produtos: [...this.state.produtos, ...res.data] });
         });

   }

   mostrarProdutos = () => {
      return (
         <section id="produtos-list">
            {this.state.produtos.map(produto => {
               return (
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
               );
            })}
         </section>
      );
   };

   render() {

      console.log(this.state);

      return (
         <section id="homepage">
            {/* <section id="destaques">
          {this.state.produtos.map(produto => {
            return produto.on_sale ? (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            ) : (
              <div></div>
            );
          })}
        </section> */}
            {this.state.produtos.length > 0 ?  this.mostrarProdutos() : Loading()}
         </section>
      );
   }
}


export default HomePage;