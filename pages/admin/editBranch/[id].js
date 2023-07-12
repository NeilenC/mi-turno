import { Box } from "@mui/material";
import React from "react";
import useBranchData from "../../../Hooks/useBranchData";
import { useRouter } from "next/router";

const EditBranch = () => {
  useBranchData();
  const router = useRouter();
  const { id } = router.query;

  const handleChangeBranch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/updateBranch/${id}`
      );
    } catch (e) {}
  };

  return <Box></Box>;
};

export default EditBranch;
