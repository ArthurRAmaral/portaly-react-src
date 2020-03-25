import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import Header from "./components/Header";
import Routes from "./routes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
