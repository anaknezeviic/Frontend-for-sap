import axios from "axios";

// API function for POST request
export const createProduct = async ({ type, name, description }) => {
  const response = await axios.post(`http://localhost:8080/api/products`, {
    type,
    name,
    description
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
  console.log("Fetched Coverages:", response.data); // Debugging
  // Ensure data is consistent and always an array of objects
  return Array.isArray(response.data)
    ? response.data.filter((item) => typeof item === "object")
    : [];
};



export const deleteCoverage = async ({ coverageId }) => {
  const response = await axios.delete(`http://localhost:8080/api/coverage/${coverageId}`);
  return response.data;
};


export const getAllConditionalRules = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/coverage/rules/conditional/all");
    console.log("Fetched conditional rules:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching conditional rules:", error);
    throw error;
  }
};


export const addConditionalCoverageRule = async ({ requiredCoverageId, dependentCoverageId }) => {
  const response = await axios.post(`http://localhost:8080/api/coverage/rules/conditional`, {
    requiredCoverageId,
    dependentCoverageId,
  });
  return response.data;
};

export const getAllDiscountRules = async () => {
  const response = await axios.get("http://localhost:8080/api/coverage/rules/discount/all");
  return response.data;
};

export const postDiscountedCoverage = async (data) => {
  const response = await axios.post(`http://localhost:8080/api/coverage/rules/discount`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteCoverageDiscountRule = async ({ ruleId }) => {
  const response = await axios.delete(`http://localhost:8080/api/coverage/rules/discount/${ruleId}`);
  return response.data;
};