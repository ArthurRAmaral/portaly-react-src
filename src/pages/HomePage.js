import React, { Component, Fragment } from "react";
import ApiProdutos from "../util/ApiProdutos";
import LineLoading from "../components/loading/LineLoading";
import MostrarProdutos from "../components/MostraProdutos";
import Slide from "../components/Slide";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: null,
    };
  }

  componentDidMount() {
    ApiProdutos.getAllPublishedProducts().then((res) => {
      this.setState({
        produtos: res.data,
      });
    });
  }

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
        {this.state.produtos ? (
          <MostrarProdutos produtos={this.state.produtos} />
        ) : (
          <LineLoading />
        )}
      </div>
    );
  }
}

export default HomePage;
