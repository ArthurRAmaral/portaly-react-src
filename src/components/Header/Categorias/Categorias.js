//From dependencies
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

//From utils
import ApiCategorias from "../../../util/ApiCategorias";
import colors from "../../../util/Colors";

//From services
import InitPath from "../../../services/InitPath";

//Materail-ui
import Grid from "@material-ui/core/Grid";

const ApiCategories = (categorias) => {
  return (
    <Fragment>
      <Grid>
        <NavLink
          exact
          key={`Todos`}
          to={`${InitPath}/`}
          activeStyle={{ backgroundColor: colors.orangeLight }}
        >
          {`Todos`}
        </NavLink>
      </Grid>
      {categorias.map((cat) => {
        return (
          <Grid key={cat.id}>
            <NavLink
              key={`categorias${cat.id}`}
              to={`${InitPath}/categoria/${cat.id}`}
              activeStyle={{ backgroundColor: colors.orangeLight }}
            >
              <div>{cat.name}</div>
            </NavLink>
          </Grid>
        );
      })}
      <Grid>
        <NavLink
          key={`montesuaporta`}
          to={`/montesuaporta`}
          activeStyle={{ backgroundColor: colors.orangeLight }}
        >
          {`Monte Sua Porta`}
        </NavLink>
      </Grid>
    </Fragment>
  );
};

class Categorias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    ApiCategorias.getAllCategorias().then((res) => {
      this.setState({ categories: [...this.state.categories, ...res.data] });
    });
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{
          height: 60,
        }}
      >
        {this.state.categories.length > 0
          ? ApiCategories(this.state.categories)
          : ""}
      </Grid>
    );
  }
}

export default Categorias;
