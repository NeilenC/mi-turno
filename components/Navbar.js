import { Box, Button, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUserData from "../Hooks/useUserData";
import Logout from "./Logout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"; // persona
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"; // operadores
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; // calendario
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined"; // sucursal

const Navbar = () => {
  useUserData();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleBooking = () => {
    router.push(`/users/reserva/${user.id}`);
  };

  return (
    <>
      {!user.isOp && !user.isAdmin && user.name != "" ? (
        <Box
          sx={{
            height: "90px",
            // width: "100%",
            bgcolor: "#FFFFFF",
            alignItems: "center",
            boxShadow: "0px 10px 24px 6px rgba(0, 0, 0, 0.12);",
            mt: 3,
          }}
        >
          <Grid
            container
            spacing={2.5}
            xs={12}
            sx={{ m: "auto", alignItems: "center" }}
          >
            <Grid item xs={8}>
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
            </Grid>

            {/* <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}> */}
            <Grid item xs={1.2}>
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
            </Grid>

            <Grid item xs={1.2}>
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
            </Grid>
            <Grid item xs={1.2}>
              <Logout sx={{ marginLeft: "10px", mr: "10%" }} />
            </Grid>
          </Grid>
        </Box>
      ) : // </Box>
      null}

      {user.isOp && user.name != "" ? (
        <Box
          sx={{
            height: "90px",
            bgcolor: "#FFFFFF",
            boxShadow: "0px 10px 24px 6px rgba(0, 0, 0, 0.12);",
            mt: 3,
          }}
        >
          <Grid
            container
            spacing={2.5}
            xs={12}
            sx={{ m: "auto", alignItems: "center" }}
          >
            <Grid item xs={9}>
              <Button
                onClick={() => {
                  router.push(`/operator/verReservas/${user.branchId}`);
                }}
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
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                <Grid item xs={4}>
                  <Logout />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {user.isAdmin && user.name != "" ? (
        <Box
          sx={{
            height: "90px",
            display: "flex",
            bgcolor: "#FFFFFF",
            boxShadow: "0px 10px 24px 6px rgba(0, 0, 0, 0.12);",
            mt: 3,
          }}
        >
          <Grid container xs={12} sx={{ m: "auto", alignItems: "center" }}>
            <Grid item xs={1.4} sx={{ ml: "5%" }}>
              <Button
                sx={{
                  color: "#A442F1",
                  bgcolor: "rgba(164, 66, 241, 0.1)",
                  fontWeight: "bold",
                  p: 1.5,
                }}
                onClick={() => {
                  router.push(`/admin/createBranch`);
                }}
              >
                Crear sucursal
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                sx={{
                  color: "#A442F1",
                  bgcolor: "rgba(164, 66, 241, 0.1)",
                  fontWeight: "bold",
                  p: 1.5,
                }}
                onClick={() => {
                  router.push(`/admin/createOperator`);
                }}
              >
                Crear operador
              </Button>
            </Grid>
            <Grid></Grid>

            <Grid item xs={1.4}>
              <Link
                href={`/admin/branches`}
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  mr: 3,
                  color: "black",
                  ml: "26%",
                }}
              >
                Sucursales <StoreMallDirectoryOutlinedIcon />
              </Link>
            </Grid>
            <Grid item xs={1.1}>
              <Link
                href={`/admin/operators`}
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  mr: 3,
                  color: "black",
                }}
              >
                Operadores <SupportAgentOutlinedIcon />
              </Link>
            </Grid>
            <Grid item xs={1.1}>
              <Link
                href={`/users/editProfile/${user.id}`}
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "18px",
                  color: "black",
                  mr: 5,
                }}
              >
                Mi cuenta
                <PersonOutlineOutlinedIcon />
              </Link>
            </Grid>

            <Grid item xs={1}>
              <Logout />
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default Navbar;
