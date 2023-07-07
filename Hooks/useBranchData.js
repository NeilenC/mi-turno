import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBranches } from "../redux/branchesInfo";

export default function useBranchData() {
  const dispatch = useDispatch();

  const handlerBranches = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/branches");
      if (response.status === 200) {
        const branches = await response.json();
        dispatch(setBranches(branches));
      } else {
        throw new Error("Error al obtener los datos de las sucursales");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handlerBranches();
  }, []);
}
