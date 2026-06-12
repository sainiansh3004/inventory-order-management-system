import axios from "axios";

const API =
  "https://inventory-order-management-system-9buf.onrender.com/api/customers";

export const getCustomers = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createCustomer = async (
  customer: any
) => {
  const res = await axios.post(
    API,
    customer
  );

  return res.data;
};

export const deleteCustomer = async (
  id: string
) => {
  const res = await axios.delete(
    `${API}/${id}`
  );

  return res.data;
};