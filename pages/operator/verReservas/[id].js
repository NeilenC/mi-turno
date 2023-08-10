import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import Buscador from "../../../components/Search";

const Shifts = () => {
  useUserData();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [shifts, setShifts] = useState([]);
  const today = dayjs().format("DD-MM-YYYYY");
  const { id } = router.query;

  const getShifts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/operator/verReservas/${id}`
      );
      const data = response.data;
      const shiftsFromToday = data.filter(
        (shift) =>
          dayjs(shift.date).isAfter(today, "day") ||
          dayjs(shift.date).isSame(today)
      );

      const sortedShifts = shiftsFromToday.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setShifts(sortedShifts);

      setShifts(data);
    } catch (e) {
      throw e;
    }
  }, [id, today]);

  useEffect(() => {
    getShifts();
  }, [getShifts]);

  const handleShiftChange = async (shiftId, status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/shift/cancel/${shiftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) {
        const newState = await response.json();
        setShifts((prevShifts) =>
          prevShifts.map((shift) =>
            shift._id === shiftId
              ? { ...shift, status: newState.status }
              : shift
          )
        );
        return newState;
      } else {
        alert("ERROR");
      }
    } catch (error) {
      console.error("Error al actualizar el estado del turno:", error);
    }
  };

  return (
    <>
      {/* <Buscador/> */}
      <Box sx={{ pt: "100px" }}>
        <Box sx={{ fontWeight: "bold", fontSize: "24px", pb: 3, pl: "8%" }}>
          {" "}
          Reservas en tu sucursal de: {user.branchName}
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "85%", m: "auto", pb: 5 }}>
            {shifts.map((shift) => (
              <Box key={shift._id} sx={{ p: 1 }}>
                <Grid
                  container
                  xs={12}
                  sx={{
                    border: "1px solid #DEDEDE",
                    p: "24px",
                    borderRadius: "12px",
                    display: "flex",
                    direction: "row",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  <Grid item xs={1.7} sx={{ ml: 3 }}>
                    <InputLabel>Nombre</InputLabel>
                    {shift.fullname}
                  </Grid>
                  <Grid xs={1.7}>
                    <InputLabel>Fecha</InputLabel>
                    <Grid>{shift.date}</Grid>
                  </Grid>

                  <Grid xs={1.5}>
                    <InputLabel>Hora</InputLabel>
                    <Grid>{shift.shift}</Grid>
                  </Grid>

                  <Grid xs={2}>
                    <InputLabel>E-mail</InputLabel>
                    <Grid>{shift.email}</Grid>
                  </Grid>

                  <Grid xs={1.7}>
                    <InputLabel>DNI</InputLabel>
                    <Grid>{shift.DNI}</Grid>
                  </Grid>

                  <Grid xs={1.7}>
                    <InputLabel>Creada el día</InputLabel>
                    <Grid>{shift.creatingDate}</Grid>
                  </Grid>

                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: 150,
                      backgroundColor: "rgba(164, 66, 241, 0.1)",
                      borderRadius: "10px",
                      border: "2px solid A442F1 ",
                    }}
                  >
                    <Select
                      sx={{
                        color:
                          shift.status == "confirmada"
                            ? "purple"
                            : shift.status == "asistida"
                            ? "grey"
                            : "black",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                      value={shift.status}
                      onChange={(e) =>
                        handleShiftChange(shift._id, e.target.value)
                      }
                      displayEmpty
                    >
                      <MenuItem
                        sx={{ color: "purple", fontSize: "15px" }}
                        value={"confirmada"}
                      >
                        CONFIRMADA
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "grey", fontSize: "15px" }}
                        value={"cancelada"}
                      >
                        CANCELADA
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "dark", fontSize: "15px" }}
                        value={"asistida"}
                      >
                        ASISTIDA
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Shifts;
