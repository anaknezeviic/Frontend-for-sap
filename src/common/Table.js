import React, { useEffect, useState } from "react";
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
import { getAllProducts } from "../api/api";
import { useProductContext } from "../util/ProductContext";

const TableComponent = () => {
  const { products } = useProductContext(); // Get dynamically added products
  const [fetchedProducts, setFetchedProducts] = useState([]); // Fetch existing data
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch existing products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setFetchedProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    alert(`Update row with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete row with ID: ${id}`);
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
      <Typography variant="h6" color="error" align="center" style={{ marginTop: "20px" }}>
        Error fetching products.
      </Typography>
    );
  }

  // Combine fetched products with dynamically added products
  const allProducts = [...fetchedProducts, ...products];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No products available.
              </TableCell>
            </TableRow>
          ) : (
            allProducts.map((row, index) => (
              <TableRow key={row.id || index}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(row.id)}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
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

export default TableComponent;
