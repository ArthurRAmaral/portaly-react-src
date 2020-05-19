import React, { Component, Fragment } from "react";
import mapBox from "../../services/mapBoxAndReact/MapBoxApi";
import { connect } from "react-redux";

import { salvaFrete } from "../../redux/actions/freteActions";
import { salvaCupom } from "../../redux/actions/cupomActions";

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
      coupon: "só quero testar ",
    };
  }

  handleChange = async (e) => {
    const newVal = await e.target.value;
    this.setState({ coupon: newVal });
  };

  handleClick = () => {
    this.props.salvaCupom(this.state.coupon);
    window.location.reload();
  };

  async componentDidMount() {
    const varFrete = "dadosFrete";
    const varCadastro = "dadosCadastro";
    const data = JSON.parse(sessionStorage.getItem(varFrete));
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let shipTo =
      data.address_2 +
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

    let cupom = this.props.cupom.join("");

    cupom = await ApiCupom.getCoupon(cupom);

    if (cupom.data[0].free_shipping) {
      value = "0";
      this.props.salvaFrete(value);
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
          <TextField
            id="coupon"
            onChange={this.handleChange}
            label="Cupom"
            variant="outlined"
          />
          <button onClick={this.handleClick}>Aplicar</button>
        </Fragment>
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

const mapDispatchToProps = { salvaFrete, salvaCupom };

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
