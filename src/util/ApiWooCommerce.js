import api from '../services/api';

const funcoesApiWooCommerce = {
  getAllPublishedProducts: () => api.get('products', { status: 'publish', per_page: 50 }),

  getCategoriaPublishProductsById: (id) => api.get('products', { category: id, status: 'publish', per_page: 50 }),

  getCategoriaPublishProductsBySlug: async (slug) => {
    console.log((await api.get('products/categories', { slug })).data);
    return api.get('products', {
      category: await (await api.get('products/categories', { slug }))
        .data,
      status: 'publish',
    });
  },

  getOnSale: () => api.get('products', { on_sale: true }),

  getAllCategorias: () => api.get('products/categories'),

  getProductSlug: (slug) => api.get('products', { slug, status: 'publish' }),

  getProduto: (id) => api.get(`products/${id}`),
  getCategoria: (id) => api.get('products', { category: id }),
};

export default funcoesApiWooCommerce;
