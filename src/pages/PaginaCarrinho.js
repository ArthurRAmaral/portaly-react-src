import React, { Component, Fragment } from 'react';
import Carrinho from '../util/Carrinho';
import ApiWooCommerce from '../util/ApiWooCommerce';
import MostraProdutos from '../components/Carrinho/MostraProdutosCarrinho';
import LineLoaging from '../components/loading/LineLoading';
import SemProduto from '../components/semProdutos';

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
    };
  }

  componentDidMount() {
    this.recebeProdutosNoCarrinho();
  }

  recebeProdutosNoCarrinho() {
    const itens = Carrinho.getItensCarrinho();

    for (const item of itens) {
      ApiWooCommerce.getProduto(item.id)
        .then((response) => {
          this.setState({
            produtos: [...this.state.produtos, response.data],
          });
        })
        .catch((error) => {
          console.log('Carregando');
        });
    }
  }

  render() {
    return (
         <Fragment>
            {Carrinho.getValorCarrinho() > 0 ? (
              this.state.produtos.length > 0 ? (
                MostraProdutos(this.state.produtos)
              ) : (
                  <LineLoaging />
              )
            ) : (
               <SemProduto />
            )}
         </Fragment>
    );
  }
}

export default PaginaCarrinho;
