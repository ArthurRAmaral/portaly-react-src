import React, { Component, Fragment } from "react";
import Slide from "../components/Slide";
import Tabs from "../components/Tabs";

class HomePage extends Component {

  render() {
    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#ebebeb",
          display: "inline-table",
        }}
      >
        <Slide />
        <Tabs />
      </div>
    );
  }
}

export default HomePage;
