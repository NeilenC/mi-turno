import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/router";
import useUserData from "../../../Hooks/useUserData";
import useBranchData from "../../../Hooks/useBranchData";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined"; // tool
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"; // cancel
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Edit = () => {
  useUserData();
  useBranchData();
  const branches = useSelector((state) => state.branches);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query; // ID de la reserva
  const [selectedBranch, setSelectedBranch] = useState("" || null);
  const [newDate, setNewDate] = useState("" || null);
  const [newShift, setNewShift] = useState("" || null);
  const [newEmail, setNewEmail] = useState("" || null);
  const [newPhoneNumber, setNewPhoneNumber] = useState(0 || null);
  const [shifts, setShifts] = useState([]);
  const now = dayjs().format("DD/MM/YYYY HH:mm"); // 2023-07-06 19:27

  const handlerUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/shift/reserva/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branchId: selectedBranch._id,
            branchName: selectedBranch.name,
            date: newDate,
            email: newEmail,
            phoneNumber: newPhoneNumber,
            shift: newShift,
            creatingDate: now,
          }),
        }
      );
      const data = await response.json();
      alert("Cambiaste los datos de tu reserva");
      router.push(`/users/detalleReserva/${id}`);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const handleDateChange = (date) => {
    setNewDate(date.format("DD/MM/YYYY"));
    if (selectedBranch) {
      getAvailableShift();
    }
  };

  const getAvailableShift = async () => {
    try {
      const availableShifts = await axios.post(
        "http://localhost:3000/api/shift/check",
        {
          branchId: selectedBranch._id,
          date: newDate,
        }
      );
      const data = await availableShifts.data;
      setShifts(data);
    } catch (e) {
      throw e;
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#ECECEC", height: "100vh" }}>
      <Box
        sx={{
          height: "580px",
          width: "90%",
          m: "auto",
          display: "flex",
          pb: "35%",
        }}
      >
        <Grid
          container
          sx={{ width: "1300px", height: "550px", display: "flex", m: "auto" }}
        >
          <Box
            sx={{
              width: "65%",
              bgcolor: "#FFFFFF",
              height: "138%",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ pl: 5, pt: 5, fontSize: "23px", fontWeight: "bold" }}>
              Editar reserva <br />
              <small>Seleccioná las opciones disponibles</small>
            </Box>
            {/* PASO 1 */}
            <InputLabel sx={{ m: 1, ml: 4 }}>Sucursal</InputLabel>
            <Select
              sx={{ width: "85%", ml: 4 }}
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
              }}
            >
              {branches.map((branch) => (
                <MenuItem key={branch._id} value={branch}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>

            {/* FIN PASO 1 */}

            {/* INICIO PASO 2  */}
            <Select
              sx={{ width: "85%", ml: 4 }}
              value={newShift}
              onChange={(e) => {
                setNewShift(e.target.value);
              }}
            >
              {shifts.map((turno, i = 0) => (
                <MenuItem key={i + 1} value={turno}>
                  {turno}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              Email
              <TextField
                id="branch"
                sx={{ width: "90%" }}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </InputLabel>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              Teléfono
              <TextField
                id="branch"
                sx={{ width: "90%" }}
                value={user.newPhoneNumber}
                onChange={(e) => {
                  setNewPhoneNumber(e.target.value);
                }}
              />
            </InputLabel>
            <Button
              sx={{
                ml: "32px",
                pl: "16px",
                p: 3,
                bgcolor: "#A442F1",
                color: "white",
              }}
              onClick={handlerUpdate}
            >
              Editar reserva
            </Button>
          </Box>
          <Box>
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                ml: 5,
                width: "150%",
                height: "50%",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ justifyContent: "center", pt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar date={newDate} onChange={handleDateChange} />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Edit;
