//From depedencies
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//From components
import LineLoading from "../components/loading/LineLoading";
import VerticalTab from "../components/ImagensTab/VerticalTab";

//From assets
import imgDefault from "../assets/imgDefault.png";

//From services
import ApiProdutos from "../services/ApiProdutos";

//From util
import Carrinho from "../util/Carrinho";

//From Material-ui
import Grid from "@material-ui/core/Grid";

export default class PaginaProduto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produto: null,
    };
  }

  async componentDidMount() {
    const { slug } = this.props.match.params;

    await ApiProdutos.getProductBySlug(slug).then((res) =>
      this.setState({ produto: res.data[0] })
    );
  }

  handleSubmit = (e) => {
    const { produto } = this.state;

    Carrinho.addItem(produto.id);

    // this.props.history.push("/");
    window.location.reload();
  };

  renderProduto = () => {
    const { produto } = this.state;
    return (
      <Fragment>
        <Grid container direction="row">
          <Grid item xs={8}>
            <VerticalTab produto={produto} />
          </Grid>
          <Grid item xs={4}>
            balasdlasd
          </Grid>
        </Grid>
        <Grid container> </Grid>
      </Fragment>
    );
  };

  render() {
    return (
      <Grid container justify="center" style={{ padding: 20 }}>
        {this.state.produto ? this.renderProduto() : <LineLoading />}
      </Grid>
    );
  }
}

// <div className="produtomostrado s12 m6 card-large">
// <div className="card">
//   <div className="card-image">
//     <img
//       className="principal"
//       src={
//         produto.images.length > 0 ? produto.images[0].src : imgDefault
//       }
//       alt=""
//     />
//     <Link
//       to="#"
//       className="btn-floating halfway-fab waves-effect waves-light red"
//     >
//       <i onClick={this.handleSubmit} className="material-icons">
//         add
//       </i>
//     </Link>
//   </div>
//   <div className="card-content">
//     <p className="nome grey-text text-darken-4">{produto.name}</p>
//     <p className="preco">R$: {produto.price}</p>
//     {produto.short_description !== ""
//       ? produto.short_description.substring(
//           3,
//           produto.short_description.length - 5
//         )
//       : ""}
//   </div>
// </div>
// </div>
