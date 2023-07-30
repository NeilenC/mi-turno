import {
  Box,
  Button,
  Grid,
  Link,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useUserData from "../Hooks/useUserData";
import Logout from "./Logout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"; // persona
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined"; // operadores
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; // calendario
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined"; // sucursal

const StyledBox = styled(Box)(() => ({
  height: "90px",
  display: "flex",
  boxShadow: "12px 10px 24px 6px rgba(0, 0, 0, 0.12);",
  marginTop: "24px",
}));

const StyledLink = styled(Link)(() => ({
  fontWeight: "bold",
  textDecoration: "none",
  mr: 3,
  color: "black",
  ml: "26%",
}));

const Navbar = () => {
  useUserData();
  const [id, setId] = useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleBooking = () => {
    router.push(`/users/reserva/${user.id}`);
  };

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(164, 66, 241, 0.1)",
            color: "#A442F1",
            fontWeight: "bold",
            p: 2,
            width: "200px",
            height: "45px",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {!user.isOp && !user.isAdmin && id ? (
          <StyledBox>
            <Grid
              container
              spacing={2.5}
              xs={12}
              sx={{ m: "auto", alignItems: "center" }}
            >
              <Grid item xs={8}>
                <Button onClick={handleBooking}>Reservar</Button>
              </Grid>

              {/* <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}> */}
              <Grid item xs={1.3}>
                <StyledLink href={`/users/verReservas/${user.id}`}>
                  Mis reservas
                  <CalendarMonthOutlinedIcon />
                </StyledLink>
              </Grid>

              <Grid item xs={1.2}>
                <StyledLink href={`/users/editProfile/${user.id}`}>
                  Mi cuenta
                  <PersonOutlineOutlinedIcon />
                </StyledLink>
              </Grid>
              <Grid item xs={1.2}>
                <Logout sx={{ marginLeft: "10px", mr: "10%" }} />
              </Grid>
            </Grid>
          </StyledBox>
        ) : null}

        {user.isOp && id ? (
          <StyledBox>
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
                >
                  Ver reservas
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StyledLink href={`/users/editProfile/${user.id}`}>
                    Mi cuenta
                    <PersonOutlineOutlinedIcon />
                  </StyledLink>
                  <Grid item xs={4}>
                    <Logout />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </StyledBox>
        ) : null}

        {user.isAdmin && user.name != "" ? (
          <StyledBox>
            <Grid container xs={12} sx={{ m: "auto", alignItems: "center" }}>
              <Grid item xs={1.4} sx={{ ml: "5%" }}>
                <Button
                  onClick={() => {
                    router.push(`/admin/createBranch`);
                  }}
                >
                  Crear sucursal
                </Button>
              </Grid>
              <Grid item xs={4.5}>
                <Button
                  onClick={() => {
                    router.push(`/admin/createOperator`);
                  }}
                >
                  Crear operador
                </Button>
              </Grid>
              <Grid></Grid>

              <Grid item xs={1}>
                <StyledLink href={`/admin/branches`}>
                  Sucursales <StoreMallDirectoryOutlinedIcon />
                </StyledLink>
              </Grid>
              <Grid item xs={1.1}>
                <StyledLink href={`/admin/operators`}>
                  Operadores <SupportAgentOutlinedIcon />
                </StyledLink>
              </Grid>
              <Grid item xs={1}>
                <StyledLink href={`/users/editProfile/${user.id}`}>
                  Mi cuenta
                  <PersonOutlineOutlinedIcon />
                </StyledLink>
              </Grid>

              <Grid item xs={1}>
                <Logout />
              </Grid>
            </Grid>
          </StyledBox>
        ) : null}
      </ThemeProvider>
    </>
  );
};

export default Navbar;
