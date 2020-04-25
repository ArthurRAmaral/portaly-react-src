import api from '../services/api';

const ApiWooCommerceProdutos = {
 getAllPublishedProducts: () => api.get('products', { status: 'publish', per_page: 50 }),

  getOnSale: () => api.get('products', { on_sale: true }),

  getProductSlug: (slug) => api.get('products', { slug, status: 'publish' }),

  getProduto: (id) => api.get(`products/${id}`),

};

export default ApiWooCommerceProdutos;
