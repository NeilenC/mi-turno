import React, { useState, useEffect, useCallback } from "react";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined"; // tool
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"; // cancel
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import Swal from "sweetalert2";

const DetalleReserva = () => {
  // useUserData();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [booking, setBooking] = useState([]);
  const { id } = router.query;

  const handlerCancel = async () => {
    try {
      const confirmed = await Swal.fire({
        title: "Espera",
        text: "¿Estas seguro de querer cancelar tu turno?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9c27b0",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
      if (confirmed.isConfirmed) {
        const response = await fetch(
          `/api/shift/cancel/${id}`,
          {
            method: "PUT",
            body: JSON.stringify({ newState: "cancelada" }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          Swal.fire({
            title: "Reserva cancelada",
            text: "Esperamos verte pronto",
            type: "success",
          });
          router.push(`/users/reserva/${user?.id}`);
        } else {
          Swal.fire({
            title: "No se ha podido cancelar la reserva",
            text: "Intenta nuevamente",
            type: "error",
          });
        }
      }
    } catch (e) {
      throw e;
    }
  };

  const handlerEdit = () => {
    router.push(`/users/editarReserva/${id}`);
  };

  const getBooking = useCallback(async () => {
    try {
      if (id) {
        const response = await axios.get(
          `/api/users/detalleReserva/${id}`
        );
        setBooking(response.data);
      }
    } catch (e) {
      throw e;
    }
  }, [id]);

  useEffect(() => {
    getBooking();
  }, [id, getBooking]);

  return (
    <Box sx={{ height: "100vh", bgcolor: "#fafafa" }}>
      <Box sx={{ display: "flex", direction: "column", pt: "4.5%" }}>
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
                {user?.email} con todos los detalles de tu reservación.
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
                <Grid container xs={12} sx={{ pb: 1.5 }}>
                  <Button
                    sx={{
                      p: 2,
                      color: "#A442F1",
                      bgcolor: "rgba(164, 66, 241, 0.1)",
                      width: "100%",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                    onClick={handlerEdit}
                  >
                    <BuildCircleOutlinedIcon />
                    <Grid xs={4.5} sx={{ fontWeight: "bold" }}>
                      Editar
                    </Grid>
                  </Button>
                </Grid>
                <Grid container xs={12}>
                  <Button
                    sx={{
                      p: 2,
                      color: "#A442F1",
                      bgcolor: "rgba(164, 66, 241, 0.1)",
                      width: "100%",
                    }}
                    onClick={handlerCancel}
                  >
                    <HighlightOffOutlinedIcon sx={{ color: "#e73c35" }} />
                    <Grid xs={4.5} sx={{ fontWeight: "bold" }}>
                      Cancelar
                    </Grid>
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
