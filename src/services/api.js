const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://demo.skeavee.com/portaly/",
  consumerKey: "ck_7b8470ceaba1db71afb0c3a77f7f1ea3f98b9ce0",
  consumerSecret: "cs_de262070deb1bcf2a2911dfb08af5fa991407f5e",
  version: "wc/v3"
});

export default api;
