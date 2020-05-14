import React, { Component } from "react";
import mapBox from "../../services/mapBoxAndReact/MapBoxApi";
// import ApiPedidos from "../../util/ApiPedidos.js";
// import ApiProdutos from "../../util/ApiProdutos.js";

// import Carrinho from "../../util/Carrinho.js";

// const varCadastro = "dadosCadastro";
// const varFrete = "dadosFrete";

class Pagamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tax: null,
    };
    // let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    // let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));
  }

  async componentDidMount() {
    const varFrete = "dadosFrete";
    const data = JSON.parse(sessionStorage.getItem(varFrete));
    let shipTo =
      data.address_2 +
      " " +
      data.postcode +
      " " +
      data.city +
      " " +
      data.state +
      " " +
      data.country;
    shipTo = shipTo.split(" ").join("%20");

    let value;
    await mapBox.getTax(shipTo).then((tax) => {
      value = tax;
    });
    this.setState({ tax: value });
  }

  render() {
    return <div> {this.state.tax?this.state.tax:"Buscando Frete"} </div>;
  }
}

export default Pagamento;
