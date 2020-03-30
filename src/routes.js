import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PaginaCategoria  from "./pages/PaginaCategoria"
import PaginaProduto from "./pages/PaginaProduto";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/categoria/:id" component={PaginaCategoria} />
      <Route path="/produto/:id" component={PaginaProduto} />
    </Switch>
  );
}

export default Routes;
