const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "http://localhost/portalydev",
  consumerKey: "ck_1ba42fcb1de9a3a63925f27ee7b669de17d6c66d",
  consumerSecret: "cs_1dcb7bd9eb49edcae04fd992c894b021a42ae23c",
  version: "wc/v3"
});

export default api;
