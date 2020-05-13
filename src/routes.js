// From dependencies
import React from "react";
import { Switch, Route, Router } from "react-router-dom";

// From componets
import HomePage from "./pages/HomePage";
import PaginaCategoria from "./pages/PaginaCategoria";
import PaginaProduto from "./pages/PaginaProduto";
import MonteSuaPorta from "./pages/MonteSuaPorta";
import ProdutoBuscado from "./pages/ProdutoBuscado";
import Carrinho from "./pages/PaginaCheckout";
import DefaultPage from "./pages/DefaultPage";
import TestPage from "./pages/TestPage";

// From util
import InitPath from "./services/InitPath";

// From css
import "./css/Global.css";

const Routes = () => {

  return (
    <section id="homepage">
      <Switch>
        <Route path={`${InitPath}/`} exact component={HomePage} />
        <Route path={`${InitPath}/categoria/:id`} component={PaginaCategoria} />
        <Route path={`${InitPath}/produto/:slug`} component={PaginaProduto} />
        <Route path={`${InitPath}/montesuaporta`} component={MonteSuaPorta} />
        <Route path={`${InitPath}/busca/:value`} component={ProdutoBuscado} />
        <Route path={`${InitPath}/meuCarrinho`} component={Carrinho} />
        <Route path={`${InitPath}/teste`} component={TestPage} />
        <Route path={`${InitPath}/`} component={DefaultPage} />
      </Switch>
    </section>
  );
};

export default Routes;
