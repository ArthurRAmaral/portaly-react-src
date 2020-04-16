import React, { Component } from "react";
// import ApiWooCommerce from "../util/ApiWooCommerce";
// import LineLoaging from "../components/loading/LineLoading";
// import Carrinho from "../util/Carrinho";
import Setepper from "../components/MonteSuaPorta/Stepper";

import Montador from "../util/MontadorPorta";

import "../css/MonteSuaPorta.css";

class MonteSuaPorta extends Component {
   constructor(props) {
      Montador.resetMontador();

      super(props);

      this.state = {
         porta: null,
         itens: [],
      };
   }

   mostraMontagemPorta() {
      return <Setepper />;
   }

   addItem(item) {}

   render() {
      return (
         <section className="montagem-porta-container">
            {this.mostraMontagemPorta()}
         </section>
      );
   }
}

export default MonteSuaPorta;
