import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/api";
import { useProductContext } from "../util/ProductContext";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const CreateProduct = ({ open, onClose }) => {
  const { addProduct } = useProductContext();
  const [formData, setFormData] = useState({ type: "", name: "", description: "" });
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      addProduct(data); // Add new product to context
      onClose(); // Close modal after successful creation
      setFormData({ type: "", name: "", description: "" }); // Clear form
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.name || !formData.description) {
      setError("All fields are required!");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create Product
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <CircularProgress size={24} /> : "Create Product"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProduct;
