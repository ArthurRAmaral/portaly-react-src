import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";

const varCadastro = "dadosCadastro";
const varFrete = "dadosFrete";

class Cadastro extends Component {
  constructor(props) {
    super(props);
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));

    this.state = dadosFrete
      ? dadosFrete
      : {
          first_name: dadosCadastro.first_name,
          last_name: dadosCadastro.last_name,
          address_1: dadosCadastro.address_1,
          address_2: dadosCadastro.address_2,
          city: dadosCadastro.city,
          state: dadosCadastro.state,
          postcode: dadosCadastro.postcode,
          country: dadosCadastro.country,
        };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.state[e.target.id] = e.target.value;
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
    sessionStorage.setItem(varFrete, JSON.stringify(this.state));
  }

  render() {
    return (
      <Fragment>
        {" "}
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
      </Fragment>
    );
  }
}

export default Cadastro;
