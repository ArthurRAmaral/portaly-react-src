import React, { Component, Fragment } from 'react';
import Carrinho from '../../util/Carrinho';
import ApiProdutos from '../../util/ApiProdutos';
import MostraProdutos from './MostraProdutosCarrinho';
import LineLoaging from '../loading/LineLoading';
import SemProduto from '../semProdutos';

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      itens: []
    };
  }

  componentDidMount() {
    this.recebeProdutosNoCarrinho();
  }

  recebeProdutosNoCarrinho() {
    const itens = Carrinho.getItensCarrinho();

    for (const item of itens) {
      ApiProdutos.getProduto(item.product_id)
        .then((response) => {
          this.setState({
            produtos: [...this.state.produtos, response.data],
            itens
          });
        })
        .catch(() => {
        });
    }
  }

  render() {
    return (
         <Fragment>
            {Carrinho.getItensCarrinho().length > 0 ? (
              this.state.produtos.length > 0 ? (
                MostraProdutos(this.state.produtos, this.state.itens)
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
