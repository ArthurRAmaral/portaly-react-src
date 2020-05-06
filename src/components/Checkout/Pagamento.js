import React, { Component } from "react";
import ApiPedidos from "../../util/ApiPedidos.js";
import ApiProdutos from "../../util/ApiProdutos.js";

import Carrinho from "../../util/Carrinho.js";

const varCadastro = "dadosCadastro";
const varFrete = "dadosFrete";

class Pagamento extends Component {
  constructor(props) {
    super(props);

    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));
  }

  render() {
    return <div></div>;
  }
}

export default Pagamento;
