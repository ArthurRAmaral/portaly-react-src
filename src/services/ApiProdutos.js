import api from "./api";

const ApiWooCommerceProdutos = {
  getAllPublishedProducts: () =>
    api.get("products", { status: "publish", per_page: 40 }),

  getAllPublishPoductsByCategoriesSlug: (id) =>
    api.get("products", { category: id, status: "publish", per_page: 50 }),

  // getAllPublishPoductsByCategoriesSlug: async (slug) => {
  //   console.log((await api.get("products/categories", { slug })).data);
  //   return api.get("products", {
  //     category: await (await api.get("products/categories", { slug })).data,
  //     status: "publish",
  //   });
  // },

  getOnSale: () => api.get("products", { on_sale: true }),

  getProductBySlug: (slug) => api.get("products", { slug, status: "publish" }),

  getProductByid: (id) => api.get(`products/${id}`),

  createKit: async (dados) => {
    let ids = [];
    let prices = [];
    let total = 0;

    for (const key in dados) {
      if (dados.hasOwnProperty(key)) {
        ids.push(dados[key]);
        prices.push(
          (await ApiWooCommerceProdutos.getProductByid(dados[key])).data.price
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
