//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From Material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

//From checkout
import MostraProdutosCarrinho from "./MostraProdutosCarrinho";
import SemProduto from "../../semProdutos";

//From redux
import {
  removeProductCart,
  updateQuantidade,
  removeKit,
  updateQuantidadeKit,
} from "../../../redux/actions/cartActions";
import { salvaCupom } from "../../../redux/actions/cupomActions";

//From util
import colors from "../../../util/Colors";

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupon: "",
    };
  }

  componentDidMount = () => {
    this.props.salvaCupom("");
  };

  handleChange = async (e) => {
    this.setState({ coupon: e.target.value });
  };

  handleClick = () => {
    this.props.salvaCupom(this.state.coupon);
  };

  render() {
    return (
      <Fragment>
        <Grid container direction="column" alignItems="center" justify="center">
          <Box
            borderBottom={2}
            marginBottom={10}
            style={{
              borderColor: colors.orangeDark,
            }}
          >
            <Typography
              className=""
              variant="h3"
              style={{
                color: colors.orangeDark,
              }}
            >
              Carrinho
            </Typography>
          </Box>

          {this.props.carrinho.quantidadeTotal ? (
            <MostraProdutosCarrinho
              produtos={this.props.produtos}
              carrinho={this.props.carrinho}
              removeProductCart={this.props.removeProductCart}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              handleUpdateQuant={this.props.updateQuantidade}
              coupon={this.state.coupon}
              removeKit={this.props.removeKit}
              updateQuantidadeKit={this.props.updateQuantidadeKit}
            />
          ) : (
            <SemProduto />
          )}
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  produtos: state.produtos,
  carrinho: state.carrinho,
  cupom: state.cupom,
});

const mapDispatchToProps = {
  removeProductCart,
  salvaCupom,
  updateQuantidade,
  removeKit,
  updateQuantidadeKit,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginaCarrinho);
