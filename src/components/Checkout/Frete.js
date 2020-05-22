import React, { Component, Fragment } from "react";
import { mask, unMask } from "remask";
import TextField from "@material-ui/core/TextField";

const varCadastro = "dadosCadastro";
const varFrete = "dadosFrete";

const inputsIds = {
  address_1: "address_1",
  address_2: "address_2",
  city: "city",
  state: "state",
  postcode: "postcode",
  country: "country",
};

class Cadastro extends Component {
  constructor(props) {
    super(props);
    let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
    let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));

    this.state = dadosCadastro
      ? dadosFrete
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
          }
      : {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const toSave = this.state;
    const id = e.target.id;

    let value = e.target.value;

    if (id === "postcode") {
      const unMasked = unMask(value);
      value = mask(unMasked, ["99.999-999"]);
    }

    toSave[id] = value;
    sessionStorage.setItem(varFrete, JSON.stringify(toSave));
    this.setState({ [id]: value });
  }

  componentDidMount() {
    sessionStorage.setItem(varFrete, JSON.stringify(this.state));
  }

  render() {
    return (
      <Fragment>
        {" "}
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
      </Fragment>
    );
  }
}

export default Cadastro;
