import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../util/ApiWooCommerce";
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos";
import Carrinho from "../util/Carrinho";

class HomePage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtos: [],
         teste: []
      };
   }

   componentDidMount() {
      ApiWooCommerce.getAll().then(res => {
         this.setState({ produtos: [...this.state.produtos, ...res.data] });
      });
   }

   render() {
      Carrinho.setCarrinho();

      return (
         <Fragment>
            {this.state.produtos.length > 0 ? (
               MostrarProdutos(this.state.produtos)
            ) : (
               <LineLoading />
            )}
         </Fragment>
      );
   }
}

export default HomePage;

/* <section id="destaques">
          {this.state.produtos.map(produto => {
            return produto.on_sale ? (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            ) : (
              <div></div>
            );
          })}
        </section> */
