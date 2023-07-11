import React, { useState, useEffect } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

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
    router.push(`/users/editarReserva/${id}`)
  }

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
      <Box sx={{ display: "flex", direction: "column", pt: "10%" }}>
        <Box
          sx={{
            width: "80%",
            height: "50%",
            bgcolor: "green",
            m: "auto",
            display: "flex",
            p: 4,
          }}
        >
          <Box sx={{ m: "auto" }}>
            <Typography variant="h4" sx={{ p: 2 }}>
              {" "}
              ¡Gracias por tu reserva!
            </Typography>
            <Typography variant="body1" sx={{ p: 2 }}>
              {" "}
              Estaremos enviándote un mail de confirmación{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ p: 3, maxWidth: "85%", m: "auto" }}></Divider>
      <Box sx={{ width: "90%", height: "20%", pt: "3%" }}>
        {booking.map((reserva) => (
          <Grid
            sx={{ width: "95%", height: "130%", bgcolor: "pink", m: "auto" }}
            key={reserva._id}
          >
            <Grid container sx={{ height: "50%", bgcolor: "lightblue" }}>
              <Typography>
                Código de la reserva #{reserva.bookingNumber}
              </Typography>
              <Typography>
                Realizada el día {reserva.creatingDate.slice(0, 10)} a las{" "}
                {`${reserva.creatingDate.slice(10, 16)} hs`}
              </Typography>

              <Grid item sx={{}}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "240px", p: 2 }}>
                    <Button sx={{ p: 2 }} onClick={handlerEdit} >Editar reserva</Button>

                    <Button sx={{ p: 2 }} onClick={handlerCancel}>
                      Cancelar reserva
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{}}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Nombre: {reserva.fullname}
                </Typography>
                <Typography variant="body1">Fecha: {reserva.date}</Typography>
                <Typography variant="body1">Email: {reserva.email}</Typography>
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
