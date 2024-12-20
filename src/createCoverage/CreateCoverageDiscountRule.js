import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getAllCoverages, postDiscountedCoverage } from "../api/api";

const CreateCoverageDiscountRule = ({ open, onClose, onAddRule }) => {
  const [coverages, setCoverages] = useState([]);
  const [formData, setFormData] = useState({
    triggerCoverageId: "",
    discountCoverageId: "",
    discountPercentage: "",
  });
  const [error, setError] = useState(null);

  // Fetch coverages on component mount
  useEffect(() => {
    const fetchCoverages = async () => {
      try {
        const coveragesData = await getAllCoverages();
        setCoverages(coveragesData || []);
      } catch (err) {
        console.error("Failed to fetch coverages:", err);
        setError("Error fetching coverages");
      }
    };

    fetchCoverages();
  }, []);

  const mutation = useMutation({
    mutationFn: postDiscountedCoverage,
    onSuccess: (newRule) => {
      console.log("New Discount Rule Added:", newRule);

      // Notify parent to add the new rule
      onAddRule(newRule);

      // Reset form data and close modal
      setFormData({
        triggerCoverageId: "",
        discountCoverageId: "",
        discountPercentage: "",
      });
      onClose();
    },
    onError: (err) => {
      console.error("Failed to add discount rule:", err);
      setError("Error adding discount rule");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload:", {
      triggerCoverageId: formData.triggerCoverageId,
      discountCoverageId: formData.discountCoverageId,
      discountPercentage: formData.discountPercentage,
    });

    mutation.mutate({
      triggerCoverageId: parseInt(formData.triggerCoverageId, 10),
      discountCoverageId: parseInt(formData.discountCoverageId, 10),
      discountPercentage: parseFloat(formData.discountPercentage),
    });
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
        }}
      >
        <Typography variant="h6" component="h2">
          Create Discount Rule
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="trigger-coverage-label">Trigger Coverage</InputLabel>
            <Select
              labelId="trigger-coverage-label"
              name="triggerCoverageId"
              value={formData.triggerCoverageId}
              onChange={handleChange}
            >
              <MenuItem value="">Select Trigger Coverage</MenuItem>
              {coverages.map((coverage) => (
                <MenuItem key={coverage.id} value={coverage.id}>
                  {coverage.coverageName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="discount-coverage-label">Discount Coverage</InputLabel>
            <Select
              labelId="discount-coverage-label"
              name="discountCoverageId"
              value={formData.discountCoverageId}
              onChange={handleChange}
            >
              <MenuItem value="">Select Discount Coverage</MenuItem>
              {coverages.map((coverage) => (
                <MenuItem key={coverage.id} value={coverage.id}>
                  {coverage.coverageName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Discount Percentage"
            name="discountPercentage"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isLoading}
            sx={{ mt: 2 }}
          >
            {mutation.isLoading ? <CircularProgress size={24} /> : "Add Rule"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCoverageDiscountRule;
