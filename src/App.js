import React, { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Routes from "./routes";
import Footer from "./components/Footer";
import LineLoading from "./components/loading/LineLoading";
import Carrinho from "./util/Carrinho";
import ApiWooCommerce from "./util/ApiWooCommerce";
import "./css/Global.css";
import "materialize-css/dist/css/materialize.min.css";
import GetCategorias from "./util/FilterCategorias";

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         produtos: []
      };
   }

   componentDidMount() {
      ApiWooCommerce.getAll().then(res => {
         this.setState({ produtos: [...res.data] });
      });
   }

   render() {
      Carrinho.setCarrinho();

      return (
         <BrowserRouter>
            <Header categorias={GetCategorias(this.state.produtos)} />
            {/* <Routes /> */}
            {/* <Footer /> */}
         </BrowserRouter>
      );
   }
}

export default App;
