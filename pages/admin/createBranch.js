import { Box, Button, FormControl, Grid, Input, InputLabel, TextField } from '@mui/material'
import axios from 'axios'
import moment from "moment"
import React, { useEffect, useState } from 'react'

const Createbranch = () => {
  const [name, setName] = useState("")
  const [phtoneNumber, setPhoneNumber] = useState(0)
  const [email, setEmail] = useState("")
  const [openingH, setOpeningH] = useState("")
  const [closingH, setClosingH] = useState("")
  const [maxCap, setMaxCap] = useState(0)
  const [direction, setDirection] = useState("")


async function handlerNewBranch (e) {
  e.preventDefault()
  try{
    const response = await axios.post("http://localhost:3000/api/branches",{
      name: name,
      email: email,
      phoneNumber: phtoneNumber,
      maxCap: maxCap,
      direction: direction,
      openingH: openingH,
      closingH: closingH
    })
    if(response.status === 200) {
      alert("SE CREO UNA NUEVA BRANCHHHASDKJSDÑKSJDFKSD")
    }
    
   }catch(e) {
      console.log("HUBO UN PROBLEMAAAA ")
   }
  }

  // console.log("NEEEEWWWW", newBranch)


  return (
<Box sx={{height:"100vh", bgcolor:"#ECECEC"}}> 
  <Grid container>
  <Box
    onSubmit={handlerNewBranch}
    component="form"
    noValidate
    autoComplete="off"
   >
      <Box 
      sx={{
        margin:"auto",
        justifyContent:" center",
        position: "absolute",
        borderRadius: "12px",
        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12);",
        width: "980px",
        height:"644px",
        left: "calc(50% - 980px/2)",
        top: "160px",
        padding: "40px 32px 32px",
        bgcolor:"#FFFFFF",
      }}
        >
      <Box sx={{fontSize:"20px", fontWeight:"bold", pt:2, pb:3}}>Crear una nueva sucursal</Box>
      <Grid container spacing={2} sx={{pb:2}}> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
       <InputLabel>Nombre</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          />  
        </Grid> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
       <InputLabel>Dirección</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={direction}
          onChange={(e) => {setDirection(e.target.value)}}
          />  
         </Grid> 
        </Grid>
      <Grid xs={12} item sx={{pt:2,pb:2}}>
        <InputLabel>Email</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />  
        </Grid> 
    <Grid container spacing={2} sx={{pb:2}}> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
      <InputLabel>Teléfono</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={phtoneNumber}
        onChange={(e)=> {setPhoneNumber(e.target.value)}}
          />  
        </Grid> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
      <InputLabel>Capacidad máxima</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
        onChange={(e) => {setMaxCap(e.target.value)}}
          />  
        </Grid> 
    </Grid>
    <Grid container spacing={2} sx={{pb:2}}> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
       <InputLabel>Horario de apertura</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={openingH}
        onChange={(e) => {setOpeningH(e.target.value)}}
          />  
        </Grid> 
      <Grid xs={12} sm={6} item sx={{pt:2,pb:2}}>
       <InputLabel>Horario de cierre</InputLabel>
        <TextField
          id="outlined-multiline-flexible" 
          multiline
          fullWidth
          value={closingH}
        onChange={(e) => {setClosingH(e.target.value)}}
          />  
         </Grid> 
        </Grid>
            <Button
              fullWidth
              onClick={handlerNewBranch}
              sx={{bgcolor:"#A442F1", color:"#ffffff", p:2, borderRadius:"10px", "&:hover": {bgcolor:"rgba(164, 66, 241, 0.6)"}}}>
                Crear
            </Button>
       </Box>
      </Box>
  </Grid>
   </Box>

)}

export default Createbranch