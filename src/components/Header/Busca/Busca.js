//From dependencies
import React, { Component } from "react";

//Material-ui
import Grid from "@material-ui/core/Grid";

//From here
import Search from "./search";

//From service
import InitPath from "../../../services/InitPath";

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
          <form onSubmit={this.handleSubmit}>
            <Search
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Busca;
