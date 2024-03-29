import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/userInfo";

const Logout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setToken(localStorage.getItem("token"));
  }, [id, token]);

  const handleLogOut = async () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(setUserInfo(null));
    router.push("/");
  };

  return (
    <Box>
      <Button
        sx={{
          p: 2,
          color: "green",
          color: "#A442F1",
          bgcolor: "rgba(164, 66, 241, 0.1)",
          fontWeight: "bold",
          p: 1.5,
        }}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
