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

export const getAllProducts = async (name = "") => {
  const response = await axios.get("http://localhost:8080/api/products/all", {
    params: { name },
  });
  return response.data;
};

export const updateProduct = async ({ productId, changes }) => {
  const response = await axios.patch(`http://localhost:8080/api/products/${productId}`,
    changes
  );
  return response.data;
};

export const deleteProduct = async ({ productId }) => {
  const response = await axios.delete(`http://localhost:8080/api/products/${productId}`);
  return response.data;
};


export const createCoverage = async ({
  coverageName,
  benefitAmount,
  premiumAmount,
  description,
  insuranceProductId,
}) => {
  const response = await axios.post(`http://localhost:8080/api/coverage`, {
    coverageName,
    benefitAmount,
    premiumAmount,
    description,
    insuranceProductId,
  });
  return response.data;
};

export const getAllCoverages = async () => {
  const response = await axios.get("http://localhost:8080/api/coverage/all");
  return response.data;
};


export const deleteCoverage = async ({ coverageId }) => {
  const response = await axios.delete(`http://localhost:8080/api/coverage/${coverageId}`);
  return response.data;
};

