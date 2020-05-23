//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import MostraProdutos from "../components/MostraProdutos/MostraProdutos";
import LineLoaging from "../components/loading/LineLoading";
import Paginador from "../components/paginador/Paginador";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From here
import theme from "./theme";

//From redux
import { buscaProduto } from "../redux/actions/produtoActions";

//From reutildux
import { paginar } from "../util/prodsToPag";

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

  render() {
    const { paginaId } = this.state;
    const prods = this.escolheProdutosCategorias();

    const paginas = paginar(prods, QUANTIDADE_POR_PAGINA);

    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          {prods && paginaId === this.props.match.params.id ? (
            <Fragment>
              {MostraProdutos(paginas[this.state.page - 1])}
              {Paginador(paginas.length, this.mudarPagina)}
            </Fragment>
          ) : (
            <LineLoaging />
          )}
        </ThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  produtos: state.produtos,
});

const mapDispatchToProps = { buscaProduto };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCategorias);
