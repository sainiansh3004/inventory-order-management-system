import axios from "axios";

const API_URL =
  "https://inventory-order-management-system-9buf.onrender.com/api/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(
    API_URL,
    product
  );

  return response.data;
};

export const deleteProduct = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};