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
} from "@mui/material";
import { getAllConditionalRules } from "../api/api";

const TableCoverageConditional = () => {
  const [rules, setRules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const data = await getAllConditionalRules();
        setRules(data || []); // Default to an empty array if data is null
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching conditional rules:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

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
        Error fetching conditional rules.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rule ID</TableCell>
            <TableCell>Required Coverage ID</TableCell>
            <TableCell>Dependent Coverage ID</TableCell>
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
      <TableRow key={rule.id}> {/* Add key here */}
        <TableCell>{rule.id}</TableCell>
        <TableCell>{rule.requiredCoverageId || "N/A"}</TableCell>
        <TableCell>{rule.dependentCoverageId || "N/A"}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default TableCoverageConditional;
