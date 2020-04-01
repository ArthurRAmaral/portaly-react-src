import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PaginaCategoria from "./pages/PaginaCategoria";
import PaginaProduto from "./pages/PaginaProduto";
import MonteSuaPorta from "./pages/MonteSuaPorta";
import "./css/Global.css";

function Routes(props) {
   return (
      <Switch>
         <Fragment>
            <section id="homepage">
               <Route path="/" exact children={HomePage(props.produtos)} />
               {/* <Route path="/categoria/:id" component={PaginaCategoria} /> */}
               {/* <Route path="/produto/:id" component={PaginaProduto} /> */}
               {/* <Route path="/montesuaporta" component={MonteSuaPorta} /> */}
            </section>
         </Fragment>
      </Switch>
   );
}

export default Routes;
