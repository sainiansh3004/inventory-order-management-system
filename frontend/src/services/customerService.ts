import axios from "axios";

const API_URL = "http://localhost:5001/api/customers";
// If you're using your deployed backend, replace the URL above with your Render URL.

export const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCustomer = async (customer: any) => {
  const response = await axios.post(API_URL, customer);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};