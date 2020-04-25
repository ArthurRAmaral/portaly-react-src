import React, { Component, Fragment } from 'react';
import Stepper from '../components/Checkout/StepperCheckout';

class PaginaCarrinho extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
    };
  }

  render() {
    return (
      <Stepper />
    );
  }
}

export default PaginaCarrinho;
