import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Routes from "./routes";
import Footer from "./components/Footer";
import Carrinho from "./util/Carrinho";
import "materialize-css/dist/css/materialize.min.css";
import "./css/Global.css";


const App = () => {

  Carrinho.setCarrinho();

  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
