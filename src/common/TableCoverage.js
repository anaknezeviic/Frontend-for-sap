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
import { getAllProducts, deleteCoverage } from "../api/api";

const TableCoverage = () => {
  const [coverages, setCoverages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCoveragesFromProducts = async () => {
      try {
        // Fetch products including their coverages
        const products = await getAllProducts();

        // Flatten the coverages and attach product names
        const allCoverages = products.flatMap((product) =>
          product.coverages.map((coverage) => ({
            ...coverage,
            insuranceProductName: product.name, // Attach product name to each coverage
          }))
        );

        allCoverages.sort((a, b) => a.coverageName.localeCompare(b.coverageName));
        console.log("Mapped Coverages with Product Names:", allCoverages); // Debugging
        setCoverages(allCoverages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products or coverages:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCoveragesFromProducts();
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
            <TableCell>Product Name</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coverages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No coverages available.
              </TableCell>
            </TableRow>
          ) : (
            coverages.map((coverage) => (
              <TableRow key={coverage.id}>
                <TableCell>{coverage.id}</TableCell>
                <TableCell>{coverage.coverageName}</TableCell>
                <TableCell>{coverage.benefitAmount}</TableCell>
                <TableCell>{coverage.premiumAmount}</TableCell>
                <TableCell>{coverage.description}</TableCell>
                <TableCell>{coverage.insuranceProductName}</TableCell>
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
