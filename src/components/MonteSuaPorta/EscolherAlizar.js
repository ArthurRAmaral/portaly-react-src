import React, { Component, Fragment } from "react";
import funcoesApiWooCommerce from "../../util/ApiWooCommerce";
import MostraProdutos from "../MostraProdutos";
import CircleLoading from "../loading/CircleLoading";

class EscolherAlizar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categoriaSlug: this.props.categoriaSlug,
         produtos: null,
      };
   }

   componentDidMount() {
      this.chamaApiParaRceberProdutos(this.state.categoriaSlug);
   }

   // componentWillReceiveProps(nextProps) {
   //    const id = nextProps.match.params.id;
   //    this.chamaApiParaRceberProdutos(id);
   // }

   // chamaApiParaRceberProdutos(id) {
   //    ApiWooCommerce.getCategoriaPublishProducts(id).then((res) => {
   //       this.setState({ produtos: res.data, paginaId: id });
   //    });
   // }

   componentWillReceiveProps(nextProps) {
      console.log(nextProps.categoriaSlug);
      const categoriaSlug = nextProps.categoriaSlug;
      this.chamaApiParaRceberProdutos(categoriaSlug);
   }

   async chamaApiParaRceberProdutos(categoriaSlug) {
      await funcoesApiWooCommerce
         .getCategoriaPublishProductsBySlug("marco-tauari")
         .then((res) => {
            this.setState({ produtos: res.data });
         });
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos &&
            this.state.paginaId === this.props.categoriaId ? (
               <MostraProdutos produtos={this.state.produtos} />
            ) : (
               <center>
                  <CircleLoading />
               </center>
            )}
         </Fragment>
      );
   }
}

export default EscolherAlizar;
