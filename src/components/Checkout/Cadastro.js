import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { mask, unMask } from "remask";

const varName = "dadosCadastro";

const inputsIds = {
  first_name: "first_name",
  last_name: "last_name",
  cpf: "cpf",
  address_1: "address_1",
  address_2: "address_2",
  city: "city",
  state: "state",
  postcode: "postcode",
  country: "country",
  email: "email",
  phone: "phone",
};

class Cadastro extends Component {
  constructor(props) {
    super(props);
    let dados = JSON.parse(sessionStorage.getItem(varName));

    this.state = dados
      ? dados
      : {
          first_name: "",
          last_name: "",
          cpf: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          email: "",
          phone: "",
        };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const toSave = this.state;
    const id = e.target.id;

    let value = e.target.value;

    if (id === inputsIds.cpf) {
      const unMasked = unMask(value);
      value = mask(unMasked, ["999.999.999-99", "99.999.999/9999-99"]);
    }

    if (id === inputsIds.postcode) {
      const unMasked = unMask(value);
      value = mask(unMasked, ["99.999-999"]);
    }

    if (id === inputsIds.phone) {
      const unMasked = unMask(value);
      value = mask(unMasked, ["(99) 9999-9999", "(99) 99999-9999"]);
    }

    toSave[id] = value;
    sessionStorage.setItem(varName, JSON.stringify(toSave));
    this.setState({ [id]: value });
  }

  componentDidMount() {
    sessionStorage.setItem(varName, JSON.stringify(this.state));
    // this.handleDataValid();
  }

  render() {
    return (
      <Fragment>
        <TextField
          id={inputsIds.first_name}
          onChange={this.handleChange}
          label="Nome"
          value={this.state.first_name}
          variant="outlined"
          onBlur={this.handleValidator}
          name="isWord"
        />
        <TextField
          id={inputsIds.last_name}
          onChange={this.handleChange}
          label="Sobrenome"
          value={this.state.last_name}
          variant="outlined"
        />
        <TextField
          id={inputsIds.cpf}
          onChange={this.handleChange}
          label="CPF"
          value={this.state.cpf}
          variant="outlined"
        />
        <TextField
          id={inputsIds.address_1}
          onChange={this.handleChange}
          label="Rua"
          value={this.state.address_1}
          variant="outlined"
        />
        <TextField
          id={inputsIds.address_2}
          onChange={this.handleChange}
          label="Número"
          value={this.state.address_2}
          variant="outlined"
        />
        <TextField
          id={inputsIds.city}
          onChange={this.handleChange}
          label="Cidade"
          value={this.state.city}
          variant="outlined"
        />
        <TextField
          id={inputsIds.state}
          onChange={this.handleChange}
          label="Estado"
          value={this.state.state}
          variant="outlined"
        />
        <TextField
          id={inputsIds.postcode}
          onChange={this.handleChange}
          label="CEP"
          value={this.state.postcode}
          variant="outlined"
        />
        <TextField
          id={inputsIds.country}
          onChange={this.handleChange}
          label="País"
          value={this.state.country}
          variant="outlined"
        />
        <TextField
          id={inputsIds.email}
          onChange={this.handleChange}
          label="Email"
          value={this.state.email}
          variant="outlined"
        />
        <TextField
          id={inputsIds.phone}
          onChange={this.handleChange}
          label="Telefone"
          value={this.state.phone}
          variant="outlined"
        />
      </Fragment>
    );
  }
}

export default Cadastro;
