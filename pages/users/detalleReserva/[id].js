import React, { useState, useEffect } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined"; // tool
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"; // cancel
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const DetalleReserva = () => {
  useUserData();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [booking, setBooking] = useState([]);
  const { id } = router.query;

  console.log("reserva", booking);

  const handlerCancel = async () => {
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de querer eliminar esta reserva?"
      );
      if (confirmed) {
        const response = await fetch(
          `http://localhost:3000/api/shift/reserva/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Reserva eliminada exitosamente");
          router.push(`/users/reserva/${user.id}`);
        } else {
          alert("Error al eliminar la Reserva");
        }
      } else {
        alert("La eliminación de la reserva fue cancelada");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handlerEdit = () => {
    router.push(`/users/editarReserva/${id}`);
  };

  const getBooking = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:3000/api/users/detalleReserva/${id}`
        );
        setBooking(response.data);
      }
    } catch (e) {
      console.log("ERROR CATCH", e);
      throw e;
    }
  };

  useEffect(() => {
    getBooking();
  }, [id]);

  return (
    <Box sx={{ height: "100vh", bgcolor: "#fafafa" }}>
      <Box sx={{ display: "flex", direction: "column", pt: "5%" }}>
        <Box
          sx={{
            width: "80%",
            height: "50%",
            // bgcolor: "green",
            m: "auto",
            display: "flex",
            p: 4,
          }}
        >
          <Box sx={{ m: "auto" }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              <CheckBoxOutlinedIcon sx={{ color: "#A442F1", fontSize: 58 }} />
              <Typography
                variant="h4"
                sx={{ p: 1, pt: 3, color: "#A442F1", fontWeight: "bold" }}
              >
                ¡Gracias por tu reserva!
              </Typography>
              <Typography variant="subtitle1" sx={{ pt: 2 }}>
                Estaremos enviándote un correo electrónico de confirmación a{" "}
                {user.email} con todos los detalles de tu reservación.
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ p: 3, maxWidth: "85%", m: "auto" }}></Divider>
      <Box sx={{ width: "90%", height: "20%", pt: "3%", m: "auto" }}>
        {booking.map((reserva) => (
          <Grid
            sx={{
              width: "95%",
              height: "100%",
              m: "auto",
              padding: "16px",
              marginBottom: "16px",
            }}
            key={reserva._id}
          >
            <Grid container xs={12}>
              <Grid item xs={9}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Código de la reserva
                  <Typography
                    component="span"
                    variant="inherit"
                    sx={{ color: "#A442F1", pl: 1.2 }}
                  >
                    #{reserva.bookingNumber}
                  </Typography>
                </Typography>
                <Typography sx={{ fontSize: "18px", marginTop: "8px" }}>
                  Realizada el día {reserva.creatingDate.slice(0, 10)} a las{" "}
                  {`${reserva.creatingDate.slice(11, 16)} hs`} para el día{" "}
                  {reserva.date} a las {reserva.shift} hs
                </Typography>
              </Grid>

              <Box sx={{ width: "280px" }}>
                <Grid sx={{ pb: 1.5 }}>
                  <Button
                    sx={{
                      p: 2,
                      color: "#A442F1",
                      bgcolor: "rgba(164, 66, 241, 0.1)",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handlerEdit}
                  >
                    <BuildCircleOutlinedIcon />
                    Editar reserva
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      p: 2,
                      color: "#A442F1",
                      bgcolor: "rgba(164, 66, 241, 0.1)",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handlerCancel}
                  >
                    <HighlightOffOutlinedIcon sx={{ color: "#e73c35" }} />
                    Cancelar reserva
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Nombre: {reserva.fullname}
                </Typography>
                <Typography variant="body1">Fecha: {reserva.date}</Typography>
                <Typography variant="body1">Email: {reserva.email}</Typography>
                <Typography variant="body1">DNI: {reserva.DNI}</Typography>
              </Grid>
              <Grid item sx={{}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Reserva
                </Typography>
                <Typography variant="body1">
                  Sucursal: {reserva.branchName}
                </Typography>
                <Typography variant="body1">
                  Horario: {reserva.shift}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

{
  /* <Typography>Número de reserva #{reserva.bookingNumber}</Typography> 
<Grid item sx= {{display:"flex"}}>
  <Box sx={{direction:"column"}}>

<Button>Editar reserva</Button>
<Button>Cancelar reserva</Button>
  </Box>
</Grid> */
}

export default DetalleReserva;
