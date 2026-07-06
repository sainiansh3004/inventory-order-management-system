import axios from "axios";

const API_URL =
  "https://inventory-order-management-system-0t68.onrender.com/api/dashboard/stats";

export const getDashboardStats = async () => {
  const response = await axios.get(API_URL);

  return response.data.data;
};