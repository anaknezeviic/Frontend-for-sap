import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCoverageDiscountRule, getAllCoverages } from "../api/api";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Alert,
    MenuItem,
} from "@mui/material";

const AddCoverageDiscountRule = ({ onRuleAdded }) => {
    const [formData, setFormData] = useState({
        triggerCoverageId: "",
        discountCoverageId: "",
        discountPercentage: "",
    });
    const [error, setError] = useState(null);

    const { data: coverages, isLoading } = useQuery({
        queryKey: ["coverages"],
        queryFn: getAllCoverages,
    });

    const mutation = useMutation({
        mutationFn: addCoverageDiscountRule,
        onSuccess: (data) => {
            onRuleAdded(data);
            setFormData({
                triggerCoverageId: "",
                discountCoverageId: "",
                discountPercentage: "",
            });
            setError(null);
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
        mutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <Box sx={{ textAlign: "center", p: 2 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    fullWidth
                    label="Trigger Coverage"
                    name="triggerCoverageId"
                    value={formData.triggerCoverageId}
                    onChange={handleChange}
                    margin="normal"
                >
                    {coverages.map((coverage) => (
                        <MenuItem key={coverage.id} value={coverage.id}>
                            {coverage.coverageName}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Discount Coverage"
                    name="discountCoverageId"
                    value={formData.discountCoverageId}
                    onChange={handleChange}
                    margin="normal"
                >
                    {(coverages || []).map((coverage) => (
                        <MenuItem key={coverage.id} value={coverage.id}>
                            {coverage.coverageName}
                        </MenuItem>
                    ))}

                </TextField>
                <TextField
                    fullWidth
                    label="Discount Percentage"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Adding..." : "Add Coverage Discount Rule"}
                </Button>
            </form>
        </Box>
    );
};

export default AddCoverageDiscountRule;
