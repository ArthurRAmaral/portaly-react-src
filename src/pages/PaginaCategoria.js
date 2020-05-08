import React, { Component, Fragment } from "react";
import ApiWooCommerce from "../services/ApiProdutos";
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
    ApiWooCommerce.getPublishProductsByCategoriesId(id).then((res) => {
      this.setState({ produtos: res.data, paginaId: id });
    });
  }

  render() {
    const { produtos } = this.state;
    return (
      <Fragment>
        {this.state.produtos &&
        this.state.paginaId === this.props.match.params.id ? (
          MostraProdutos(produtos)
        ) : (
          <LineLoaging />
        )}
      </Fragment>
    );
  }
}

export default PaginaCategorias;
