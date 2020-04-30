import React, { Component } from "react";
import ApiPedidos from "../../util/ApiPedidos.js";
import ApiProdutos from "../../util/ApiProdutos.js";

import Carrinho from "../../util/Carrinho.js";

const varCadastro = "dadosCadastro";
const varFrete = "dadosFrete";

class Pagamento extends Component {
  constructor(props) {
    super(props);
    this.pagseguro();

    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));

    this.state = {
      payment_method: "dele,te",
      payment_method_title: "delete",
      set_paid: false,
      billing: dadosCadastro,
      shipping: dadosFrete,
      line_items: [],
    };
  }

  async componentDidMount() {
    this.setState({ line_items: Carrinho.getItensCarrinho() });
    await this.pagseguro();
  }

  pagamento = () => {
    ApiPedidos.createOrder(this.state)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    this.pagseguro();
  };

  createPagseguroProducts = async () => {
    const arrayItens = [];
    for (const item of this.state.line_items) {
      const responseItem = await ApiProdutos.getProduto(item.product_id);
      const itemToPush = {
        id: item.product_id,
        description: responseItem.data.name,
        amount: responseItem.data.price.split(".")[1]
          ? responseItem.data.price
          : responseItem.data.price + ".00",
        quantity: parseInt(item.quantity),
        weight: parseFloat(responseItem.data.weight)
          ? parseFloat(responseItem.data.weight)
          : 1,
      };
      arrayItens.push(itemToPush);
    }
    return arrayItens;
  };

  createPagseguroBuyer = async () => {
    const buyer = {
      name: this.state.billing.first_name + " " + this.state.billing.last_name,
      email: this.state.billing.email,
      phoneAreaCode: this.state.billing.phone.substring(1, 3),
      phoneNumber: this.state.billing.phone,
    };

    return buyer;
  };

  createPagseguroShipping = async () => {
    const shipping = {
      type: 1,
      street: this.state.shipping.address_2,
      number: this.state.shipping.address_1,
      complement: "",
      district: "",
      postalCode: this.state.shipping.postcode,
      city: this.state.shipping.city,
      state: this.state.shipping.state,
      country: this.state.shipping.country,
    };
    return shipping;
  };

  pagseguro = async () => {
    //Cria Ordem
    this.pagamento();
    //Forma array de produtos
    const dadosProdutos = await this.createPagseguroProducts();
    //Froma json de comprador
    const dadosComprador = await this.createPagseguroBuyer();
    //Forma json de entrega
    const dadosEntrega = await this.createPagseguroShipping();
    sessionStorage.setItem(
      "payChk",
      JSON.stringify({
        dadosProdutos,
        dadosComprador,
        dadosEntrega,
      })
    );
  };

  render() {
    this.pagseguro();
    return <div></div>;
  }
}

export default Pagamento;
