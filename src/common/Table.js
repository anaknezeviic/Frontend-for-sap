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
import { getAllProducts, deleteProduct } from "../api/api";
import { useProductContext } from "../util/ProductContext";
import UpdateProduct from "../updateProduct/UpdateProduct";

const TableComponent = ({ searchQuery }) => {
    const { products } = useProductContext();
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProducts(searchQuery); // Pass searchQuery
                setFetchedProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleUpdateSuccess = (updatedProduct) => {
        setFetchedProducts((prev) =>
            prev.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item
            )
        );
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct({ productId: id });
            setFetchedProducts((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Check console for details.");
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
                Error fetching products.
            </Typography>
        );
    }

    const allProducts = [...fetchedProducts, ...products];

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
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
                                <TableCell colSpan={6} align="center">
                                    No products available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allProducts.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdate(row)}
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
            {selectedProduct && (
                <UpdateProduct
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    product={selectedProduct}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </>
    );
};

export default TableComponent;
