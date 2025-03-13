import {
  Box,
  Button,
  Grid,
  Link,
  ThemeProvider,
  createTheme,
  styled,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import Logout from "./Logout";
import useUserData from "../Hooks/useUserData";

const StyledBox = styled(Box)(() => ({
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 50px",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.10)",
  backgroundColor: "white",
}));

const StyledLink = styled(Link)(() => ({
  fontWeight: "bold",
  textDecoration: "none",
  color: "black",
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

const Navbar = () => {
  useUserData();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    user && !user?.isOp && !user?.isAdmin && {
      text: "Mis reservas",
      icon: <CalendarMonthOutlinedIcon />,
      href: `/users/verReservas/${user?.id}`,
    },
    user?.isOp && {
      text: "Ver reservas",
      icon: <CalendarMonthOutlinedIcon />,
      href: `/operator/verReservas/${user?.branchId}`,
    },
    user?.isAdmin && {
      text: "Sucursales",
      icon: <StoreMallDirectoryOutlinedIcon />,
      href: `/admin/branches`,
    },
    user?.isAdmin && {
      text: "Operadores",
      icon: <SupportAgentOutlinedIcon />,
      href: `/admin/operators`,
    },
    {
      text: "Mi cuenta",
      icon: <PersonOutlineOutlinedIcon />,
      href: `/users/editProfile/${user?.id}`,
    },
  ].filter(Boolean);

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: "rgba(164, 66, 241, 0.1)",
                color: "#A442F1",
                fontWeight: "bold",
                padding: "10px 20px",
                height: "45px",
              },
            },
          },
        },
      })}
    >
      <StyledBox>
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {menuItems.map(({ text, icon, href }) => (
                  <ListItem button key={text} onClick={() => router.push(href)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
                <ListItem button onClick={() => router.push("/logout")}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar sesión" />
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Grid container alignItems="center" sx={{ width: "100%" }}>
            <Grid item xs={7.5}>
              {user && !user?.isOp && !user?.isAdmin && (
                <Button onClick={() => router.push(`/users/reserva/${user?.id}`)}>
                  Reservar
                </Button>
              )}
              {user?.isOp && (
                <Button onClick={() => router.push(`/operator/verReservas/${user?.branchId}`)}>
                  Ver reservas
                </Button>
              )}
              {user?.isAdmin && (
                <>
                  <Button onClick={() => router.push(`/admin/createBranch`)} sx={{marginRight:'30px'}}>Crear sucursal</Button>
                  <Button onClick={() => router.push(`/admin/createOperator`)}>Crear operador</Button>
                </>
              )}
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
              {menuItems.map(({ text, icon, href }) => (
                <StyledLink key={text} href={href}>
                  {icon}
                  {text}
                </StyledLink>
              ))}
            </Grid>

            <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Logout />
            </Grid>
          </Grid>
        )}
      </StyledBox>
    </ThemeProvider>
  );
};

export default Navbar;
