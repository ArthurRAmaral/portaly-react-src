//From depedencies
import React from "react";

//From componensts
import Setepper from "../components/MonteSuaPorta/Stepper/Stepper.js";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From util
import Montador from "../util/MontadorPorta";

//From here
import theme from "./theme";

function MonteSuaPorta() {
  Montador.resetMontador();

  return (
    <ThemeProvider theme={theme}>
      <Setepper />
    </ThemeProvider>
  );
}

export default MonteSuaPorta;
