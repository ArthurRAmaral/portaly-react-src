import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import "./css/Global.css";

import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

import Carrinho from "./util/Carrinho";

const App = () => {
  localStorage.getItem("carrinho")
    ? console.log()
    : localStorage.setItem("carrinho", JSON.stringify(Carrinho));

  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
