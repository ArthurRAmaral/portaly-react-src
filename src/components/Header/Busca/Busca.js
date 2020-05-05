//From dependencies
import React, { Component } from "react";

//Material-ui
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import InitPath from "../../../services/InitPath";
import colors from "../../../util/Colors";

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    if (this.state.value !== "") {
      window.location.href = `/busca/${this.state.value}`;
    } else {
      window.location.href = `${InitPath}/`;
    }
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Grid item>
        <Grid container direction="row" alignItems="center" justify="center">
          <form
            onSubmit={this.handleSubmit}
            style={{
              backgroundColor: colors.orangeLight,
              borderRadius: 10,
              height: 50,
            }}
          >
            <SearchIcon
              onClick={this.handleSubmit}
              style={{
                width: 50,
                height: 50,
                color: colors.orangeDark,
                cursor: "pointer",
              }}
            />
            <TextField
              label="Buscar"
              variant="outlined"
              id="buscaInput"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              style={{
                minWidth: 400,
              }}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Busca;
