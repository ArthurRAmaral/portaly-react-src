import React, { Component } from "react";
// import ApiWooCommerce from "../util/ApiWooCommerce";
// import LineLoaging from "../components/loading/LineLoading";
import Carrinho from "../util/Carrinho";
import Setepper from "../components/MonteSuaPorta/Stepper";

import "../css/MonteSuaPorta.css"

class MonteSuaPorta extends Component {
   constructor(props) {
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
      Carrinho.setCarrinho();

      return <section className="montagem-porta-container">{this.mostraMontagemPorta()}</section>;
   }
}

export default MonteSuaPorta;
