//From depedencies
import React from "react";
import Stepper from "../components/Checkout/StepperChekout/StepperCheckout";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From here
import theme from "./theme";

function PaginaCarrinho() {
  return (
    <ThemeProvider theme={theme}>
      <Stepper />
    </ThemeProvider>
  );
}

export default PaginaCarrinho;
