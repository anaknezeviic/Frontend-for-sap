import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/api";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const UpdateProduct = ({ open, onClose, product, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (updatedData) => updateProduct({ productId: product.id, changes: updatedData }),
    onSuccess: (data) => {
      onUpdateSuccess(data); // Update the table data
      onClose(); // Close the modal
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Include only fields with nonempty values in formData
    setFormData((prev) => ({
    //   ...prev,
      ...(value.trim() ? { [name]: value.trim() } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setError("No changes made. Please update at least one field.");
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
          Update Product
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            defaultValue={product?.type || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            defaultValue={product?.name || ""}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            defaultValue={product?.description || ""}
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
              {mutation.isLoading ? <CircularProgress size={24} /> : "Update Product"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProduct;
