import React, { useState, useEffect, useCallback } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const VerReserva = () => {
  // useUserData();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  const getAllBookings = useCallback(async () => {
    try {
      if (id) {
        const response = await axios.get(
          `/api/users/verReservas/${id}`
        );
        const data = response.data;
        setBookings(data);
      }
    } catch (e) {
      throw e;
    }
  }, [id]);

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  const cancellBooking = async (id) => {
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
        response.ok ? router.push(`/users/reserva/${user?.id}`) : null;
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <Box sx={{ pt: "90px" }}>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          pb: 3,
          pl: "164px",
          display: "flex",
          direction: "column",
        }}
      >
        Mis reservas
      </Box>
      {bookings.length ? (
        <Grid container spacing={2} sx={{ display: "flex", pb: 5 }}>
          {bookings.map((booking) => (
            <Grid item key={booking._id} xs={10} sx={{ m: "auto" }}>
              <Box
                sx={{
                  border: "1.5px solid #F0F0F0",
                  p: "24px",
                  borderRadius: "12px",
                  display: "flex",
                  direction: "column",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                <Grid item xs={5.5}>
                  <InputLabel>Nombre</InputLabel>
                  {booking.fullname}
                </Grid>

                <Grid item xs={5.5}>
                  <InputLabel>Fecha de reserva</InputLabel>
                  <Grid>{booking.date}</Grid>
                </Grid>

                <Grid item xs={4.5}>
                  <InputLabel>Horario</InputLabel>
                  <Grid>{booking.shift}</Grid>
                </Grid>

                <Grid item xs={5.5}>
                  <InputLabel>Email</InputLabel>
                  <Grid>{booking.email}</Grid>
                </Grid>

                <Grid item xs={5.5}>
                  <InputLabel>Fecha de creación</InputLabel>
                  <Grid>{booking.creatingDate}</Grid>
                </Grid>

                <Grid item xs={4.5}>
                  <InputLabel>Sucursal</InputLabel>
                  <Grid>{booking.branchName}</Grid>
                </Grid>

                <Grid item xs={4.5}>
                  <InputLabel>Estado</InputLabel>
                  {booking.status === "cancelada" ? (
                    <Grid sx={{ color: "red" }}>{booking.status}</Grid>
                  ) : (
                    <Grid sx={{ color: "purple" }}>{booking.status}</Grid>
                  )}
                </Grid>

                <Grid item xs={5.8}>
                  <InputLabel>Código de reserva</InputLabel>
                  <Grid>{booking.bookingNumber}</Grid>
                </Grid>

                {booking.status != "cancelada" ||
                booking.status != "asistida" ? (
                  <Grid item xs={1}>
                    <Button
                      onClick={() => {
                        cancellBooking(booking._id);
                      }}
                      sx={{
                        color: "red",
                        fontSize: "13px",
                        bgcolor: "rgba(164, 66, 241, 0.1)",
                      }}
                    >
                      cancelar
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={1}>
                    <Button
                      disabled={true}
                      sx={{
                        color: "red",
                        fontSize: "13px",
                        bgcolor: "rgba(164, 66, 241, 0.1)",
                      }}
                    >
                      cancelar
                    </Button>
                  </Grid>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            display: "flex",
          }}
        >
          <Box sx={{ m: "auto", pt: "300px" }}>
            <Stack sx={{ color: "purple.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>{" "}
          </Box>{" "}
        </Box>
      )}
    </Box>
  );
};

export default VerReserva;
