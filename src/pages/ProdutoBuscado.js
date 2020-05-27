//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

//From components
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos/MostraProdutos";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//From here
import theme from "./theme";

//From util
import colors from "../util/Colors";

//From services
import InitPath from "../services/InitPath";

class ProdutosBuscado extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: null,
    };
  }

  getResults() {
    const results = this.state.produtos ? this.state.produtos.length : 0;
    return (
      results +
      " " +
      (results === 1 ? "produto encontrado" : "produtos encontrados")
    );
  }

  hasResults() {
    const results = this.state.produtos ? this.state.produtos.length : 0;
    return results > 0 ? 50 : 0;
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{
              marginBottom: this.hasResults(),
            }}
          >
            <Box
              width={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "100%",
                height: "250px",
                backgroundImage:
                  "url('https://skeavee.com/imagens/portaly/assets/BACKGROUNDCATEGORIA.png')",
                marginBottom: this.hasResults(),
              }}
            >
              <NavLink to={`${InitPath}/`}>
                <ArrowBackIcon
                  style={{
                    width: 80,
                    height: 80,
                    color: colors.white,
                  }}
                />
              </NavLink>
              <Typography
                variant="h3"
                align="center"
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  marginBottom: 5,
                  padding: 50,
                }}
              >
                {this.props.match.params.value.charAt(0).toUpperCase() +
                  this.props.match.params.value.slice(1)}
                <Typography
                  align="center"
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                  }}
                >
                  {this.getResults()}
                </Typography>
              </Typography>
            </Box>
            <Divider
              className="line_title_section"
              variant="middle"
              orientation="horizontal"
              flexItem
            />
            {this.state.produtos !== null || undefined ? (
              MostrarProdutos(produtos, false)
            ) : (
              <LineLoading />
            )}
          </Grid>
        </ThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.produtos,
});

export default connect(mapStateToProps, null)(ProdutosBuscado);
