import React, { Component } from "react";

import ApiProdutos from "../util/ApiProdutos";
import api from "../services/api";
const criarNovoKit = () => {
  api.get("products", { per_page: 50 }).then((res) => {
    console.log(res.data);
  });
};

class DefaultPage extends Component {
  render() {
    return (
      <div style={{ cursor: "pointer" }} onClick={criarNovoKit}>
        {"Criar Kit teste  "}
      </div>
    );
  }
}

export default DefaultPage;
