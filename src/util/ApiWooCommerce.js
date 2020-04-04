import api from "../services/api";

const funcoesApiWooCommerce = {
   getAllPublishedProducts: () => {
      return api.get("products", { status: "publish" });
   },
   getAllProductsWithoutParams: () => {
      return api.get("products");
   },
   getCategoriaProductsWithoutStatus: id => {
      return api.get("products", { category: id });
   },
   getCategoriaPublishProducts: id => {
      return api.get("products", { category: id, status: "publish" });
   },
   getOnSale: () => {
      return api.get("products", { on_sale: true });
   },
   getAllCategorias: () => {
      return api.get("products/categories");
   },
   getProduct: async param => {
      return api.get("products", param);
   }
};

export default funcoesApiWooCommerce;
