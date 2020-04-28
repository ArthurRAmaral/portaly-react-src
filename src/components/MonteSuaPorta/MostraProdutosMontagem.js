import React, { Component } from "react";
import imgDefault from "../../assets/imgDefault.png";
import "../../css/components/MonteSuaPorta/MostrarProdutos.css";

import Montador from "../../util/MontadorPorta";

class MostrarProdutosMontagem extends Component {
  constructor(props) {
    Montador.resetMontadorIfEmpty();

    super(props);

    this.state = {
      produtosSelcionados: Montador.getMontador(),
      produtos: this.props.produtos,
      categoriaSlug: this.props.categoriaSlug,
      selected: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(id) {
    Montador.setItem(id, this.state.categoriaSlug);

    console.log(id, this.state.categoriaSlug);

    this.setState({ produtosSelcionados: Montador.getMontador() });
  }

  render() {
    return (
      <section className="center-align produtos-list">
        {this.state.produtos.length > 0 ? (
          this.state.produtos.map((produto) => {
            return Montador.getMontador().dados[this.state.categoriaSlug] ===
              produto.id ? (
              <div
                className="produto-montagem selecionado"
                onClick={() => this.handleSelect(produto.id)}
                key={`intem-${produto.id}`}
                // to={`${InitPath}/produto/${produto.slug}`}
              >
                <img
                  key={produto.id}
                  src={
                    produto.images.length > 0
                      ? produto.images[0].src
                      : imgDefault
                  }
                  alt=""
                />
                <div className="produto-dados-montagem">
                  <p className="nome">{produto.name}</p>
                  <p className="preco">R$: {produto.price}</p>
                </div>
              </div>
            ) : (
              <div
                className="produto-montagem"
                onClick={() => this.handleSelect(produto.id)}
                key={`intem-${produto.id}`}
                // to={`${InitPath}/produto/${produto.slug}`}
              >
                <img
                  key={produto.id}
                  src={
                    produto.images.length > 0
                      ? produto.images[0].src
                      : imgDefault
                  }
                  alt=""
                />
                <div className="produto-dados-montagem">
                  <p className="nome">{produto.name}</p>
                  <p className="preco">R$: {produto.price}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>Nenhum produto encontrado</div>
        )}
      </section>
    );
  }
}

export default MostrarProdutosMontagem;
