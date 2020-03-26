import React, { Component } from "react";
import api from "../services/api";
// import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading.js";

import "../css/PaginaProduto.css";

// import imgDefault from "../assets/imgDefault.png";

export default class PaginaProduto extends Component {
  state = {
    // produto: undefined
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    const response = await api.get(`products/${id}`);
    console.log(response.data);
    this.setState({ produto: response.data });
  }

  renderProduto = () => <h1>{this.state.produto.name}</h1>;

  render() {
    return (
      <section id="produto-pagina">
        <div>{this.state.produto ? this.renderProduto() : Loading()}</div>
      </section>
    );
  }
}
