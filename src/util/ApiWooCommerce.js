import api from "../services/api";

const funcoesApiWooCommerce = {

   getAll: () => {
      return (api.get("products", { per_page: 20 }))
   },
   getAllCategorias: () =>{
      return (api.get("products/categories"))
   }

}

export default funcoesApiWooCommerce;