import api from "../services/api";

const funcoesApiWooCommerce = {
   getAll: () => {
      return api.get("products", { per_page: 20 });
   },
   getAllCategorias: () => {
      return api.get("products/categories");
   },
   getCategoria: (id) => {
      return api.get("products", { category: id });
   },
   getOnSale: () => {
      return api.get("products", { on_sale: true });
   },
   getProduto: (id) => {
      return api.get(`products/${id}`);
   },
};

export default funcoesApiWooCommerce;
