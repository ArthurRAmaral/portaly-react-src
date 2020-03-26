import React, { Component } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

import Loading from "../components/Loading.js";

import "../css/PaginaProduto.css";

import imgDefault from "../assets/imgDefault.png";

export default class PaginaProduto extends Component {
  state = {
    produto: undefined,
    opc: 0
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`products/${id}`);
    this.setState({ produto: response.data });
  }

  handleSubmit = e => {
    // e.preventDefault();
    const { produto } = this.state;
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));

    carrinho.valor += Number.parseFloat(produto.price);
    carrinho.itens.push({ id: produto.id, preco: produto.price });
    console.log(carrinho);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    this.props.history.push("/");
    window.location.reload();
  };

  renderProduto = () => {
    const { produto } = this.state;
    return (
      <div className="produtomostrado s12 m6">
        <div className="card">
          <div className="card-image">
            <img
              className="principal"
              src={
                produto.images.length > 0 ? produto.images[0].src : imgDefault
              }
              alt=""
            />
            <Link
              to="#"
              className="btn-floating halfway-fab waves-effect waves-light red"
            >
              <i onClick={this.handleSubmit} className="material-icons">
                add
              </i>
            </Link>
          </div>
          <div className="card-content">
            <h1 className="card-title">{produto.name}</h1>
            <p>{produto.regular_price}</p>
            {produto.short_description !== ""
              ? produto.short_description.substring(
                  3,
                  produto.short_description.length - 5
                )
              : ""}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <section id="produto-pagina">
        {this.state.produto ? this.renderProduto() : Loading()}
      </section>
    );
  }
}
