import api from "./api";

const ApiWooCommerceCupom = {
  getCoupon: (code) => api.get("coupons", { code: code }),
};

export default ApiWooCommerceCupom;
