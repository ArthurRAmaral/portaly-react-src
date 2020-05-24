//From depedencies
import React, { Component } from "react";

//From componensts
import Setepper from "../components/MonteSuaPorta/Stepper/Stepper.js";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From util
import Montador from "../util/MontadorPorta";

//From here
import theme from "./theme";

class MonteSuaPorta extends Component {
  constructor(props) {
    Montador.resetMontador();

    super(props);

    this.state = {
      porta: null,
      itens: [],
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Setepper />
      </ThemeProvider>
    );
  }
}

export default MonteSuaPorta;
