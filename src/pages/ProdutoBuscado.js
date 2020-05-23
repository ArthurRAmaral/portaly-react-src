//From depedencies
import React, { Component, Fragment } from "react";

//From services
import ApiProdutos from "../services/ApiProdutos";

//From components
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos/MostraProdutos";
import SemProdutos from "../components/semProdutos";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From here
import theme from "./theme";

class ProdutosBuscado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: null,
    };
  }

  componentDidMount() {
    const { value } = this.props.match.params;

    ApiProdutos.getAllPublishedProducts().then((res) => {
      const produtos = res.data.filter((produto) =>
        produto.name.toString().toUpperCase().includes(value.toUpperCase())
      );

      this.setState({
        produtos: [...produtos],
      });
    });
  }

  render() {
    const { produtos } = this.state;
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          {this.state.produtos !== null || undefined ? (
            this.state.produtos.length > 0 ? (
              MostrarProdutos(produtos)
            ) : (
              <SemProdutos />
            )
          ) : (
            <LineLoading />
          )}
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default ProdutosBuscado;
