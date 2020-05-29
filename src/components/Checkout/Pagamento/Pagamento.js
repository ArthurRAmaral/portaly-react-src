import React, { Component, Fragment } from "react";
import mapBox from "../../../services/mapBoxAndReact/MapBoxApi";
import { connect } from "react-redux";

import { salvaFrete } from "../../../redux/actions/freteActions";

import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import colors from "../../../util/Colors";

import MostraProdutosCarrinho from "./MostraProdutosCarrinhoResumido";
import SemProduto from "../../semProdutos";
import ApiCupom from "../../../services/ApiCupom";

class Pagamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tax: 0,
      place: null,
      gratis: false,
      buyer: null,
      coupon: this.props.cupom.length > 0 ? this.props.cupom.join("") : "",
      couponDesc: "",
    };
  }

  async componentDidMount() {
    const varFrete = "dadosFrete";
    const varCadastro = "dadosCadastro";
    const data = JSON.parse(sessionStorage.getItem(varFrete));
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let shipTo =
      data.address_1 +
      " " +
      data.postcode +
      " " +
      data.city +
      " " +
      data.state +
      " " +
      data.country;
    shipTo = shipTo.split(" ").join("%20");

    let value;
    let place;

    const propCoupon = this.state.coupon;

    const cupom = await ApiCupom.getCoupon(propCoupon);
    const couponExist = cupom.data.length === 1;

    if (couponExist && cupom.data[0].free_shipping) {
      this.props.salvaFrete("0");
      value = " Grátis";
    } else {
      this.setState({ gratis: true });
      await mapBox.getTax(shipTo).then((tax) => {
        value = tax;
        this.props.salvaFrete(value);
      });
    }

    await mapBox.getPlace(shipTo).then((place_name) => {
      place = place_name;
    });

    this.setState({ tax: value });
    if (couponExist && cupom.data[0].free_shipping) {
      this.setState({ tax: 0 });
      this.setState({ gratis: "Grátis" });
    }
    this.setState({ place: place });
    this.setState({
      buyer: dadosCadastro.first_name + " " + dadosCadastro.last_name,
    });

    let type = "",
      amount = 0;
    if (couponExist) {
      type = cupom.data[0].discount_type;
      amount = cupom.data[0].amount;
    }

    if (type === "fixed_product" && amount > 0) {
      this.setState({
        couponDesc: `Cupom de até R$${cupom.data[0].amount} por produto para produtos específicos!`,
      });
    } else if (type === "fixed_cart" && amount > 0) {
      this.setState({
        couponDesc: `Cupom de até R$${cupom.data[0].amount} de desconto!`,
      });
    } else if (type === "percent" && amount > 0) {
      this.setState({
        couponDesc: `Cupom de ${cupom.data[0].amount}% de desconto no valor total!`,
      });
    } else if (!couponExist && propCoupon !== "") {
      this.setState({ couponDesc: "Cupom inválido :(" });
    }

    if (couponExist && cupom.data[0].free_shipping) {
      this.setState({
        couponDesc: this.state.couponDesc + " Cupom de frete grátis!",
      });
    }
  }

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
              Revisão do Pedido
              {this.state.buyer ? " de " + this.state.buyer : ""}
            </Typography>
          </Box>

          {this.props.carrinho.quantidadeTotal ? (
            <MostraProdutosCarrinho
              freteGratis={this.state.gratis}
              fretePreco={this.state.tax}
              freteLugar={this.state.place}
              couponDesc={this.state.couponDesc}
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
      //   <div className="Entrega">
      //     Entrega para:{" "}
      //     <span>
      //       {" "}
      //       {this.state.buyer
      //         ? this.state.buyer
      //         : "Sem comprador identificado"}{" "}
      //     </span>{" "}
      //     <br></br>
      //     <Fragment>
      //       {this.props.carrinho ? (
      //         <MostraProdutosCarrinho
      //           fretePreco={this.state.tax}
      //           freteLugar={this.state.place}
      //           couponDesc={this.state.couponDesc}
      //           buyer={this.state.buyer}
      //           produtos={this.props.produtos}
      //           carrinho={this.props.carrinho}
      //           removeProductCart={this.props.removeProductCart}
      //           handleChange={this.handleChange}
      //           handleClick={this.handleClick}
      //           handleUpdateQuant={this.props.updateQuantidade}
      //           coupon={this.state.coupon}
      //           removeKit={this.props.removeKit}
      //           updateQuantidadeKit={this.props.updateQuantidadeKit}
      //         />
      //       ) : (
      //         <SemProduto />
      //       )}
      //     </Fragment>
      //     <span>
      //       {" "}
      //       {this.state.place ? this.state.place : "Sem local de entrega"}
      //     </span>{" "}
      //     <br></br>
      //     <span>
      //       {" "}
      //       Valor de Frete: R${this.state.tax ? this.state.tax : "Buscando Frete"}
      //     </span>
      //   </div>
    );
  }
}

const mapStateToProps = (state) => ({
  frete: state.frete,
  carrinho: state.carrinho,
  cupom: state.cupom,
});

const mapDispatchToProps = { salvaFrete };

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
