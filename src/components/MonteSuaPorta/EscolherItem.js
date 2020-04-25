import React, { Component, Fragment } from "react";
import ApiCategorias from "../../util/ApiCategorias";
import MostraProdutos from "./MostraProdutosMontagem";
import CircleLoading from "../loading/CircleLoading";

class EscolherItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categoriaID: "",
         produtos: null,
      };
   }

   componentDidMount() {
      const categoriaSlug = this.props.categoriaSlug;
      ApiCategorias.getAllCategorias().then((res) => {
         res.data.forEach((cat) => {
            if (cat.slug === categoriaSlug) {
               this.chamaApiParaRceberProdutos(cat.id);
               return;
            }
         });
      });
   }

   componentWillReceiveProps(nextProps) {
      const categoriaSlug = nextProps.categoriaSlug;
      ApiCategorias.getAllCategorias().then((res) => {
         res.data.forEach((cat) => {
            if (cat.slug === categoriaSlug) {
               this.chamaApiParaRceberProdutos(cat.id);
               return;
            }
         });
      });
   }

   chamaApiParaRceberProdutos(categoriaID) {
      ApiCategorias
         .getCategoriaPublishProductsById(categoriaID)
         .then((res) => {
            this.setState({ produtos: res.data, categoriaID: categoriaID });
            this.forceUpdate();
         });
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos &&
            this.state.paginaId === this.props.categoriaID ? (
               <MostraProdutos
                  key={this.state.categoriaID}
                  produtos={this.state.produtos}
               />
            ) : (
               <CircleLoading />
            )}
         </Fragment>
      );
   }
}

export default EscolherItems;
