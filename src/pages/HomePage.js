import React, { Component, Fragment } from 'react';
import ApiWooCommerce from '../util/ApiWooCommerce';
import LineLoading from '../components/loading/LineLoading';
import MostrarProdutos from '../components/MostraProdutos';
import Carrinho from '../util/Carrinho';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      teste: [],
    };
  }

  componentDidMount() {
    ApiWooCommerce.getAll().then((res) => {
      const produtos = res.data;
      this.setState({
        produtos: [...this.state.produtos, ...produtos],
      });
    });
  }

  render() {
    Carrinho.setCarrinho();

    return (
         <Fragment>
            {this.state.produtos.length > 0 ? (
              MostrarProdutos(this.state.produtos)
            ) : (
               <LineLoading />
            )}
         </Fragment>
    );
  }
}

export default HomePage;
