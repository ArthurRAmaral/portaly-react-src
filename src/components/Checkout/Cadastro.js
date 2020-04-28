import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";

const varName = "dadosCadastro";

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
    this.state[e.target.id] = e.target.value;
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
    sessionStorage.setItem(varName, JSON.stringify(this.state));
  }

  render() {
    return (
      <Fragment>
        <TextField
          id="first_name"
          onChange={this.handleChange}
          label="Nome"
          value={this.state.first_name}
          variant="outlined"
        />
        <TextField
          id="last_name"
          onChange={this.handleChange}
          label="Sobrenome"
          value={this.state.last_name}
          variant="outlined"
        />
        <TextField
          id="cpf"
          onChange={this.handleChange}
          label="CPF"
          value={this.state.cpf}
          variant="outlined"
        />
        <TextField
          id="address_1"
          onChange={this.handleChange}
          label="Endereço 1"
          value={this.state.address_1}
          variant="outlined"
        />
        <TextField
          id="address_2"
          onChange={this.handleChange}
          label="Endereço 2"
          value={this.state.address_2}
          variant="outlined"
        />
        <TextField
          id="city"
          onChange={this.handleChange}
          label="Cidade"
          value={this.state.city}
          variant="outlined"
        />
        <TextField
          id="state"
          onChange={this.handleChange}
          label="Estado"
          value={this.state.state}
          variant="outlined"
        />
        <TextField
          id="postcode"
          onChange={this.handleChange}
          label="CEP"
          value={this.state.postcode}
          variant="outlined"
        />
        <TextField
          id="country"
          onChange={this.handleChange}
          label="País"
          value={this.state.country}
          variant="outlined"
        />
        <TextField
          id="email"
          onChange={this.handleChange}
          label="Email"
          value={this.state.email}
          variant="outlined"
        />
        <TextField
          id="phone"
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
