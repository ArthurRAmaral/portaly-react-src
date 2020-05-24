//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import CircleLoading from "../loading/CircleLoading";

//From utils
import Montador from "../../util/MontadorPorta";

import imgDefault from "../../assets/imgDefault.png";

import "../../css/components/MonteSuaPorta/MostrarProdutos.css";

class EscolherItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaSlug: this.props.categoriaSlug,
      produtos: this.props.produtos,
      disabledButton: this.props.disabled,
      produtosAtuais: null,
    };
  }

  componentDidMount() {
    const { produtos, categoriaSlug } = this.state;
    Object.values(produtos).map((prods) => {
      if (prods[0].categories[0].slug === categoriaSlug) {
        this.setState({ produtosAtuais: prods });
      }
    });
  }

  montaKitHandle(id) {
    const { produtosAtuais, categoriaSlug, disabledButton } = this.state;

    let produto;
    produtosAtuais.forEach((prod) => {
      if (prod.id == id) produto = prod;
    });

    Montador.setItem(categoriaSlug, produto);

    disabledButton(false);
  }

  render() {
    const { produtosAtuais } = this.state;

    return (
      <Fragment>
        {produtosAtuais ? (
          <section className="center-align produtos-list">
            {produtosAtuais.map((produto) => {
              return (
                <div
                  className="produto-montagem selecionado"
                  onClick={() => this.montaKitHandle(produto.id)}
                  id={produto.id}
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
        ) : (
          <CircleLoading />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ produtos: state.produtos });

export default connect(mapStateToProps, null)(EscolherItems);
