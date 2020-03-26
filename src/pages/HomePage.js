import React, { Component } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

import "../css/HomePage.css";

import imgDefault from "../assets/imgDefault.png";

export default class HomePage extends Component {
  state = {
    produtos: []
  };

  async componentDidMount() {
    const response = await api.get("products", {
      per_page: 20 // 20 products per page
    });

    console.log(response.data);
    this.setState({ produtos: response.data });
  }

  mostrarProdutos = () => {
    return (
      <section id="produtos-list">
        {this.state.produtos.map(produto => {
          return (
            <Link key={`link-to-${produto.id}`} to={`/produto/${produto.id}`}>
              <div className="produto card">
                <img
                  key={produto.id}
                  src={
                    produto.images.length > 0
                      ? produto.images[0].src
                      : imgDefault
                  }
                  alt=""
                />
                <p className="card-title grey-text text-darken-4">{produto.name}</p>
                <p className="card-title grey-text text-darken-4">R$: {produto.price}</p>
              </div>
            </Link>
          );
        })}
      </section>
    );
  };

  aguardandoProdutos = () => {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  };

  render() {
    return (
      <section id="homepage">
        {/* <section id="destaques">
          {this.state.produtos.map(produto => {
            return produto.on_sale ? (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            ) : (
              <div></div>
            );
          })}
        </section> */}
        {this.state.produtos.length > 0
          ? this.mostrarProdutos()
          : this.aguardandoProdutos()}
      </section>
    );
  }
}
