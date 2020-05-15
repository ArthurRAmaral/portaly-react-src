//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import LineLoading from "../components/loading/LineLoading";
import VerticalTab from "../components/ImagensTab/VerticalTab";
import InformacoesProduto from "../components/informacoesProduto/informacoesProduto";

//From Material-ui
import Grid from "@material-ui/core/Grid";

class PaginaProduto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produto: null,
    };
  }

  async componentDidMount() {
    const { slug } = this.props.match.params;
    let produto;

    Object.values(this.props.produtos).forEach((prods) => {
      prods.forEach((prod) => {
        if (prod.slug === slug) {
          produto = prod;
        }
      });
    });
    this.setState({ produto: produto });
  }

  renderProduto = () => {
    const { produto } = this.state;
    return (
      <Fragment>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-evenly"
        >
          <Grid>
            <VerticalTab produto={produto} />
          </Grid>
          <Grid>
            <InformacoesProduto produto={produto} />
          </Grid>
        </Grid>
        <Grid container> </Grid>
      </Fragment>
    );
  };

  render() {
    return (
      <Grid container justify="center" style={{ padding: 20 }}>
        {this.state.produto ? this.renderProduto() : <LineLoading />}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({ produtos: state.produtos });

export default connect(mapStateToProps, null)(PaginaProduto);
