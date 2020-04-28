import api from "../services/api";

const ApiWooCommerceProdutos = {
  getAllPublishedProducts: () =>
    api.get("products", { status: "publish", per_page: 50 }),

  getOnSale: () => api.get("products", { on_sale: true }),

  getProductSlug: (slug) => api.get("products", { slug, status: "publish" }),

  getProduto: (id) => api.get(`products/${id}`),

  createKit: async (dados) => {
    let ids = [];
    let prices = [];
    let total = 0;

    for (const key in dados) {
      if (dados.hasOwnProperty(key)) {
        ids.push(dados[key]);
        prices.push(
          (await ApiWooCommerceProdutos.getProduto(dados[key])).data.price
        );
      }
    }

    for (const price of prices) {
      total += parseFloat(price);
    }

    const data = {
      name: "Porta montada",
      type: "grouped",
      status: "private",
      catalog_visibility: "visible",
      description: "Porta montada pelo site",
      short_description: "Porta montada pelo site",
      images: [
        {
          id: 284,
        },
      ],
      price: total,
      grouped_products: ids,
    };

    return await api.post("products", data);
  },
};

export default ApiWooCommerceProdutos;
