//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

//From components
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos/MostraProdutos";
import SemProdutos from "../components/semProdutos";

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
              marginBottom: 40,
            }}
          >
            <Box width={1} component={NavLink} to={`${InitPath}/`}>
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  backgroundImage:
                    "url('https://skeavee.com/imagens/portaly/assets/BACKGROUNDCATEGORIA.png')",
                  marginBottom: 40,
                }}
              ></div>
              <ArrowBackIcon
                style={{
                  width: 50,
                  height: 50,
                  color: colors.white,
                  marginRight: 50,
                  position: "absolute",
                  top: "40%",
                  left: "30%",
                  transform: "translate(-50%,-40%)",
                }}
              />
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Typography
                  variant="h3"
                  align="center"
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  Buscado: {this.props.match.params.value}
                </Typography>
              </Grid>
            </Box>
            <Divider
              className="line_title_section"
              variant="middle"
              orientation="horizontal"
              flexItem
            />
            {this.state.produtos !== null || undefined ? (
              this.state.produtos.length > 0 ? (
                MostrarProdutos(produtos)
              ) : (
                <SemProdutos />
              )
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
