import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import { Box, Button, InputLabel, Link } from "@mui/material";
import { useSelector } from "react-redux";

const Shifts = () => {
  useUserData();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [shifts, setShifts] = useState([]);
  const { id } = router.query;

  const getShifts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/operator/verReservas/${id}`
      );
      const data = response.data;
      const sortedShifts = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setShifts(sortedShifts);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <Box sx={{ pt: "100px" }}>
      <Box sx={{ fontWeight: "bold", fontSize: "24px", pb: 3, pl: "8%" }}>
        {" "}
        Reservas en tu sucursal de: {user.branchName}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "85%", m: "auto", pb: 5 }}>
          {shifts.map((shift) => (
            <Box key={shift._id} sx={{ p: 1 }}>
              <Box
                sx={{
                  border: "1px solid #F0F0F0",
                  p: "24px",
                  borderRadius: "12px",
                  display: "flex",
                  direction: "row",
                  alignItems: "center",
                  fontSize: "14px",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <InputLabel>Nombre</InputLabel>
                  {shift.fullname}
                </Box>
                <Box>
                  <InputLabel>Fecha</InputLabel>
                  <Box>{shift.date}</Box>
                </Box>

                <Box>
                  <InputLabel>Hora</InputLabel>
                  <Box>{shift.shift}</Box>
                </Box>

                <Box>
                  <InputLabel>DNI</InputLabel>
                  <Box>{shift.DNI}</Box>
                </Box>

                <Box>
                  <InputLabel>E-mail</InputLabel>
                  <Box>{shift.email}</Box>
                </Box>
                <Button
                  sx={{
                    p: "12px 24px",
                    bgcolor: "#F5F5F5",
                    color: "#A442F1",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    router.push(`/users/editarReserva/${shift._id}`)
                  }
                >
                  Editar
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Shifts;
