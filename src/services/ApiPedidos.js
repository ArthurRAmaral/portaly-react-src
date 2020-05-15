import api from "./api";

const ApiWooCommercePedidos = {
  createOrder: (data) => api.post("orders", data),

  getAllOrders: () => api.get("orders"),
};

export default ApiWooCommercePedidos;
