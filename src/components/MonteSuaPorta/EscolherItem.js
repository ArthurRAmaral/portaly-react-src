//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import CircleLoading from "../loading/CircleLoading";

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
      kit: [],
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

  render() {
    const { produtosAtuais, disabledButton } = this.state;

    return (
      <Fragment>
        {produtosAtuais ? (
          <section className="center-align produtos-list">
            {produtosAtuais.map((produto) => {
              return (
                <div
                  className="produto-montagem selecionado"
                  onClick={() => disabledButton(false)}
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

// const mapDispatchToProps = { salvaCategorias, buscaProduto };

export default connect(mapStateToProps, null)(EscolherItems);
