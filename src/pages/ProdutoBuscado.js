//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

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
    const products = this.props.products;
    let productsMatch = [];

    for (const category in products) {
      const categoryArray = products[category];
      const categoryMatch = categoryArray.filter((item) =>
        item.name.toString().toUpperCase().includes(value.toUpperCase())
      );
      if (categoryMatch.length > 0) {
        productsMatch.push(...categoryMatch);
      }
    }
    this.setState({
      produtos: [...productsMatch],
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

const mapStateToProps = (state) => ({
  products: state.produtos,
});

export default connect(mapStateToProps, null)(ProdutosBuscado);
