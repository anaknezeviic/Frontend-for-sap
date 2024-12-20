import React, { useState, useEffect } from "react";
import {
  getAllConditionalRules,
  addConditionalCoverageRule,
  getAllCoverages,
} from "../api/api";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CreateCoverageConditionalRule = ({ onRuleAdded }) => {
  const [rules, setRules] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [formData, setFormData] = useState({
    requiredCoverageId: "",
    dependentCoverageId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRulesAndCoverages = async () => {
      try {
        setLoading(true);
        const [rulesData, coveragesData] = await Promise.all([
          getAllConditionalRules(),
          getAllCoverages(),
        ]);
        console.log("Raw Rules Data: ", rulesData);
        console.log("Raw Coverages Data: ", coveragesData);

        setRules(
          rulesData.map((rule) => ({
            ...rule,
            requiredCoverage: coveragesData.find((c) => c.id === rule.requiredCoverageId) || null,
            dependentCoverage: coveragesData.find((c) => c.id === rule.dependentCoverageId) || null,
          }))
        );
        setCoverages(coveragesData || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Error fetching rules or coverages");
        setLoading(false);
      }
    };
    fetchRulesAndCoverages();
  }, []); // Only run on component mount



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // API call to create new rule
      const newRule = await addConditionalCoverageRule(formData);
      console.log("New Rule Added:", newRule);

      // Find required and dependent coverages
      const requiredCoverage = coverages.find(
        (c) => c.id === parseInt(formData.requiredCoverageId, 10)
      );
      const dependentCoverage = coverages.find(
        (c) => c.id === parseInt(formData.dependentCoverageId, 10)
      );

      // Add new rule to state
      const updatedRule = {
        ...newRule,
        requiredCoverage,
        dependentCoverage,
      };

      setRules((prev) => [...prev, updatedRule]);

      // Pass new rule to parent for global update (if applicable)
      onRuleAdded?.(updatedRule);

      setFormData({ requiredCoverageId: "", dependentCoverageId: "" });
      setLoading(false);
    } catch (err) {
      console.error("Failed to add rule:", err);
      setError("Error adding rule");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Conditional Coverage Rules
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        {/* For Coverage Options */}
        <TextField
          fullWidth
          select
          label="Required Coverage"
          name="requiredCoverageId"
          value={formData.requiredCoverageId}
          onChange={handleChange}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value="">Select Required Coverage</option>
          {coverages.map((coverage) => (
            <option key={coverage.id} value={coverage.id}> {/* Add key */}
              {coverage.coverageName}
            </option>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Dependent Coverage"
          name="dependentCoverageId"
          value={formData.dependentCoverageId}
          onChange={handleChange}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value="">Select Dependent Coverage</option>
          {coverages.map((coverage) => (
            <option key={coverage.id} value={coverage.id}>
              {coverage.coverageName}
            </option>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Add Rule"}
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule ID</TableCell>
              <TableCell>Required Coverage</TableCell>
              <TableCell>Dependent Coverage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No conditional rules available.
                </TableCell>
              </TableRow>
            ) : (
              rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.id}</TableCell>
                  <TableCell>{rule.requiredCoverage?.coverageName || "N/A"}</TableCell>
                  <TableCell>{rule.dependentCoverage?.coverageName || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CreateCoverageConditionalRule;
