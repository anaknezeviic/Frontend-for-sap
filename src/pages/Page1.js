import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CreateProduct from "../createProduct/CreateProduct";
import { useProductContext } from "../util/ProductContext";
import TableComponent from '../common/Table'

const Page1 = () => {
  const [openModal, setOpenModal] = useState(false);
  const { products } = useProductContext();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Insurance Products
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Product
        </Button>
        <CreateProduct open={openModal} onClose={handleClose} />
      </Box>
      <TableComponent />
    </div>
  );
};

export default Page1;
