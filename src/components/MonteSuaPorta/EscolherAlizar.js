import React, { Component, Fragment } from "react";
import funcoesApiWooCommerce from "../../util/ApiWooCommerce";
import MostraProdutos from "../MostraProdutos";
import CircleLoading from "../loading/CircleLoading";

class EscolherAlizar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categoriaID: "",
         produtos: null,
      };
   }

   componentDidMount() {
      const categoriaSlug = this.props.categoriaSlug;
      funcoesApiWooCommerce.getAllCategorias().then((res) => {
         res.data.forEach((cat) => {
            if (cat.slug === categoriaSlug) {
               this.chamaApiParaRceberProdutos(cat.id);
               console.log("{" + cat.id + " === " + categoriaSlug + "}");
               return;
            }
         });
      });
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
      const categoriaSlug = nextProps.categoriaSlug;
      funcoesApiWooCommerce.getAllCategorias().then((res) => {
         res.data.forEach((cat) => {
            if (cat.slug === categoriaSlug) {
               this.chamaApiParaRceberProdutos(cat.id);
               console.log("{" + cat + " === " + categoriaSlug + "}");
               return;
            }
         });
      });
   }

   chamaApiParaRceberProdutos(categoriaID) {
      funcoesApiWooCommerce
         .getCategoriaPublishProductsById(categoriaID)
         .then((res) => {
            console.log(res.data);
            this.setState({ produtos: res.data, categoriaID: categoriaID });
            this.forceUpdate();
         });
   }

   render() {
      return (
         <Fragment>
            {this.state.produtos &&
            this.state.paginaId === this.props.categoriaID ? (
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
