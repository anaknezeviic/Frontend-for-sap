import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCoverage } from "../api/api";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

const CreateCoverage = ({ open, onClose, insuranceProducts }) => {
  const [formData, setFormData] = useState({
    coverageName: "",
    benefitAmount: "",
    premiumAmount: "",
    description: "",
    insuranceProductId: "",
  });
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: createCoverage,
    onSuccess: () => {
      alert("Coverage created successfully!");
      onClose();
      setFormData({
        coverageName: "",
        benefitAmount: "",
        premiumAmount: "",
        description: "",
        insuranceProductId: "",
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "benefitAmount" || name === "premiumAmount") {
      const numericValue = value.replace(/,/g, "");
      if (isNaN(numericValue) || numericValue < 0) return;
      const formattedValue = Number(numericValue).toLocaleString("en-US");
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.coverageName ||
      !formData.insuranceProductId ||
      !formData.benefitAmount ||
      !formData.premiumAmount ||
      !formData.description
    ) {
      setError("All fields are required!");
      return;
    }

    mutation.mutate({
      ...formData,
      benefitAmount: formData.benefitAmount.replace(/,/g, "").trim(),
      premiumAmount: formData.premiumAmount.replace(/,/g, "").trim(),
    });
  };

  return (
    <Box sx={{ display: open ? "block" : "none", p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Create Coverage
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Coverage Name"
          name="coverageName"
          value={formData.coverageName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Benefit Amount"
          name="benefitAmount"
          value={formData.benefitAmount}
          onChange={handleChange}
          margin="normal"
          type="text"
        />
        <TextField
          fullWidth
          label="Premium Amount"
          name="premiumAmount"
          value={formData.premiumAmount}
          onChange={handleChange}
          margin="normal"
          type="text"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <Select
          fullWidth
          name="insuranceProductId"
          value={formData.insuranceProductId}
          onChange={handleChange}
          margin="normal"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select an Insurance Product
          </MenuItem>
          {Array.isArray(insuranceProducts) &&
            insuranceProducts.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
        </Select>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? <CircularProgress size={24} /> : "Create Coverage"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCoverage;
