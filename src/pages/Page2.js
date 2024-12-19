import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import CreateCoverage from "../createCoverage/CreateCoverage";
import TableCoverage from "../common/TableCoverage";
import { getAllProducts } from "../api/api";

const Page2 = () => {
  const [openModal, setOpenModal] = useState(false);
  const [insuranceProducts, setInsuranceProducts] = useState([]);

  useEffect(() => {
    const fetchInsuranceProducts = async () => {
      try {
        const products = await getAllProducts();
        setInsuranceProducts(products);
      } catch (error) {
        console.error("Failed to fetch insurance products", error);
      }
    };

    fetchInsuranceProducts();
  }, []);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Coverages
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Coverage
          </Button>
        </Box>
        <CreateCoverage
          open={openModal}
          onClose={handleClose}
          insuranceProducts={insuranceProducts}
        />
      </Box>
      <TableCoverage insuranceProducts={insuranceProducts} />
    </div>
  );
};

export default Page2;
