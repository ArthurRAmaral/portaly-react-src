import React, { Component, Fragment } from "react";

import CircleLoading from "../loading/CircleLoading";

import Montador from "../../util/MontadorPorta";

import imgDefault from "../../assets/imgDefault.png";

import "../../css/components/MonteSuaPorta/MostrarProdutosFinal.css";

class FecharMontagem extends Component {
  constructor(props) {
    super(props);

    Montador.setValorKit();

    this.state = {
      produtosSelecionados: Montador.getProdutos(),
      quantidade: Montador.getQuantidade(),
      valorKit: Montador.getValorKit(),
    };
  }

  handleChangeQuantidade(event) {
    Montador.setQuantidade(event.target.valueAsNumber);
    Montador.setValorKit();
    this.setState({
      quantidade: event.target.valueAsNumber,
      valorKit: Montador.getValorKit,
    });
  }

  render() {
    const { produtosSelecionados, quantidade, valorKit } = this.state;
    return (
      <Fragment>
        {produtosSelecionados ? (
          <Fragment>
            <section className="center-align produtos-list">
              {Object.values(produtosSelecionados).map((produto) => {
                return (
                  <div
                    className="produto-final"
                    // onClick={() => this.handleSelect(produto.id)}
                    key={`intem-${produto.id}`}
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
              })}
            </section>
            <div>
              <span
                style={{
                  fontSize: "25px",
                  color: "#8A572D",
                }}
              >
                Quantidae de portas montadas:{" "}
              </span>
              <input
                type="number"
                name="Quantidade"
                id="quantidadedekits"
                value={quantidade}
                onChange={(event) => this.handleChangeQuantidade(event)}
                style={{
                  width: "50px",
                  height: "35px",
                  borderColor: "#8A572D",
                  color: "#8A572D",
                  outline: "none",
                  fontSize: "20px",
                  textJustify: "center",
                }}
              />
            </div>
          </Fragment>
        ) : (
          <CircleLoading />
        )}
      </Fragment>
    );
  }
}

export default FecharMontagem;
