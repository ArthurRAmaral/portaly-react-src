//From depedencies
import React, { Component } from "react";

//From componensts
import Setepper from "../components/MonteSuaPorta/Stepper/Stepper.js";

//From util
import Montador from "../util/MontadorPorta";

//Stylesheet
import "../css/MonteSuaPorta.css";

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
      <section className="montagem-porta-container">
        <Setepper />
      </section>
    );
  }
}

export default MonteSuaPorta;
