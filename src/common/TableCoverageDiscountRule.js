import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { getAllDiscountRules, deleteCoverageDiscountRule } from "../api/api";

const TableCoverageDiscountRule = () => {
  const [rules, setRules] = useState([]); // State for discount rules
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state
  const [deletingRuleId, setDeletingRuleId] = useState(null); // Track deletion

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const data = await getAllDiscountRules();
        setRules(data || []); // Default to an empty array if data is null
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching discount rules:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

  const handleDelete = async (ruleId) => {
    try {
      setDeletingRuleId(ruleId); // Set loading state for the specific rule
      await deleteCoverageDiscountRule({ ruleId });
      setRules((prevRules) => prevRules.filter((rule) => rule.id !== ruleId));
    } catch (error) {
      console.error("Error deleting discount rule:", error);
    } finally {
      setDeletingRuleId(null); // Reset loading state
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography
        variant="h6"
        color="error"
        align="center"
        style={{ marginTop: "20px" }}
      >
        Error fetching discount rules.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rule ID</TableCell>
            <TableCell>Trigger Coverage</TableCell>
            <TableCell>Discounted Coverage</TableCell>
            <TableCell>Discount Percentage</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No discount rules available.
              </TableCell>
            </TableRow>
          ) : (
            rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.id}</TableCell>
                <TableCell>{rule.triggerCoverage?.coverageName || "N/A"}</TableCell>
                <TableCell>{rule.discountedCoverage?.coverageName || "N/A"}</TableCell>
                <TableCell>{rule.discountPercentage || "N/A"}%</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    disabled={deletingRuleId === rule.id}
                    onClick={() => handleDelete(rule.id)}
                  >
                    {deletingRuleId === rule.id ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCoverageDiscountRule;
