import api from "../services/api";

const funcoesApiWooCommerce = {
   getAllPublishedProducts: () => api.get("products", { status: "publish" }),

   getCategoriaPublishProductsById: (id) =>
      api.get("products", { category: id, status: "publish" }),

   getCategoriaPublishProductsBySlug: async (slug) => {
      console.log((await api.get("products/categories", { slug: slug })).data);
      return api.get("products", {
         category: await (await api.get("products/categories", { slug: slug }))
            .data,
         status: "publish",
      });
   },

   getOnSale: () => api.get("products", { on_sale: true }),

   getAllCategorias: () => api.get("products/categories"),

   getProductSlug: (slug) =>
      api.get("products", { slug: slug, status: "publish" }),

   getProduto: (id) => {
      return api.get(`products/${id}`);
   },

   getTheVariationsOf: (id) => api.get(`products/${id}/variations`),
};

export default funcoesApiWooCommerce;
