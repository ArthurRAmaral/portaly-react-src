//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import MostraProdutos from "../components/MostraProdutos/MostraProdutos";
import LineLoaging from "../components/loading/LineLoading";
import Paginador from "../components/paginador/Paginador";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

//From here
import theme from "./theme";

//From redux
import { buscaProduto } from "../redux/actions/produtoActions";

//From reutildux
import { paginar } from "../util/prodsToPag";

//From util
import colors from "../util/Colors";

const QUANTIDADE_POR_PAGINA = 5;

class PaginaCategorias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: props.produtos,
      paginaId: props.match.params.id,
      page: props.page || 1,
    };

    this.mudarPagina = this.mudarPagina.bind(this);
  }

  componentDidMount() {
    this.props.buscaProduto(this.state.paginaId);
    console.log(this.props.produtos);
  }

  componentWillReceiveProps(nextProps) {
    this.props.buscaProduto(nextProps.match.params.id);

    this.setState({
      page: 1,
      produtos: nextProps.produtos,
      paginaId: nextProps.match.params.id,
    });
  }

  escolheProdutosCategorias() {
    for (const id in this.state.produtos)
      if (id === this.state.paginaId) return this.state.produtos[id];
  }

  mudarPagina(page) {
    this.setState({ page });
  }

  getCategoria(value) {
    for (const category of this.props.categorias) {
      if (category.id == value) {
        return category.name;
      }
    }
  }

  render() {
    const { paginaId } = this.state;
    const prods = this.escolheProdutosCategorias();

    const paginas = paginar(prods, QUANTIDADE_POR_PAGINA);

    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box
              borderBottom={1}
              margin={5}
              style={{
                borderColor: colors.orangeDark,
              }}
            >
              <Typography
                variant="h3"
                style={{
                  color: colors.orangeDark,
                  fontWeight: "bold",
                }}
              >
                {this.getCategoria(this.props.match.params.id)}
              </Typography>
            </Box>
            <Divider
              className="line_title_section"
              variant="middle"
              orientation="horizontal"
              flexItem
            />
            {prods && paginaId === this.props.match.params.id ? (
              <Fragment>
                {MostraProdutos(paginas[this.state.page - 1])}
                {Paginador(paginas.length, this.mudarPagina)}
              </Fragment>
            ) : (
              <LineLoaging />
            )}
          </Grid>
        </ThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  produtos: state.produtos,
  categorias: state.categorias,
});

const mapDispatchToProps = { buscaProduto };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCategorias);
