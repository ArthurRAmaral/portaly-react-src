const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const Api = new WooCommerceRestApi({
  url: process.env.REACT_APP_WOOCOMMERCE_API_URL,
  consumerKey: process.env.REACT_APP_WOOCOMMERCE_API_CONSUMER_KEY,
  consumerSecret: process.env.REACT_APP_WOOCOMMERCE_API_CONSUMER_SECRET,
  version: "wc/v3",
});

export default Api;
