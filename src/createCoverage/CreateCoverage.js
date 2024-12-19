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
  
    // Ensure numeric fields only allow positive numbers
    if (name === "benefitAmount" || name === "premiumAmount") {
      if (isNaN(value) || value < 0) {
        return; // Ignore invalid input
      }
    }
  
    setFormData({
      ...formData,
      [name]: typeof value === "string" ? value.trim() : value, // Safely handle different types
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.coverageName || !formData.insuranceProductId) {
      setError("Coverage Name and Insurance Product are required.");
      return;
    }

    mutation.mutate({
      ...formData,
      benefitAmount: parseFloat(formData.benefitAmount),
      premiumAmount: parseFloat(formData.premiumAmount),
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
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Enforces numeric input
        />
        <TextField
          fullWidth
          label="Premium Amount"
          name="premiumAmount"
          value={formData.premiumAmount}
          onChange={handleChange}
          margin="normal"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Enforces numeric input
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
        >
          {insuranceProducts.map((product) => (
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
