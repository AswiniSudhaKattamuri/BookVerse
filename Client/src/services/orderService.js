import api from "./api";

export const placeOrder = async (paymentMethod) => {
  const response = await api.post("/orders", {
    paymentMethod,
  });

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};