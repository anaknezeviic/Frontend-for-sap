import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TableCoverageDiscountRule = ({ discountRules }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Trigger Coverage</TableCell>
            <TableCell>Discount Coverage</TableCell>
            <TableCell>Discount Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discountRules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Coverage Discount Rules Added
              </TableCell>
            </TableRow>
          ) : (
            discountRules.map((rule, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{rule.triggerCoverageName}</TableCell>
                <TableCell>{rule.discountCoverageName}</TableCell>
                <TableCell>{rule.discountPercentage}%</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCoverageDiscountRule;
