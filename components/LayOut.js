import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useUserData from "../Hooks/useUserData";
import { useSelector } from "react-redux";
import { InputLabel, styled } from "@mui/material";

export const StyledInputLabel = styled(InputLabel)(()=>({
  color:"black"
}))

const LayOut = () => {
  useUserData();
  const user = useSelector((state) => state.user);

  return <> {user.id != "" ? <Navbar /> : null} </>;
};

export default LayOut;
