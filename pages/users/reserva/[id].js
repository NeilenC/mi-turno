import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import useBranchData from '../../../Hooks/useBranchData';

const steps = ['Elegí tu sucursal', 'Selleccioná el día', 'Completá los datos'];


const Reserva = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [activeStep, setActiveStep] = useState([]);
  useBranchData();
  const branches = useSelector((state) => state.branches);

  const handleBranchSelect = (event) => {
    const selectedBranch = event.target.value;
    setSelectedBranch(selectedBranch);
    setActiveStep([0]);
  };

  const getStepColor = (stepIndex) => {
    if (stepIndex === 0 && selectedBranch) {
      return 'red'; // Cambiar a color azul de Material-UI que desees
    }
    return undefined; // Mantener el color por defecto
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#ECECEC', height: '100vh' }}>
      <Box sx={{ height: '580px', width: '1300px', m: 'auto', display: 'flex' }}>
        <Grid container sx={{ width: '1300px', height: '550px', display: 'flex', m: 'auto' }}>
          <Box
            sx={{
              width: '65%',
              bgcolor: '#FFFFFF',
              height: '130%',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ pl: 5, pt: 5, fontSize: '23px', fontWeight: 'bold' }}>
              Reserva <br />
              <small>Seleccioná la opción x</small>
            </Box>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ m: 'auto', pt: 5 }}>
              {steps.map((label, index) => (
                <Step key={label} completed={index < activeStep} color={getStepColor(index)}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {/* PASO 1 */}
            <InputLabel sx={{ m: 1, ml: 4 }}>Sucursal</InputLabel>
            <Select
              sx={{ width: '85%', ml: 4 }}
              value={selectedBranch}
              onChange={handleBranchSelect}
            >
              {branches.map((branch) => (
                <MenuItem key={branch._id} value={branch.name}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
            {/* FIN PASO 1 */}

            {/* INICIO PASO 2  */}
            <InputLabel sx={{ m: 1, ml: 4 }}>
              Horario
              <Autocomplete
                id="branch"
                // options={horarios}
                sx={{ width: '90%' }}
                renderInput={(params) => <TextField {...params} />}
              />
            </InputLabel>

            <Grid container spacing={2} sx={{ ml: 3, p: 2 }}>
              <InputLabel>
                Nombre
                <Grid xs={12} sm={5} item>
                  <TextField
                    name="name"
                    // placeholder="Ingrese su Nombre"
                    variant="outlined"
                    color="warning"
                    fullWidth
                    required
                    // value={form.name}
                    // onChange={handleChange}
                  />
                </Grid>
              </InputLabel>
              <InputLabel>
                Apellido
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Apellido"
                    name="lastName"
                    // placeholder="Ingrese su Apellido"
                    variant="outlined"
                    color="warning"
                    fullWidth
                    // value={form.lastName} // agregar el valor del estado
                    // onChange={handleChange}
                  />
                </Grid>
              </InputLabel>
            </Grid>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              Email
              <Autocomplete
                id="branch"
                // options={horarios}
                sx={{ width: '90%' }}
                renderInput={(params) => <TextField {...params} />}
              />
            </InputLabel>

            <InputLabel sx={{ m: 1, ml: 4 }}>
              teléfono
              <Autocomplete
                id="branch"
                // options={horarios}
                sx={{ width: '90%' }}
                renderInput={(params) => <TextField {...params} />}
              />
            </InputLabel>

            <Button
              sx={{
                ml: '32px',
                pl: '16px',
                p: 3,
                bgcolor: '#A442F1',
                color: 'white',
              }}
            >
              Confirmar reserva
            </Button>
          </Box>
          <Box>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                ml: 5,
                width: '150%',
                height: '50%',
                borderRadius: '10px',
              }}
            >
            <Box sx = {{justifyContent:"center", pt:2}}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Box>
           </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reserva;
