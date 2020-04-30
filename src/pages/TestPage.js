import React, { Component } from "react";

import pagSeguro from "../util/PagSeguro";
import btnPagSeguro from "../util/btnPagSeguro";
import LineLoading from "../components/loading/LineLoading";

const produtosArray = [
    {
      id: 1,
      description: "Descrição do primeiro produto",
      amount: "100.00",
      quantity: 1,
      weight: 1000,
    },
    {
      id: 2,
      description: "Descrição do segundo produto",
      amount: "200.00",
      quantity: 2,
      weight: 2000,
    },
    {
      id: 3,
      description: "Descrição do terceiro produto",
      amount: "300.00",
      quantity: 3,
      weight: 3000,
    },
  ],
  dadosEntega = {
    type: 1,
    street: "Rua Alameda dos Anjos",
    number: "367",
    complement: "Apto 307",
    district: "Parque da Lagoa",
    postalCode: "01452002",
    city: "São Paulo",
    state: "RS",
    country: "BRA",
  },
  dadosComprador = {
    name: "José Comprador",
    email: "c71116547086085144918@sandbox.pagseguro.com.br",
    phoneAreaCode: "51",
    phoneNumber: "12345678",
  };

// let code = "94865BE20A0A753CC4174FADBB56C43A";

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = { code: null };
  }

  async componentDidMount() {
    let code = await pagSeguro.gerarPagamento(
      dadosEntega,
      produtosArray,
      dadosComprador
    );
    this.setState({ code });
  }

  render() {
    return (
      <div>
        {/* <div style={{ cursor: "pointer" }} onClick={testar}>
          {"Criar Kit teste"}
        </div>
        <br />
        <br />
        <br />
        <br /> */}
        {this.state.code ? (
          btnPagSeguro(this.state.code, dadosComprador.email)
        ) : (
          <LineLoading />
        )}
      </div>
    );
  }
}

export default DefaultPage;
