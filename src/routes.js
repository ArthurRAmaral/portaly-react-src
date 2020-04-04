//From dependencies
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//From componets
import HomePage from "./pages/HomePage";
import PaginaCategoria from "./pages/PaginaCategoria";
import PaginaProduto from "./pages/PaginaProduto";
import MonteSuaPorta from "./pages/MonteSuaPorta";
import DefaultPage from "./pages/DefaultPage";

//From util
import InitPath from "./services/InitPath";

//From css
import "./css/Global.css";

class Routes extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <section id="homepage">
            <Switch>
               <Route path={`${InitPath}/`} exact component={HomePage} />
               <Route
                  path={`${InitPath}/categoria/:id`}
                  component={PaginaCategoria}
               />
               <Route
                  path={`${InitPath}/produto/:slug`}
                  component={PaginaProduto}
               />
               <Route
                  path={`${InitPath}/montesuaporta`}
                  component={MonteSuaPorta}
               />
               <Route path={`${InitPath}/`} component={DefaultPage} />
            </Switch>
         </section>
      );
   }
}

export default Routes;
