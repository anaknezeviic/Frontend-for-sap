import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import CreateProduct from "../createProduct/CreateProduct";
import { useProductContext } from "../util/ProductContext";
import TableComponent from "../common/Table";

const Page1 = () => {
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { products } = useProductContext();

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <div>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Insurance Products
                </Typography>
                <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                    <TextField
                        label="Search by Name"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                    >
                        Add Product
                    </Button>
                </Box>
                <CreateProduct open={openModal} onClose={handleClose} />
            </Box>
            <TableComponent searchQuery={searchQuery} />
        </div>
    );
};

export default Page1;
