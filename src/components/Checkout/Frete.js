import React, { Component, Fragment } from "react";
import { mask, unMask } from "remask";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//From util
import colors from "../../util/Colors";

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
            errors: {
              first_name: false,
              last_name: false,
              address_1: false,
              address_2: false,
              city: false,
              state: false,
              postcode: false,
              country: false,
            },
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
          errors: {
            first_name: false,
            last_name: false,
            address_1: false,
            address_2: false,
            city: false,
            state: false,
            postcode: false,
            country: false,
          },
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
    this.validate();
  }

  validate() {
    const inputsValues = this.state;

    for (const key in inputsValues) {
      const input = inputsValues[key];
      if (
        key === "first_name" ||
        key === "last_name" ||
        key === "address_1" ||
        key === "address_2" ||
        key === "city" ||
        key === "state" ||
        key === "email" ||
        key === "country"
      ) {
        if (input.length <= 0) {
          this.props.setValidInputs(false);
          const state = this.state;
          state.errors[key] = true;
          this.setState(state);
          return;
        } else {
          const state = this.state;
          state.errors[key] = false;
          this.setState(state);
        }
      } else if (key === "cpf") {
        if (input.length < 14) {
          this.props.setValidInputs(false);
          const state = this.state;
          state.errors[key] = true;
          this.setState(state);
          return;
        } else {
          const state = this.state;
          state.errors[key] = false;
          this.setState(state);
        }
      } else if (key === "postcode") {
        if (input.length < 10) {
          this.props.setValidInputs(false);
          const state = this.state;
          state.errors[key] = true;
          this.setState(state);
          return;
        } else {
          const state = this.state;
          state.errors[key] = false;
          this.setState(state);
        }
      } else if (key === "phone") {
        if (input.length < 14) {
          this.props.setValidInputs(false);
          const state = this.state;
          state.errors[key] = true;
          this.setState(state);
          return;
        } else {
          const state = this.state;
          state.errors[key] = false;
          this.setState(state);
        }
      }
    }
    this.props.setValidInputs(true);
  }

  componentDidMount() {
    sessionStorage.setItem(varFrete, JSON.stringify(this.state));
    this.validate();
  }

  render() {
    return (
      <Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
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
              Frete
            </Typography>
          </Box>
        </Grid>
        <Container maxWidth="md">
          <Grid container direction="row" alignItems="center" justify="center">
            <TextField
              id={inputsIds.address_1}
              onChange={this.handleChange}
              label="Rua"
              value={this.state.address_1}
              variant="outlined"
              error={this.state.errors.address_1}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
            <TextField
              id={inputsIds.address_2}
              onChange={this.handleChange}
              label="Número"
              value={this.state.address_2}
              variant="outlined"
              error={this.state.errors.address_2}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
            <TextField
              id={inputsIds.city}
              onChange={this.handleChange}
              label="Cidade"
              value={this.state.city}
              variant="outlined"
              error={this.state.errors.city}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
            <TextField
              id={inputsIds.state}
              onChange={this.handleChange}
              label="Estado"
              value={this.state.state}
              variant="outlined"
              error={this.state.errors.state}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
            <TextField
              id={inputsIds.postcode}
              onChange={this.handleChange}
              label="CEP"
              value={this.state.postcode}
              variant="outlined"
              error={this.state.errors.postcode}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
            <TextField
              id={inputsIds.country}
              onChange={this.handleChange}
              label="País"
              value={this.state.country}
              variant="outlined"
              error={this.state.errors.country}
              style={{
                paddingBottom: 30,
                paddingRight: 15,
              }}
            />
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Cadastro;
