//From dependencies
import React, { Component, Fragment } from "react";

//From components
import TopHeader from "./TopHeader/TopHeader";
import MainHeader from "./MainHeader/MainHeader";

class Headers extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <TopHeader />
          <MainHeader />
        </header>
      </Fragment>
    );
  }
}

export default Headers;
