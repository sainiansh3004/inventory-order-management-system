export const getProducts = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products: any[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};