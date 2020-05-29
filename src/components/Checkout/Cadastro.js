import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { mask, unMask } from "remask";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//From util
import colors from "../../util/Colors";

const varName = "dadosCadastro";

const inputsIds = {
  first_name: "first_name",
  last_name: "last_name",
  cpf: "cpf",
  email: "email",
  phone: "phone",
  country: "country",
  state: "state",
  city: "city",
  postcode: "postcode",
  address_1: "address_1",
  address_2: "address_2",
};

class Cadastro extends Component {
  constructor(props) {
    super(props);
    let dados = JSON.parse(sessionStorage.getItem(varName));

    this.state = dados
      ? dados
      : {
          errors: {
            first_name: false,
            last_name: false,
            cpf: false,
            email: false,
            phone: false,
            country: false,
            state: false,
            city: false,
            postcode: false,
            address_1: false,
            address_2: false,
          },
          first_name: "",
          last_name: "",
          cpf: "",
          email: "",
          phone: "",
          country: "",
          state: "",
          city: "",
          postcode: "",
          address_1: "",
          address_2: "",
        };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
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
      value = mask(unMasked, [
        "(99) 9999-9999",
        "(99) 99999-9999",
        "+9 (99) 99999-9999",
        "+99 (99) 99999-9999",
      ]);
    }

    toSave[id] = value;
    sessionStorage.setItem(varName, JSON.stringify(toSave));
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
    sessionStorage.setItem(varName, JSON.stringify(this.state));
    this.validate();
    // this.handleDataValid();
  }

  render() {
    return (
      <Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          <Box
            borderBottom={1}
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
              Cadastro
            </Typography>
          </Box>
        </Grid>
        <Container maxWidth="md">
          <Grid container direction="row" alignItems="center" justify="center">
            <div>
              <TextField
                id={inputsIds.first_name}
                onChange={this.handleChange}
                label="Nome"
                value={this.state.first_name}
                variant="outlined"
                name="isWord"
                error={this.state.errors.first_name}
                style={{
                  paddingBottom: 30,
                  paddingRight: 15,
                }}
              />
              <TextField
                id={inputsIds.last_name}
                onChange={this.handleChange}
                label="Sobrenome"
                value={this.state.last_name}
                variant="outlined"
                error={this.state.errors.last_name}
                style={{
                  paddingBottom: 30,
                  paddingRight: 15,
                }}
              />
              <TextField
                id={inputsIds.cpf}
                onChange={this.handleChange}
                label="CPF"
                value={this.state.cpf}
                variant="outlined"
                error={this.state.errors.cpf}
                style={{
                  paddingBottom: 30,
                  paddingRight: 15,
                }}
              />
              <TextField
                id={inputsIds.email}
                onChange={this.handleChange}
                label="Email"
                value={this.state.email}
                variant="outlined"
                error={this.state.errors.email}
                style={{
                  paddingBottom: 30,
                  paddingRight: 15,
                }}
              />
              <TextField
                id={inputsIds.phone}
                onChange={this.handleChange}
                label="Telefone"
                value={this.state.phone}
                variant="outlined"
                error={this.state.errors.phone}
                style={{
                  paddingBottom: 30,
                  paddingRight: 15,
                }}
              />
            </div>
            <div>
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
            </div>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default Cadastro;
