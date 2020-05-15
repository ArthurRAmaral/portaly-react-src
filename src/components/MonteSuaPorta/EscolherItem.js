//From depedencies
import React, { Component, Fragment } from "react";

//From components
import MostraProdutos from "./MostraProdutosMontagem";
import CircleLoading from "../loading/CircleLoading";

//From services
import ApiCategorias from "../../services/ApiCategorias";
import ApiProdutos from "../../services/ApiProdutos";

class EscolherItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaSlug: this.props.categoriaSlug,
      produtos: null,
    };
  }

  componentDidMount() {
    const categoriaSlug = this.props.categoriaSlug;
    ApiCategorias.getAllCategorias().then((res) => {
      res.data.forEach((cat) => {
        if (cat.slug === categoriaSlug) {
          this.chamaApiParaReceberProdutos(cat.id);
          return;
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const categoriaSlug = nextProps.categoriaSlug;
    ApiCategorias.getAllCategorias().then((res) => {
      res.data.forEach((cat) => {
        if (cat.slug === categoriaSlug) {
          this.chamaApiParaReceberProdutos(cat.id);
          return;
        }
      });
    });
  }

  chamaApiParaReceberProdutos(categoriaID) {
    ApiProdutos.getAllPublishPoductsByCategoriesId(categoriaID).then((res) => {
      this.setState({ produtos: res.data, categoriaID: categoriaID });
      this.forceUpdate();
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.produtos &&
        this.state.paginaId === this.props.categoriaID ? (
          <MostraProdutos
            categoriaSlug={this.state.categoriaSlug}
            key={this.state.categoriaSlug}
            produtos={this.state.produtos}
            disabled={this.props.disabled}
          />
        ) : (
          <CircleLoading />
        )}
      </Fragment>
    );
  }
}

export default EscolherItems;
