import React, { Component, Fragment } from "react";
import mapBox from "../../services/mapBoxAndReact/MapBoxApi";
import { connect } from "react-redux";

import { salvaFrete } from "../../redux/actions/freteActions";

import TextField from "@material-ui/core/TextField";

import MostraProdutosCarrinho from "./MostraProdutosCarrinhoResumido";
import SemProduto from "../semProdutos";
import ApiCupom from "../../services/ApiCupom";

// import ApiProdutos from "../../util/ApiProdutos.js";

// import Carrinho from "../../util/Carrinho.js";

// const varCadastro = "dadosCadastro";
// const varFrete = "dadosFrete";

class Pagamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tax: null,
      place: null,
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
    console.log(cupom.data.length);

    if (couponExist && cupom.data[0].free_shipping) {
      this.props.salvaFrete("0");
      value = " Grátis";
    } else {
      await mapBox.getTax(shipTo).then((tax) => {
        value = tax;
        this.props.salvaFrete(value);
      });
    }

    await mapBox.getPlace(shipTo).then((place_name) => {
      place = place_name;
    });

    this.setState({ tax: value });
    this.setState({ place: place });
    this.setState({
      buyer: dadosCadastro.first_name + " " + dadosCadastro.last_name,
    });

    let type = "",
      amount = 0;
    if (couponExist) {
      console.log("existe");
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
      <div className="Entrega">
        Entrega para:{" "}
        <span>
          {" "}
          {this.state.buyer
            ? this.state.buyer
            : "Sem comprador identificado"}{" "}
        </span>{" "}
        <br></br>
        <Fragment>
          {this.props.carrinho ? (
            MostraProdutosCarrinho(this.props.carrinho)
          ) : (
            <SemProduto />
          )}
          {this.state.coupon !== "" ? (
            <TextField
              id="coupon"
              label="Cupom"
              value={this.state.coupon}
              variant="outlined"
            />
          ) : (
            ""
          )}
        </Fragment>
        <span>{this.state.couponDesc}</span>
        <br></br>
        <span>
          {" "}
          {this.state.place ? this.state.place : "Sem local de entrega"}
        </span>{" "}
        <br></br>
        <span>
          {" "}
          Valor de Frete: R${this.state.tax ? this.state.tax : "Buscando Frete"}
        </span>
      </div>
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
