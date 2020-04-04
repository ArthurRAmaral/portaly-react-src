import api from "../services/api";

const funcoesApiWooCommerce = {
   getAllPublishedProducts: () => api.get("products", { status: "publish" }),

   getAllProductsWithoutParams: () => api.get("products"),

   getCategoriaProductsWithoutStatus: id =>
      api.get("products", { category: id }),

   getCategoriaPublishProducts: id =>
      api.get("products", { category: id, status: "publish" }),

   getOnSale: () => api.get("products", { on_sale: true }),

   getAllCategorias: () => api.get("products/categories"),

   getProduct: async param => api.get("products", param),

   getTheVariationsOf: id => api.get(`products/${id}/variations`)
};

export default funcoesApiWooCommerce;
