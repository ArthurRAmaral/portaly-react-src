//From dependencies
import React, { Component, Fragment } from "react";

//From components
import TopHeader from "./TopHeader/TopHeader";
import MainHeader from "./MainHeader/MainHeader";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";

//From here
import theme from "../../pages/theme";

class Headers extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <header>
            <TopHeader />
            <MainHeader />
          </header>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default Headers;
