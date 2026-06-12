import axios from "axios";
const API_URL = "https://inventory-order-management-system-9buf.onrender.com/api/orders";
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
