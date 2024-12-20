import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { getAllCoverages, deleteCoverage } from "../api/api";

const TableCoverage = () => {
  const [coverages, setCoverages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCoverages = async () => {
      try {
        // Fetch coverages directly from the endpoint
        const data = await getAllCoverages();
        console.log("Fetched Coverages:", data); // Debugging
        setCoverages(data || []); // Set coverages or fallback to empty array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching coverages:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCoverages();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await deleteCoverage({ coverageId: id });
      setCoverages((prev) => prev.filter((coverage) => coverage.id !== id));
    } catch (error) {
      console.error("Error deleting coverage:", error);
      alert("Failed to delete coverage. Check console for details.");
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
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
        Error fetching coverages.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Coverage Name</TableCell>
            <TableCell>Benefit Amount</TableCell>
            <TableCell>Premium Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {coverages.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No coverages available.
      </TableCell>
    </TableRow>
  ) : (
    coverages.map((coverage) => (
      <TableRow key={coverage.id}> {/* Add key here */}
        <TableCell>{coverage.id}</TableCell>
        <TableCell>{coverage.coverageName}</TableCell>
        <TableCell>{coverage.benefitAmount}</TableCell>
        <TableCell>{coverage.premiumAmount}</TableCell>
        <TableCell>{coverage.description}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(coverage.id)}
          >
            Delete
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

export default TableCoverage;
