import React, { Component, Fragment } from 'react';
import ApiWooCommerce from '../util/ApiWooCommerce';
import MostraProdutos from '../components/MostraProdutos';
import LineLoaging from '../components/loading/LineLoading';
import Carrinho from '../util/Carrinho';

class PaginaCategorias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      paginaId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.chamaApiParaRceberProdutos(this.state.paginaId);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    this.chamaApiParaRceberProdutos(id);
  }

  chamaApiParaRceberProdutos(id) {
    ApiWooCommerce.getCategoria(id)
      .then((res) => {
        this.setState({ produtos: [...res.data], paginaId: id });
      })
      .catch(console.log('Carregando'));
  }

  render() {
    Carrinho.setCarrinho();

    return (
         <Fragment>
            {this.state.produtos.length > 0
            && this.state.paginaId === this.props.match.params.id
              ? MostraProdutos(this.state.produtos)
              : LineLoaging()}
         </Fragment>
    );
  }
}

export default PaginaCategorias;
