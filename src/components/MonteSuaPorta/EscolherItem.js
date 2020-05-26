//From depedencies
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//From components
import CircleLoading from "../loading/CircleLoading";

import TabMostraProduto from "./TabMostraProdutoPM/TabMostraProdutoPM";

import imgDefault from "../../assets/imgDefault.png";

class EscolherItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaSlug: this.props.categoriaSlug,
      produtos: this.props.produtos,
      disabledButton: this.props.disabled,
      produtosAtuais: null,
    };
  }

  componentDidMount() {
    const { produtos, categoriaSlug } = this.state;
    Object.values(produtos).map((prods) => {
      if (prods[0].categories[0].slug === categoriaSlug) {
        this.setState({ produtosAtuais: prods });
      }
    });
  }
  render() {
    const { produtosAtuais, disabledButton, categoriaSlug } = this.state;

    return (
      <Fragment>
        {produtosAtuais ? (
          <TabMostraProduto
            produtosAtuais={produtosAtuais}
            disabledButton={disabledButton}
            categoriaSlug={categoriaSlug}
          />
        ) : (
          <CircleLoading />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ produtos: state.produtos });

export default connect(mapStateToProps, null)(EscolherItems);
