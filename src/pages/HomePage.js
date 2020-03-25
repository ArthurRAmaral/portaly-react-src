import React, { Component } from "react";
import api from "../services/api";

import "./HomePage.css";

export default class HomePage extends Component {
  state = {
    produtos: []
  };

  async componentDidMount() {
    const response = await api.get("products");

    this.setState({ produtos: response.data });
  }

  render() {
    return (
      <section id="homepage">
        <section id="destaques">
          {this.state.produtos.map(produto => {
            return produto.on_sale ? (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            ) : (
              <div></div>
            );
          })}
        </section>
        <section id="produtos-list">
          {this.state.produtos.map(produto => {
            console.log(produto);

            return (
              <div key={produto.id} className="produto">
                <img src={produto.images[0].src} alt="" width={300} />
              </div>
            );
          })}
        </section>
      </section>
    );
  }
}
