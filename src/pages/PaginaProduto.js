import React, { Component } from "react";
// import api from "../services/api";
import { Link } from "react-router-dom";

import LineLoading from "../components/loading/LineLoading";

import "../css/PaginaProduto.css";

import imgDefault from "../assets/imgDefault.png";
import ApiProdutos from "../util/ApiProdutos";

import Carrinho from "../util/Carrinho";

export default class PaginaProduto extends Component {
  state = {
    produto: null,
    opc: 0,
  };

  async componentDidMount() {
    const { slug } = this.props.match.params;
    const response = await ApiProdutos.getProductSlug(slug);
    this.setState({ produto: response.data[0] });
  }

  handleSubmit = (e) => {
    const { produto } = this.state;

    Carrinho.addItem(produto.id);

    // this.props.history.push("/");
    window.location.reload();
  };

  renderProduto = () => {
    const { produto } = this.state;
    return (
      <div className="produtomostrado s12 m6 card-large">
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
            <p className="nome grey-text text-darken-4">{produto.name}</p>
            <p className="preco">R$: {produto.price}</p>
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
        {this.state.produto ? this.renderProduto() : LineLoading()}
      </section>
    );
  }
}
