import axios from "axios";

// API function for POST request
export const createProduct = async ({ type, name, description }) => {
  const response = await axios.post(`http://localhost:8080/api/products`, {
    type,
    name,
    description,
  });
  return response.data;
};

export const getAllProducts = async () => {
    const response = await axios.get(`http://localhost:8080/api/products/all`);
    return response.data;
};
