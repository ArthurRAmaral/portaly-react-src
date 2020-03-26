import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import "./css/Global.css";

import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
