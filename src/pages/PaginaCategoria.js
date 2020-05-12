//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import MostraProdutos from "../components/MostraProdutos";
import LineLoaging from "../components/loading/LineLoading";

//From redux
import { buscaProduto } from "../redux/actions/produtoActions";

class PaginaCategorias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: props.produtos,
      paginaId: props.match.params.id,
    };
  }
  componentDidMount() {
    this.props.buscaProduto(this.state.paginaId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.buscaProduto(nextProps.match.params.id);

    this.setState({
      produtos: nextProps.produtos,
      paginaId: nextProps.match.params.id,
    });
  }

  escolheProdutosCategorias() {
    for (const id in this.state.produtos)
      if (id === this.state.paginaId) return this.state.produtos[id];
  }

  render() {
    const { paginaId } = this.state;
    const prods = this.escolheProdutosCategorias();

    return (
      <Fragment>
        {prods && paginaId === this.props.match.params.id ? (
          MostraProdutos(prods)
        ) : (
          <LineLoaging />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  produtos: state.produtos,
});

const mapDispatchToProps = { buscaProduto };

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCategorias);
