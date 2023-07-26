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
import Navbar from "../../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import useBranchData from "../../../Hooks/useBranchData";
import useUserData from "../../../Hooks/useUserData";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2"

const steps = ["Elegí tu sucursal", "Selleccioná el día", "Completá los datos"];

const Reserva = () => {
  useBranchData();
  useUserData();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [name, setName] = useState("");
  const [activeStep, setActiveStep] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [newShift, setNewShift] = useState([]);
  const [isCalendarDisabled, setIsCalendarDisabled] = useState(true);
  const router = useRouter();
  const branches = useSelector((state) => state.branches);
  const user = useSelector((state) => state.user);
  const now = dayjs().format("DD/MM/YYYY HH:mm");
  const [id, setId] = useState("");

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  // console.log("USER", user)
  // const shouldDisableDate = (date) => {
  //   const day = date.getDay(); // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
  //   return day === 0 || day === 6; // Deshabilitar sábado (6) y domingo (0)
  // };

  const handleBranchSelect = (e) => {
    setActiveStep(0);
    setIsCalendarDisabled(false);
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

  // const createShift = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/shift/create",
  //       {
  //         branchId: selectedBranch._id,
  //         branchName: selectedBranch.name,
  //         date: selectedDay,
  //         shift: selectedShift,
  //         fullname: `${name} ${lastname}`,
  //         email: email || user.email,
  //         DNI: user.DNI || user.DNI,
  //         userId: user.id,
  //         phoneNumber: phoneNumber,
  //         creatingDate: now,
  //       }
  //     );
  //     const newShift = response.data;
  //     setNewShift(newShift);
  //     setActiveStep(2);
  //     Swal.fire({
  //       title: 'Turno reservado con exito',
  //       icon: 'success',
  //       confirmButtonText: 'Continuar'
  //     })
  //     router.push(`/users/detalleReserva/${newShift._id}`);
  //     setSelectedBranch(null);
  //     setSelectedDay(null);
  //     setSelectedShift("");
  //     return newShift;
  //   } catch (e) {
  //     Swal.fire({
  //       title: 'Hubo un error al reservar el turno',
  //       text: 'Por favor, intente nuevamente',
  //       icon: 'error',
  //       confirmButtonText: 'Continuar'
  //     })
  //     console.log(e) ;
  //   }
  // };

  // useEffect(() => {
  //   if (selectedBranch && selectedDay) {
  //     createShift();
  //   }
  // }, []);

  // console.log("NUEVA RESERVA", newShift);

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#F5f5f5f5", height: "100vh" }}>
        <Box
          sx={{
            // height: "500px",
            width: "90%",
            pt: "3%",
            m: "auto",
            display: "flex",
            pb: "35%",
          }}
        >
          <Grid
            container
            sx={{
              width: "80%",
              height: "550px",
              display: "flex",
              m: "auto",
            }}
          >
            <Box
              sx={{
                width: "65%",
                // bgcolor: "#FFFFFF",
                p: "40px",
                bgcolor: "green",
                height: "66%",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ ml: 4, fontSize: "23px", fontWeight: "bold" }}>
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
              <Box>
                <InputLabel sx={{ m: 0.5, ml: 4 }}>Sucursal</InputLabel>
                <Select
                  sx={{ width: "84%", ml: 4 }}
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
              </Box>

              {/* FIN PASO 1 */}
              {/* INICIO PASO 2 */}

              {selectedBranch && selectedDay ? (
              
                  <Box
                sx={{bgcolor:"pink"}}
                >
                  
                  <InputLabel sx={{ m: 0.5, ml: 4 }}>Horario</InputLabel>
                  <Select
                    sx={{ width: "84%", ml: 4 }}
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
                 </Box>
              ) : null}
              {/* SIN PASO 2 */}
              {/* INICIO PASO 3 */}

              {selectedBranch && selectedDay && selectedShift ? (
                <Box>
                  <Grid container spacing={1} sx={{ pt: 2 }}>
                    <Grid xs={12} sm={5} item sx={{ ml: 4.3 }}>
                      <InputLabel sx={{}}>Nombre</InputLabel>
                      <TextField
                        name="name"
                        variant="outlined"
                        fullWidth
                        required
                        value={user.name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={5} item sx={{ ml: 1 }}>
                      <InputLabel sx={{}}>Apellido</InputLabel>
                      <TextField
                        name="lastname"
                        variant="outlined"
                        fullWidth
                        value={user.lastname}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={6} sm={12} item sx={{}}>
                    <InputLabel sx={{ mt: 1, ml: 4 }}>Teléfono</InputLabel>
                    <TextField
                      id="branch"
                      fullWidth
                      sx={{ width: "84%", ml: 4 }}
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid container spacing={1} sx={{ pt: 2 }}>
                    <Grid xs={12} sm={5} item sx={{ ml: 4.3 }}>
                      <InputLabel sx={{}}>Email</InputLabel>
                      <TextField
                        id="branch"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        fullWidth
                        // value={user.email}
                      />
                    </Grid>
                    <Grid xs={12} sm={5} item sx={{ ml: 1 }}>
                      <InputLabel sx={{}}>DNI</InputLabel>
                      <TextField id="branch" value={user.DNI} fullWidth />
                    </Grid>
                  </Grid>

                  <Box sx={{ pt: 5, pb: 5 }}>
                    <Button
                      sx={{
                        ml: "32px",
                        pl: "16px",
                        p: 3,
                        bgcolor: "#A442F1",
                        color: "white",
                      }}
                      // onClick={createShift}
                    >
                      Confirmar reserva
                    </Button>
                  </Box>
                </Box>
              ) : null}
         
            </Box>
            <Box>
              <Box
                sx={{
                  justifyContent: "center",
                  pt: 2,
                  bgcolor: "#FFFFFF",
                  ml: 5,
                  width: "120%",
                  height: "66%",
                  borderRadius: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    date={selectedDay}
                    onChange={handleDateChange}
                    disabled={isCalendarDisabled}
                    // shouldDisableDate={shouldDisableDate}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Reserva;
