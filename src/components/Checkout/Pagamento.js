import React, { Component } from 'react';
import ApiPedidos from '../../util/ApiPedidos.js';

import Carrinho from '../../util/Carrinho.js';

const varCadastro = "dadosCadastro";
const varFrete = "dadosFrete";

class Pagamento extends Component {

constructor(props) {
    super(props);
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));

    this.state ={
      payment_method: "delete",
      payment_method_title: "delete",
      set_paid: false,
      billing: dadosCadastro,
      shipping: dadosFrete,
      line_items: [],
    };
  }

  componentDidMount() {

    this.setState({ line_items: Carrinho.getItensCarrinho() });
  }

  pagamento = () => {
    ApiPedidos.createOrder(this.state).then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
  }

  render() {
    return (
      <button onClick={this.pagamento}>Comprar</button>
    );
  }
}

export default Pagamento;