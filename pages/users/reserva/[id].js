import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useBranchData from "../../../Hooks/useBranchData";
import { setUserInfo } from "../../../redux/userInfo";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";

const steps = ["Elegí tu sucursal", "Selleccioná el día", "Completá los datos"];

const Reserva = () => {
  useBranchData();
  useUserData();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [activeStep, setActiveStep] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [newShift, setNewShift] = useState([]);
  const router = useRouter();
  const branches = useSelector((state) => state.branches);
  const user = useSelector((state) => state.user);
  const now = dayjs().format("DD/MM/YYYY HH:mm"); // 2023-07-06 19:27

  const handleBranchSelect = (e) => {
    setActiveStep(0);
  };

  const handleDateChange = (date) => {
    setSelectedDay(date.format("DD/MM/YYYY"));
    setActiveStep(1);
    if (selectedBranch) {
      getAvailableShift();
    }
  };

  const getStepColor = (stepIndex) => {
    if (stepIndex === 0 && selectedBranch) {
      return "primary";
    }
    return undefined; // Mantener el color por defecto
  };

  const getAvailableShift = async () => {
    try {
      const availableShifts = await axios.post(
        "http://localhost:3000/api/shift/check",
        {
          branchId: selectedBranch._id,
          date: selectedDay,
        }
      );
      setShifts(availableShifts.data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (selectedBranch && selectedDay) {
      getAvailableShift();
    }
  }, [selectedDay, selectedBranch]);

  const createShift = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shift/create",
        {
          branchId: selectedBranch._id,
          branchName: selectedBranch.name,
          date: selectedDay,
          shift: selectedShift,
          fullname: `${user.name} ${user.lastname}`,
          email: user.email,
          DNI: user.DNI,
          userId: user.id,
          phoneNumber: phoneNumber,
          creatingDate: now,
        }
      );
      const newShift = response.data;
      setNewShift(newShift);
      // dispatch(
      //   setUserInfo({
      //     phoneNumber: phoneNumber
      //   })
      // );
      setActiveStep(2);
      alert("El turno se ha creado correctamente ");
      router.push(`/users/detalleReserva/${newShift._id}`);
      setSelectedBranch(null);
      setSelectedDay(null);
      setSelectedShift("");
      return newShift;
    } catch (e) {
      alert("No se ha logrado crear el turno");
      throw e;
    }
  };

  useEffect(() => {
    if (selectedBranch && selectedDay) {
      createShift();
    }
  }, []);

  console.log("NUEVA RESERVA", newShift);

  return (
    // <>

    // {user ?
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
              Reserva <br />
              <small>Seleccioná las opciones disponibles</small>
            </Box>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ m: "auto", pt: 5 }}
            >
              {steps.map((label, index) => (
                <Step
                  key={label}
                  completed={index < activeStep}
                  color={getStepColor(index)}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {/* PASO 1 */}
            <InputLabel sx={{ m: 1, ml: 4 }}>Sucursal</InputLabel>
            <Select
              sx={{ width: "85%", ml: 4 }}
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value), handleBranchSelect();
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
              value={selectedShift}
              onChange={(e) => {
                setSelectedShift(e.target.value);
              }}
            >
              {shifts.map((turno, i = 0) => (
                <MenuItem key={i + 1} value={turno}>
                  {turno}
                </MenuItem>
              ))}
            </Select>

            <Grid container spacing={2} sx={{ ml: 3, p: 2 }}>
              <InputLabel>
                Nombre
                <Grid xs={12} sm={5} item>
                  <TextField
                    name="name"
                    // placeholder="Ingrese su Nombre"
                    variant="outlined"
                    fullWidth
                    required
                    value={user.name}
                    // onChange={handleChange}
                  />
                </Grid>
              </InputLabel>
              <InputLabel>
                Apellido
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="Apellido"
                    variant="outlined"
                    fullWidth
                    value={user.lastname} // agregar el valor del estado
                  />
                </Grid>
              </InputLabel>
            </Grid>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              Email
              <TextField id="branch" sx={{ width: "90%" }} value={user.email} />
            </InputLabel>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              DNI
              <TextField id="branch" sx={{ width: "90%" }} value={user.DNI} />
            </InputLabel>
            <InputLabel sx={{ m: 1, ml: 4 }}>
              Teléfono
              <TextField
                id="branch"
                sx={{ width: "90%" }}
                value={user.phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
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
              onClick={createShift}
            >
              Confirmar reserva
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
                  <DateCalendar
                    date={selectedDay}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
    //   : router.push("/") && alert("DEBE INICIAR SESION")
    // }
    //  </>
  );
};

export default Reserva;
