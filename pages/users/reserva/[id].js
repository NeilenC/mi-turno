import React, { useCallback, useEffect, useState } from "react";

import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useSelector } from "react-redux";
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
import Swal from "sweetalert2";
import { StyledInputLabel } from "../../../components/LayOut";

const steps = ["Elegí tu sucursal", "Selleccioná el día", "Completá los datos"];

const Reserva = () => {
  useBranchData();
  // useUserData();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [name, setName] = useState("");
  const [activeStep, setActiveStep] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [newShift, setNewShift] = useState([]);
  const [isCalendarDisabled, setIsCalendarDisabled] = useState(true);
  const router = useRouter();
  const branches = useSelector((state) => state.branches);
  const user = useSelector((state) => state.user);
  const now = dayjs().format("DD/MM/YYYY HH:mm");
  const today = dayjs();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")));
  }, []);

  const shouldDisableDate = (date) => {
    // Deshabilitar días anteriores al día actual
    if (date.isBefore(today, "day")) {
      return true;
    }

    // Deshabilitar fines de semana (sábado y domingo)
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBranchSelect = (e) => {
    setActiveStep(1);
    setIsCalendarDisabled(false);
  };

  const handleDateChange = (date) => {
    setSelectedDay(date.format("DD/MM/YYYY"));
    handleNextStep();
    if (selectedBranch) {
      getAvailableShift();
    }
  };

  const getStepColor = (stepIndex) => {
    if (stepIndex === 0 && selectedBranch) {
      return "primary";
    } else if (stepIndex === 1 && selectedDay) {
      return "primary";
    } else if (stepIndex === 2 && name) {
      return "primary";
    }
    return undefined; // Mantener el color por defecto
  };

  const getAvailableShift = useCallback(async () => {
    try {
      const availableShifts = await axios.post(
        "/api/shift/check",
        {
          branchId: selectedBranch._id,
          date: selectedDay,
        }
      );
      setShifts(availableShifts.data);
    } catch (e) {
      throw e;
    }
  }, [selectedBranch, selectedDay]);

  useEffect(() => {
    if (selectedBranch && selectedDay) {
      getAvailableShift();
    }
  }, [getAvailableShift, selectedBranch, selectedDay]);

  const createShift = async () => {
    try {
      const response = await axios.post(
        "/api/shift/create",
        {
          branchId: selectedBranch._id,
          branchName: selectedBranch.name,
          date: selectedDay,
          shift: selectedShift,
          fullname: `${name} ${lastname}` || `${user?.name} ${user?.lastname}`,
          email: email || user?.email,
          DNI: user?.DNI || user?.DNI,
          userId: user?.id,
          phoneNumber: phoneNumber || user?.phoneNumber,
          creatingDate: now,
        }
      );

      const newShift = response.data;
      setNewShift(newShift);
      setActiveStep(2);
      Swal.fire({
        title: "Turno reservado con éxito",
        icon: "success",
        confirmButtonText: "Continuar",
      });
      router.push(`/users/detalleReserva/${newShift._id}`);
      setSelectedBranch(null);
      setSelectedDay(null);
      setSelectedShift("");
      return newShift;
    } catch (e) {
      Swal.fire({
        title: "Hubo un error al reservar el turno",
        text: "Por favor, intente nuevamente",
        icon: "error",
        confirmButtonText: "Continuar",
      });
      throw e;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#F5f5f5f5" }}>
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
              m: "auto",
            }}
          >
            <Grid item xs={7}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: "40px",
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
                  <StyledInputLabel sx={{ m: 0.5, ml: 4, pt: 3 }}>
                    Sucursal
                  </StyledInputLabel>
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
                  <Box>
                    <StyledInputLabel sx={{ m: 0.5, ml: 4 }}>
                      Horario
                    </StyledInputLabel>
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
                {/* FIN PASO 2 */}
                {/* INICIO PASO 3 */}

                {selectedBranch && selectedDay && selectedShift ? (
                  <Box>
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                      <Grid xs={12} sm={5} item sx={{ ml: 4.3 }}>
                        <StyledInputLabel sx={{}}>Nombre</StyledInputLabel>
                        <TextField
                          name="name"
                          variant="outlined"
                          fullWidth
                          required
                          // value={user?.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid xs={12} sm={5} item sx={{ ml: 1 }}>
                        <StyledInputLabel sx={{}}>Apellido</StyledInputLabel>
                        <TextField
                          name="lastname"
                          variant="outlined"
                          fullWidth
                          // value={user?.lastname}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid xs={6} sm={12} item sx={{}}>
                      <StyledInputLabel sx={{ mt: 1, ml: 4 }}>
                        Teléfono
                      </StyledInputLabel>
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
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                      <Grid xs={12} sm={5} item sx={{ ml: 4.3 }}>
                        <StyledInputLabel sx={{}}>Email</StyledInputLabel>
                        <TextField
                          id="branch"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          fullWidth
                          // value={user?.email}
                        />
                      </Grid>
                      <Grid xs={12} sm={5} item sx={{ ml: 1 }}>
                        <StyledInputLabel sx={{}}>DNI</StyledInputLabel>
                        <TextField id="branch" value={user?.DNI} fullWidth />
                      </Grid>
                    </Grid>

                    <Box sx={{ pt: 5 }}>
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
                  </Box>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box>
                <Box
                  sx={{
                    justifyContent: "center",
                    pt: 2,
                    bgcolor: "#FFFFFF",
                    ml: 5,
                    height: "340px",
                    borderRadius: "10px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      date={selectedDay}
                      onChange={handleDateChange}
                      disabled={isCalendarDisabled}
                      shouldDisableDate={shouldDisableDate}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Reserva;
