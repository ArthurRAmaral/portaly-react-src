//From dependencies
import React, { Component } from "react";

//Material-ui
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';


export default class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    window.location.href = `/busca/${this.state.value}`;
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Grid item >
        <form onSubmit={this.handleSubmit}>
          <Grid className="search-area">
            <SearchIcon />
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              id="buscaInput"
              className="search-input"
              placeholder="Busque um produto"
            />
          </Grid>
        </form>
      </Grid>
    );
  }
}
