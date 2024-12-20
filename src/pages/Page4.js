import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import CreateCoverageDiscountRule from "../createCoverage/CreateCoverageDiscountRule";
import TableCoverageDiscountRule from "../common/TableCoverageDiscountRule";
import { useDiscountRuleContext } from "../util/DiscountRuleContex";
import { useQuery } from "@tanstack/react-query";
import { getAllDiscountRules } from "../api/api";

const Page4 = () => {
  const { discountRules, setDiscountRules } = useDiscountRuleContext();
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch all discount rules when the page loads
  useQuery({
    queryKey: ["discountRules"],
    queryFn: getAllDiscountRules,
    onSuccess: (data) => {
      setDiscountRules(data);
    },
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box>
      <h1>Page 4</h1>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Create Discount Rule
      </Button>
      <TableCoverageDiscountRule discountRules={discountRules} />
      <CreateCoverageDiscountRule open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default Page4;
