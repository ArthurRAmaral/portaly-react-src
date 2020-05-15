import api from "./api";

const ApiWooCommerceCategorias = {
  getAllCategorias: () => api.get("products/categories"),

  getCategoria: (id) => api.get("products", { category: id }),
};

export default ApiWooCommerceCategorias;
