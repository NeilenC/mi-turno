import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useUserData from "../Hooks/useUserData";
import { useSelector } from "react-redux";
import { InputLabel, styled } from "@mui/material";
import { useRouter } from "next/router";

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: "black",
}));

const LayOut = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const isLoginPage = router.pathname === "/";

  return <> {user?.id != "" && !isLoginPage ? <Navbar /> : null} </>;
};

export default LayOut;
