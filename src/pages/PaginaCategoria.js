import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../util/ApiWooCommerce";
import MostraProdutos from "../components/MostraProdutos";
import LineLoaging from "../components/loading/LineLoading";

class PaginaCategorias extends Component {
  constructor(props) {
    super(props);

      this.state = {
         produtos: null,
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
      ApiWooCommerce.getCategoriaPublishProductsById(id).then((res) => {
         this.setState({ produtos: res.data, paginaId: id });
      });
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos &&
            this.state.paginaId === this.props.match.params.id ? (
               <MostraProdutos produtos={this.state.produtos} />
            ) : (
               <LineLoaging />
            )}
         </Fragment>
    );
  }
}

export default PaginaCategorias;
