import React from 'react'
import { Autocomplete, Box, Button, Grid, InputLabel, TextField } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const steps = [
  'Elegí tu sucursal',
  'Selleccioná el día',
  'Completá los datos',
];


const opciones = [
  { name: "neilen"},
  { name: "neilen"},
  { name: "neilen"},
  { name: "neilen"},
  { name: "neilen"},
  { name: "neilen"},
]

const horarios = [
  {horario:"19:00"}
]

const Reserva = ({opciones, horarios }) => {

  return (
<Box sx= {{ display:"flex", bgcolor:"#ECECEC", height:"100vh"}}> 
  <Box sx={{ height:"580px",width: "1300px", m:"auto", display:"flex"}}>
   <Grid container sx= {{width:"1300px", height: "550px", display:"flex", m:"auto"}}>
  
    <Box sx={{ width: '65%', bgcolor:"#FFFFFF", height:"130%", borderRadius:"10px"}}>
     <Box sx= {{pl:5, pt:5, fontSize:"23px", fontWeight:"bold"}}> 
      Reserva <br/>
     <small>Seleccioná la opción x</small>
      </Box>
      <Stepper activeStep={1} alternativeLabel sx={{m:"auto", pt:5}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}

      </Stepper>
 {/* PASO 1 */}
       <InputLabel  sx={{ m:1, ml:4}}>
        Sucursal
       <Autocomplete
        id="branch"
        options={opciones}
        sx={{ width:"90%" }}
        renderInput={(params) => 
        <TextField {...params} />}
      />
      </InputLabel>
 {/* FIN PASO 1  */}

 {/* INICIO PASO 2  */}
 <InputLabel  sx={{ m:1, ml:4}}>
        Horario
       <Autocomplete
        id="branch"
        options={horarios}
        sx={{ width:"90%" }}
        renderInput={(params) => 
        <TextField {...params} />}
      />
      </InputLabel>

        <Grid container spacing={2} sx={{ml:3, p:2}}>
          <InputLabel >
            Nombre
           <Grid xs={12} sm={5} item >

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

        <InputLabel  sx={{ m:1, ml:4}}>
        Email
       <Autocomplete
        id="branch"
        options={horarios}
        sx={{ width:"90%" }}
        renderInput={(params) => 
        <TextField {...params} />}
      />
      </InputLabel>

      <InputLabel  sx={{ m:1, ml:4}}>
        teléfono
       <Autocomplete
        id="branch"
        options={horarios}
        sx={{ width:"90%" }}
        renderInput={(params) => 
        <TextField {...params} />}
      />
      </InputLabel>

      <Button sx={{ml:"32px",  pl:"16px", p:3, bgcolor: "#A442F1", color:"white" }}>
        Confirmar reserva 
      </Button>
      </Box>
      <Box>











        <Box sx={{bgcolor:"#FFFFFF", ml:5, width: "220%", height:"80%" , borderRadius:"10px"}}>
          CALENDARIO VA ACA 
        </Box>
      </Box>
   </Grid>
  </Box>
</Box>
  )
}

export default Reserva