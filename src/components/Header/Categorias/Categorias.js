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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ApiCategories = (categorias) => {
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: 0,
      }}
    >
      <ListItem
        key="categoria-todos"
        style={{
          padding: 0,
        }}
      >
        <NavLink
          exact
          key={`Todos`}
          to={`${InitPath}/`}
          activeStyle={{ fontWeight: "bold" }}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            color: colors.orangeDark,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>{`Todos`}</p>
        </NavLink>
      </ListItem>
      {categorias.map((cat) => {
        return (
          <ListItem
            key={`lista-${cat.id}`}
            style={{
              padding: 0,
            }}
          >
            <NavLink
              key={`categorias${cat.id}`}
              to={`${InitPath}/categoria/${cat.id}`}
              activeStyle={{ fontWeight: "bold" }}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                color: colors.orangeDark,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{cat.name}</p>
            </NavLink>
          </ListItem>
        );
      })}
      <ListItem
        key="categoria-monte-sua-porta"
        style={{
          padding: 0,
        }}
      >
        <NavLink
          key={`montesuaporta`}
          to={`/montesuaporta`}
          activeStyle={{ fontWeight: "bold" }}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            color: colors.orangeDark,
            backgroundColor: colors.orangeLight,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>{`Monte Sua Porta`}</p>
          <ArrowForwardIcon fontSize="large" />
        </NavLink>
      </ListItem>
    </List>
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
        wrap="wrap"
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
