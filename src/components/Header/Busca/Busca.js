//From dependencies
import React, { Component } from "react";

//Material-ui
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InitPath from '../../../services/InitPath';
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
    if(this.state.value !==""){
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
        <form
          onSubmit={this.handleSubmit}
          style={{
            backgroundColor: colors.orangeLight,
            borderRadius: 10,
            height: 50,
          }}
        >
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justify="flex-start"
            wrap="nowrap"
          >
            <Grid item container justify="center" alignContent="center">
              <SearchIcon
                onClick={this.handleSubmit}
                style={{
                  width: 50,
                  height: 50,
                  color: colors.orangeDark,
                  cursor: "pointer",
                }}
              />
            </Grid>
            <Grid item>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                label="Buscar"
                id="buscaInput"
                style={{ minWidth: 400 }}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default Busca;
