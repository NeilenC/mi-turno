import React, { useState, useEffect } from "react";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Grid, InputLabel } from "@mui/material";

const VerReserva = () => {
  useUserData();
  const [bookings, setBookings] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  const getAllBookings = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:3000/api/users/ver-reservas/${id}`
        );
        setBookings(response.data);
      }
    } catch (e) {
      console.log("ERROR CATCH", e);
      throw e;
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  console.log("BOOOKINGS", bookings);
  return (
    <Box sx={{ pt: "90px" }}>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          pb: 3,
          pl: "152px",
          display: "flex",
          direction: "column",
        }}
      >
        Mis reservas
      </Box>
      {bookings.length ? (
        <Grid container spacing={2} sx={{ display: "flex" }}>
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
                <Grid item xs={6}>
                  <InputLabel>Nombre</InputLabel>
                  {booking.fullname}
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Fecha</InputLabel>
                  <Grid>{booking.date}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Horario</InputLabel>
                  <Grid>{booking.shift}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Email</InputLabel>
                  <Grid>{booking.email}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>DNI</InputLabel>
                  <Grid>{booking.DNI}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Sucursal</InputLabel>
                  <Grid>{booking.branchName}</Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Nº de reserva</InputLabel>
                  <Grid>{booking.bookingNumber}</Grid>
                </Grid>
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
            direction: "column",
          }}
        >
          <Box sx={{ m: "auto" }}> Aún no tienes reservas </Box>
        </Box>
      )}
    </Box>
  );
};

export default VerReserva;
