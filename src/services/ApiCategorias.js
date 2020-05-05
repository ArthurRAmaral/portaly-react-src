import api from "./api";

const ApiWooCommerceCategorias = {
  getCategoriaPublishProductsById: (id) =>
    api.get("products", { category: id, status: "publish", per_page: 50 }),

  getCategoriaPublishProductsBySlug: async (slug) => {
    console.log((await api.get("products/categories", { slug })).data);
    return api.get("products", {
      category: await (await api.get("products/categories", { slug })).data,
      status: "publish",
    });
  },

  getAllCategorias: () => api.get("products/categories"),

  getCategoria: (id) => api.get("products", { category: id }),
};

export default ApiWooCommerceCategorias;
