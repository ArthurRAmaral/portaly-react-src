import React, { Component, Fragment } from 'react';
import ApiWooCommerce from '../util/ApiWooCommerce';
import LineLoading from '../components/loading/LineLoading';
import MostrarProdutos from '../components/MostraProdutos';
import Carrinho from '../util/Carrinho';

class ProdutosBuscado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: null,
    };
  }

  componentDidMount() {
    const { value } = this.props.match.params;

    ApiWooCommerce.getAll().then((res) => {
      const produtos = res.data.filter((produto) => produto.name.toString().toUpperCase().includes(value.toUpperCase()));

      this.setState({
        produtos: [...produtos],
      });
    });
  }

  render() {
    Carrinho.setCarrinho();

    return (
         <Fragment>
            {this.state.produtos !== null ? (
              MostrarProdutos(this.state.produtos)
            ) : (
               <LineLoading />
            )}
         </Fragment>
    );
  }
}

export default ProdutosBuscado;
