import { Box, Button, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUserData from "../Hooks/useUserData";
import Logout from "./Logout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"; // persona
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"; // operadores
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; // calendario
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined"; // sucursal
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined"; // tool
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"; // cancel

const Navbar = () => {
  useUserData();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  console.log("USER", user);

  const handleBooking = () => {
    router.push(`/users/reserva/${user.id}`);
  };
//   const handleNewBranch = () => {
//     router.push(`/admin/createBranch`);
//   };
//   const handleNewOp = () => {
//     router.push(`/admin/createOperator`);
//   };
//   const getBookings = () => {
//     router.push(`/operator/verReservas/${user.branchId}`);
//   };
  return (
    <>
      {user.isOp == false && user.isAdmin == false ? (
        <Box
          sx={{
            height: "90px",
            width: "100%",
            display: "flex",
            direction: "row",
            bgcolor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "space-between",
            // boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.3);"
            boxShadow: "0px 10px 24px 6px rgba(0, 0, 0, 0.12);",
            mt: 3,
          }}
        >
          <Button
            onClick={handleBooking}
            sx={{
              marginLeft: "10%",
              color: "#A442F1",
              bgcolor: "rgba(164, 66, 241, 0.1)",
              fontWeight: "bold",
              p: 1.5,
            }}
          >
            Reservar
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
            <Link
              href={`/users/reserva/${user.id}`}
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "18px",
                color: "black",
                mr: "25px",
              }}
            >
              Mis reservas
              <CalendarMonthOutlinedIcon />
            </Link>
            <Link
              href={`/users/editProfile/${user.id}`}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: "18px",
                color: "black",
                mr: "35px",
              }}
            >
              Mi cuenta
              <PersonOutlineOutlinedIcon />
            </Link>
            <Logout sx={{ marginLeft: "10px", mr: "10%" }} />
          </Box>
        </Box>
      ) : null}

      {user.isOp === true ? (
        <Box
          sx={{
            height: "90px",
            width: "100%",
            display: "flex",
            direction: "row",
            bgcolor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 10px 24px 6px rgba(0, 0, 0, 0.12);",
            mt: 3,
          }}
        >
          <Button
   
    onClick={()=>{ router.push(`/operator/verReservas/${user.branchId}`)}}
            sx={{
              marginLeft: "10%",
              color: "#A442F1",
              bgcolor: "rgba(164, 66, 241, 0.1)",
              fontWeight: "bold",
              p: 1.5,
            }}
          >
            Ver reservas
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", mr: "10%" }}>
            <Link
              href={`/users/editProfile/${user.id}`}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: "18px",
                color: "black",
                mr: "35px",
              }}
            >
              Mi cuenta
              <PersonOutlineOutlinedIcon />
            </Link>
            <Logout sx={{ marginLeft: "10px" }} />
          </Box>
        </Box>
      ) : null}

      {user?.isAdmin == true ? (
        <Box>
          <Button onClick={handleBooking}>Reservas</Button>
          <Button onClick={()=>{router.push(`/admin/createBranch`);}}>Crear sucursal</Button>
          <Button onClick={()=>{router.push(`/admin/createOperator`)}}>Crear operador</Button>
          <Link
            href={`/admin/branches`}
            sx={{ fontWeight: "bold", textDecoration: "none" }}
          >
            Sucursales <StoreMallDirectoryOutlinedIcon />{" "}
          </Link>
          <Link
            href={`/admin/operators`}
            sx={{ fontWeight: "bold", textDecoration: "none" }}
          >
            Operadores <SupportAgentOutlinedIcon />{" "}
          </Link>

          <Link href={`/users/reserva/${user.id}`}>
            Mi cuenta <PersonOutlineOutlinedIcon />{" "}
          </Link>
          <Logout sx={{ marginLeft: "10px", marginRight: "10%" }} />
        </Box>
      ) : null}
    </>
  );
};

export default Navbar;
