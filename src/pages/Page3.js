import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Box, Typography, Modal, CircularProgress } from "@mui/material";
import { getAllConditionalRules } from "../api/api";
import TableCoverageConditionalRule from "../common/TableCoverageConditionalRule";
import CreateConditionalCoverageRule from "../createCoverage/CreateCoverageConditionalRule";

const Page3 = () => {
  const [openModal, setOpenModal] = useState(false);
  const [conditionalRules, setConditionalRules] = useState([]);

  const { data: rules, isLoading } = useQuery({
    queryKey: ["conditionalRules"],
    queryFn: getAllConditionalRules,
    onSuccess: (data) => setConditionalRules(data),
  });

  const handleAddRule = (newRule) => {
    setConditionalRules((prev) => [...prev, newRule]);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Conditional Coverage Rules
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Conditional Coverage Rule
      </Button>
      {isLoading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <TableCoverageConditionalRule conditionalRules={conditionalRules} />
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <CreateConditionalCoverageRule onRuleAdded={handleAddRule} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Page3;
