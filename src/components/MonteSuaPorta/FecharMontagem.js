import React, { Component, Fragment } from "react";
import ApiProdutos from "../../util/ApiProdutos";
import MostraProdutosFinal from "./MostraProdutosMontagemFinal";
import CircleLoading from "../loading/CircleLoading";

import Montador from "../../util/MontadorPorta";

class EscolherItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtosSelecionados: Montador.getMontador().dados,
      produtos: null,
      quantidade: 1,
    };
  }

  componentDidMount() {
    if (this.state.produtosSelecionados) {
      let vet = [];
      let qnt = 0;
      const prods = this.state.produtosSelecionados;
      let size = 0;
      for (const key in prods) {
        size++;
      }

      for (const key in prods) {
        ApiProdutos.getProduto(prods[key]).then((res) => {
          vet.push(res.data);
          qnt++;
          if (qnt === size) this.setState({ produtos: vet });
        });
      }
    } else {
      this.setState({ produtos: [] });
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.produtos ? (
          this.state.produtos.length > 0 ? (
            <Fragment>
              <MostraProdutosFinal
                key={this.state.categoriaID}
                produtos={this.state.produtos}
              />
            </Fragment>
          ) : (
            <div>{"Nenhum produto selecionado"}</div>
          )
        ) : (
          <CircleLoading />
        )}
      </Fragment>
    );
  }
}

export default EscolherItems;
