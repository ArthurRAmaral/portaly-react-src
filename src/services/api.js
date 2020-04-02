const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const Api = new WooCommerceRestApi({
   url: "https://portaly.demo.skeavee.com/",
   consumerKey: "ck_c6c63cd21931eb8a0bdfe7cca53cdffdc9a92e66",
   consumerSecret: "cs_1af6f80c255cbe002dd3b2acbee69c87edc85934",
   version: "wc/v3"
});

export default Api;
