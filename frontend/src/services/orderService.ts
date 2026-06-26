import axios from "axios";

const API_URL =
  "https://inventory-order-management-system-9buf.onrender.com/api/orders";

export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createOrder = async (order: any) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};